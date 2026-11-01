import { localeDictionary } from "./locales.js";

const LANGS = ["en", "sk", "uk", "ru"];
const params = new URLSearchParams(location.search);
let language = LANGS.includes(params.get("lang")) ? params.get("lang") : "en";
let strings = localeDictionary(language);
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key, vars = {}) => {
  let value = strings[key] ?? localeDictionary("en")[key] ?? key;
  for (const [name, replacement] of Object.entries(vars)) value = value.replaceAll(`{${name}}`, String(replacement));
  return value;
};

function applyLanguage(next, updateUrl = true) {
  language = LANGS.includes(next) ? next : "en";
  strings = localeDictionary(language);
  document.documentElement.lang = language;
  document.body.dataset.locale = language;
  document.title = t("metaTitle");
  const description = $('meta[name="description"]');
  if (description) description.content = t("metaDescription");
  const canonical = $('link[rel="canonical"]');
  if (canonical) canonical.href = `https://maxskachkov.github.io/ptsk1/?lang=${language}`;
  $$("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (strings[key]) node.textContent = t(key);
  });
  $("#reference-prompt").value = t("prompt");
  $("#language").value = language;
  $("#model-canvas").setAttribute("aria-label", {
    en: "Interactive 3D model. Drag to orbit, use the wheel to zoom, and use arrow keys when focused.",
    sk: "Interaktívny 3D model. Potiahnutím otáčajte, kolieskom približujte a po zameraní používajte šípky.",
    uk: "Інтерактивна 3D-модель. Перетягуйте для обертання, коліщатком змінюйте масштаб, стрілки працюють після фокусування.",
    ru: "Интерактивная 3D-модель. Перетаскивайте для вращения, колёсиком меняйте масштаб, стрелки работают после фокуса."
  }[language]);
  refreshReferenceCount();
  refreshModelLabels();
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("lang", language);
    history.replaceState({}, "", url);
    try { localStorage.setItem("xray-language", language); } catch {}
  }
}

try {
  const savedLanguage = localStorage.getItem("xray-language");
  if (!params.has("lang") && LANGS.includes(savedLanguage)) language = savedLanguage;
} catch {}
$("#language").addEventListener("change", (event) => applyLanguage(event.target.value));
applyLanguage(language, false);

const requiredSlots = ["front", "back", "left", "right"];
const allSlots = [...requiredSlots, "threeQuarter", "face", "hands", "feet", "asymmetry"];
const imageRecords = new Map();
const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 48_000_000;
const MAX_IMAGE_DIMENSION = 12_000;

function refreshReferenceCount() {
  const count = requiredSlots.filter((slot) => imageRecords.has(slot)).length;
  $("#reference-count").textContent = `${count} / 4`;
  $("#reference-count").setAttribute("aria-label", language === "en" ? `${count} of 4 required views` : `${count} / 4`);
}

function referenceError(message) {
  const status = $("#reference-status");
  status.textContent = message;
  status.classList.add("is-error");
}

function imageFormatAllowed(file) {
  const validMime = ["image/png", "image/jpeg", "image/webp"].includes(file.type);
  const validExt = /\.(png|jpe?g|webp)$/i.test(file.name);
  return validMime && validExt;
}

async function addReference(slot, file) {
  const preview = $(`#preview-${slot}`);
  if (!file) return;
  if (!imageFormatAllowed(file)) return referenceError(t("statusRefsType"));
  if (file.size > MAX_IMAGE_BYTES) return referenceError(t("statusRefsSize"));

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
    if (bitmap.width > MAX_IMAGE_DIMENSION || bitmap.height > MAX_IMAGE_DIMENSION || bitmap.width * bitmap.height > MAX_IMAGE_PIXELS) {
      bitmap.close();
      return referenceError(t("statusRefsPixels"));
    }
    bitmap.close();
  } catch {
    return referenceError(t("statusRefsDecode"));
  }

  const previous = imageRecords.get(slot);
  if (previous) URL.revokeObjectURL(previous.url);
  const url = URL.createObjectURL(file);
  imageRecords.set(slot, { url, file });
  preview.replaceChildren();
  const image = document.createElement("img");
  image.src = url;
  image.alt = `${t(slot)} reference`;
  image.loading = "lazy";
  preview.append(image);
  $(`[data-remove="${slot}"]`).hidden = false;
  $("#reference-status").textContent = t("referenceStatus");
  $("#reference-status").classList.remove("is-error");
  refreshReferenceCount();
}

function removeReference(slot) {
  const record = imageRecords.get(slot);
  if (record) URL.revokeObjectURL(record.url);
  imageRecords.delete(slot);
  const preview = $(`#preview-${slot}`);
  preview.replaceChildren(Object.assign(document.createElement("span"), { textContent: t("emptyPreview") }));
  $(`#image-${slot}`).value = "";
  $(`[data-remove="${slot}"]`).hidden = true;
  $("#reference-status").textContent = t("statusRemoved");
  $("#reference-status").classList.remove("is-error");
  refreshReferenceCount();
}

for (const slot of allSlots) {
  const input = $(`#image-${slot}`);
  input?.addEventListener("change", () => addReference(slot, input.files?.[0]));
  $(`[data-remove="${slot}"]`)?.addEventListener("click", () => removeReference(slot));
}

$("#copy-prompt").addEventListener("click", async () => {
  const prompt = $("#reference-prompt");
  try {
    await navigator.clipboard.writeText(prompt.value);
    $("#copy-status").textContent = t("copied");
  } catch {
    prompt.focus();
    prompt.select();
    const copied = document.execCommand?.("copy");
    $("#copy-status").textContent = copied ? t("copied") : t("copyFailed");
  }
});

const MAX_MODEL_BYTES = 30 * 1024 * 1024;
const MAX_NODES = 3000;
const MAX_BONES = 512;
const MAX_VERTICES = 3_000_000;
const MAX_ANIMATION_KEYS = 250_000;
const DEMO_URL = "https://raw.githubusercontent.com/mrdoob/three.js/r182/examples/models/gltf/RobotExpressive/RobotExpressive.glb";

let THREE;
let renderer;
let scene;
let camera;
let controls;
let mixer;
let activeAction;
let frameGroup;
let activeGltf;
let activeHelpers = [];
let meshStates = [];
let boneList = [];
let restTransforms = new Map();
let mode = "surface";
let modelName = "";
let modelHasSkeleton = false;
let animationFrame = 0;
let loadToken = 0;
let hasWebGL = false;
const roleKeys = [
  ["upperLeft", "roleUpper", "sideLeft"],
  ["upperRight", "roleUpper", "sideRight"],
  ["forearmLeft", "roleForearm", "sideLeft"],
  ["forearmRight", "roleForearm", "sideRight"],
  ["lowerLegLeft", "roleLowerLeg", "sideLeft"],
  ["lowerLegRight", "roleLowerLeg", "sideRight"]
];

function setViewerStatus(message, kind = "") {
  const target = $("#viewer-init-status");
  target.textContent = message;
  target.classList.toggle("is-error", kind === "error");
}

function showLoading(message) {
  const loading = $("#viewer-loading");
  loading.textContent = message;
  loading.hidden = false;
  $("#viewer-error").hidden = true;
}

function showError(message) {
  $("#viewer-loading").hidden = true;
  const error = $("#viewer-error");
  error.textContent = message;
  error.hidden = false;
}

function clearError() {
  $("#viewer-error").hidden = true;
  $("#viewer-loading").hidden = true;
}

function safeGLBManifest(buffer) {
  if (!(buffer instanceof ArrayBuffer) || buffer.byteLength < 20 || buffer.byteLength > MAX_MODEL_BYTES) {
    throw new Error("invalid");
  }
  const view = new DataView(buffer);
  if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength) {
    throw new Error("invalid");
  }
  let offset = 12;
  let json = null;
  while (offset + 8 <= buffer.byteLength) {
    const length = view.getUint32(offset, true);
    const type = view.getUint32(offset + 4, true);
    offset += 8;
    if (length > buffer.byteLength - offset) throw new Error("invalid");
    if (type === 0x4e4f534a) {
      const text = new TextDecoder().decode(new Uint8Array(buffer, offset, length)).replace(/[\u0000\u0020]+$/g, "");
      try { json = JSON.parse(text); } catch { throw new Error("invalid"); }
      break;
    }
    offset += length;
  }
  if (!json || !/^2\.0(?:$|\.)/.test(json.asset?.version ?? "")) throw new Error("invalid");
  const references = [
    ...(Array.isArray(json.buffers) ? json.buffers : []),
    ...(Array.isArray(json.images) ? json.images : [])
  ];
  if (references.some((item) => item.uri && !item.uri.startsWith("data:"))) throw new Error("external");
  if ((json.nodes?.length ?? 0) > MAX_NODES) throw new Error("complex");
  const boneCount = new Set((json.skins ?? []).flatMap((skin) => skin.joints ?? [])).size;
  if (boneCount > MAX_BONES) throw new Error("complex");
  const vertexIndices = (json.meshes ?? []).flatMap((mesh) =>
    (mesh.primitives ?? []).map((primitive) => primitive.attributes?.POSITION).filter(Number.isInteger)
  );
  const vertexCount = vertexIndices.reduce((total, index) => total + (json.accessors?.[index]?.count ?? 0), 0);
  if (vertexCount > MAX_VERTICES) throw new Error("complex");
  const keyCount = (json.accessors ?? []).reduce((total, accessor) => total + (accessor.count ?? 0), 0);
  if (keyCount > MAX_ANIMATION_KEYS) throw new Error("complex");
  const supported = new Set([
    "KHR_materials_unlit", "KHR_materials_emissive_strength", "KHR_materials_ior",
    "KHR_materials_specular", "KHR_materials_clearcoat", "KHR_texture_transform",
    "KHR_mesh_quantization", "KHR_lights_punctual"
  ]);
  if ((json.extensionsRequired ?? []).some((extension) => !supported.has(extension))) throw new Error("unsupported");
  return json;
}

function errorMessage(error) {
  const key = error?.message;
  const mapped = {
    external: "statusExternal",
    tooLarge: "statusTooLarge",
    notGlb: "statusNotGLB",
    invalid: "statusInvalid",
    complex: "statusComplex",
    unsupported: "statusUnsupported"
  }[key];
  return mapped ? t(mapped) : t("statusLoadError");
}

async function importThree() {
  if (THREE) return;
  const [three, loaderModule, controlsModule] = await Promise.all([
    import("three"),
    import("three/addons/loaders/GLTFLoader.js"),
    import("three/addons/controls/OrbitControls.js")
  ]);
  THREE = three;
  window.XRayThreeModules = { GLTFLoader: loaderModule.GLTFLoader, OrbitControls: controlsModule.OrbitControls };
}

async function initializeViewer() {
  setViewerStatus(t("statusInitializing"));
  try {
    await importThree();
    const canvas = $("#model-canvas");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize($("#viewer-stage").clientWidth, $("#viewer-stage").clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xe8e9e8, 1);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8e9e8);
    camera = new THREE.PerspectiveCamera(38, 1, 0.01, 250);
    camera.position.set(0, 1.15, 4.2);
    controls = new window.XRayThreeModules.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.minDistance = 0.7;
    controls.maxDistance = 14;
    controls.target.set(0, 0.85, 0);
    controls.update();

    scene.add(new THREE.HemisphereLight(0xf5f4f1, 0x737d84, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xd6e2ee, 1.2);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const resizeObserver = new ResizeObserver(() => {
      if (!renderer || !camera) return;
      const width = $("#viewer-stage").clientWidth;
      const height = $("#viewer-stage").clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe($("#viewer-stage"));
    canvas.addEventListener("keydown", handleViewerKeys);
    canvas.classList.add("is-ready");
    $("#viewer-placeholder").hidden = true;
    setViewerStatus("");
    hasWebGL = true;
    animate();
    updateControlAvailability();
  } catch {
    hasWebGL = false;
    setViewerStatus(t("statusNoWebGL"), "error");
    $("#load-demo").disabled = true;
    $("#model-file").disabled = true;
    $("#model-file").nextElementSibling?.classList.add("is-disabled");
  }
}

function handleViewerKeys(event) {
  if (!camera || !controls) return;
  const step = 0.12;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    const offset = camera.position.clone().sub(controls.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    if (event.key === "ArrowLeft") spherical.theta -= step;
    if (event.key === "ArrowRight") spherical.theta += step;
    if (event.key === "ArrowUp") spherical.phi = Math.max(0.12, spherical.phi - step);
    if (event.key === "ArrowDown") spherical.phi = Math.min(Math.PI - 0.12, spherical.phi + step);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
    controls.update();
  }
  if (event.key === "+" || event.key === "=" || event.key === "-") {
    event.preventDefault();
    const factor = event.key === "-" ? 1.12 : 0.89;
    camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);
    controls.update();
  }
}

function animate() {
  animationFrame = requestAnimationFrame(animate);
  if (mixer) mixer.update(Math.min(THREE.ClockDelta ?? 0, 0.05));
  if (meshStates.length) {
    for (const entry of meshStates) {
      entry.overlay.position.copy(entry.source.position);
      entry.overlay.quaternion.copy(entry.source.quaternion);
      entry.overlay.scale.copy(entry.source.scale);
      if (entry.source.morphTargetInfluences && entry.overlay.morphTargetInfluences) {
        entry.overlay.morphTargetInfluences = [...entry.source.morphTargetInfluences];
      }
    }
  }
  controls?.update();
  renderer?.render(scene, camera);
}

const clock = { last: 0 };
function animate() {
  animationFrame = requestAnimationFrame(animate);
  const now = performance.now();
  const delta = clock.last ? Math.min((now - clock.last) / 1000, 0.05) : 0;
  clock.last = now;
  mixer?.update(delta);
  for (const entry of meshStates) {
    entry.overlay.position.copy(entry.source.position);
    entry.overlay.quaternion.copy(entry.source.quaternion);
    entry.overlay.scale.copy(entry.source.scale);
    if (entry.source.morphTargetInfluences && entry.overlay.morphTargetInfluences) {
      entry.overlay.morphTargetInfluences = [...entry.source.morphTargetInfluences];
    }
  }
  controls?.update();
  renderer?.render(scene, camera);
}

function disposeCurrentModel(root = activeGltf?.scene) {
  if (mixer) mixer.stopAllAction();
  mixer = null;
  activeAction = null;
  if (frameGroup) scene?.remove(frameGroup);
  for (const helper of activeHelpers) {
    scene?.remove(helper);
    helper.dispose?.();
    helper.geometry?.dispose?.();
    helper.material?.dispose?.();
  }
  activeHelpers = [];

  if (root && THREE) {
    const geometries = new Set();
    const materials = new Set();
    const textures = new Set();
    root.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      const list = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
      for (const material of list) {
        materials.add(material);
        for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
      }
    });
    textures.forEach((texture) => {
      const image = texture.source?.data ?? texture.image;
      if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) image.close();
      texture.dispose();
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
  }
  frameGroup = null;
  activeGltf = null;
  meshStates = [];
  boneList = [];
  restTransforms.clear();
}

function makeMaterials(material) {
  const originals = Array.isArray(material) ? material : [material];
  const wire = originals.map(() => new THREE.MeshBasicMaterial({
    color: 0x356f99, wireframe: true, transparent: true, opacity: 0.78,
    depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1
  }));
  const translucent = originals.map((item) => {
    const copy = item.clone();
    copy.transparent = true;
    copy.opacity = 0.3;
    copy.depthWrite = false;
    return copy;
  });
  return {
    surface: material,
    wire: Array.isArray(material) ? wire : wire[0],
    translucent: Array.isArray(material) ? translucent : translucent[0]
  };
}

function syncVisualMode() {
  if (!activeGltf) return;
  const xrayBones = mode === "xray";
  for (const entry of meshStates) {
    entry.source.visible = mode !== "bones";
    entry.source.material = mode === "xray" ? entry.materials.translucent : entry.materials.surface;
    entry.overlay.visible = mode === "mesh" && entry.source.visible;
  }
  for (const helper of activeHelpers) helper.visible = mode === "bones" || xrayBones;
  $$(".mode-button").forEach((button) => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $("#mode-state").textContent = t(`modeName${mode[0].toUpperCase()}${mode.slice(1)}`);
}

function getBonesAndMeshes(root) {
  const skinned = [];
  const meshes = [];
  root.traverse((object) => {
    if (object.isMesh) meshes.push(object);
    if (object.isSkinnedMesh && object.skeleton) skinned.push(object);
  });
  const uniqueBones = new Map();
  const skeletons = new Set();
  for (const mesh of skinned) {
    skeletons.add(mesh.skeleton);
    mesh.skeleton.bones.forEach((bone) => uniqueBones.set(bone.uuid, bone));
  }
  return { skinned, meshes, bones: [...uniqueBones.values()], skeletons: [...skeletons] };
}

function makeOverlay(source) {
  const overlay = source.isSkinnedMesh
    ? new THREE.SkinnedMesh(source.geometry, makeMaterials(source.material).wire)
    : new THREE.Mesh(source.geometry, makeMaterials(source.material).wire);
  overlay.name = `${source.name || "mesh"} wireframe overlay`;
  overlay.position.copy(source.position);
  overlay.quaternion.copy(source.quaternion);
  overlay.scale.copy(source.scale);
  overlay.matrixAutoUpdate = source.matrixAutoUpdate;
  if (!source.matrixAutoUpdate) overlay.matrix.copy(source.matrix);
  if (source.isSkinnedMesh) {
    overlay.bindMode = source.bindMode;
    overlay.bind(source.skeleton, source.bindMatrix);
    overlay.bindMatrixInverse.copy(source.bindMatrixInverse);
  }
  overlay.frustumCulled = false;
  source.parent?.add(overlay);
  return overlay;
}

function makeSkeletonHelpers(skinnedMeshes) {
  const usedSkeletons = new Set();
  for (const mesh of skinnedMeshes) {
    if (usedSkeletons.has(mesh.skeleton)) continue;
    usedSkeletons.add(mesh.skeleton);
    const helper = new THREE.SkeletonHelper(mesh);
    helper.setColors?.(new THREE.Color(0x476f95), new THREE.Color(0xc58c55));
    helper.material.depthTest = false;
    helper.material.transparent = true;
    helper.material.opacity = 0.95;
    helper.renderOrder = 20;
    scene.add(helper);
    activeHelpers.push(helper);
  }
}

function saveRestPose(bones) {
  restTransforms = new Map();
  for (const bone of bones) {
    restTransforms.set(bone.uuid, {
      position: bone.position.clone(),
      quaternion: bone.quaternion.clone(),
      scale: bone.scale.clone(),
      rotation: bone.rotation.clone()
    });
  }
}

function restoreRestPose() {
  for (const bone of boneList) {
    const rest = restTransforms.get(bone.uuid);
    if (!rest) continue;
    bone.position.copy(rest.position);
    bone.quaternion.copy(rest.quaternion);
    bone.scale.copy(rest.scale);
  }
  activeGltf?.scene.updateMatrixWorld(true);
}

function fillBoneOptions(select, placeholderKey) {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = t(placeholderKey);
  select.replaceChildren(placeholder);
  boneList.forEach((bone, index) => {
    const option = document.createElement("option");
    option.value = bone.uuid;
    option.textContent = bone.name || `Bone ${index + 1}`;
    select.append(option);
  });
}

function createMappingControls() {
  const container = $("#mapping-list");
  container.replaceChildren();
  for (const [key, role, side] of roleKeys) {
    const row = document.createElement("div");
    row.className = "mapping-row";
    const label = document.createElement("label");
    label.htmlFor = `map-${key}`;
    label.textContent = `${t(side)} ${t(role)}`;
    const select = document.createElement("select");
    select.id = `map-${key}`;
    select.dataset.role = key;
    select.setAttribute("aria-label", `${t(side)} ${t(role)}`);
    select.disabled = !modelHasSkeleton;
    row.append(label, select);
    container.append(row);
    fillBoneOptions(select, "mappingNone");
    select.addEventListener("change", () => {
      $("#pose-test-status").textContent = t("statusManualMap");
      updatePoseAvailability();
    });
  }
  $("#auto-map").disabled = !modelHasSkeleton;
  updatePoseAvailability();
}

function updatePoseAvailability() {
  const map = readMapping();
  const complete = {
    arms: Boolean(map.upperLeft && map.upperRight),
    elbows: Boolean(map.forearmLeft && map.forearmRight),
    knees: Boolean(map.lowerLegLeft && map.lowerLegRight)
  };
  $$(".pose-test").forEach((button) => {
    button.disabled = !modelHasSkeleton || !complete[button.dataset.poseTest];
  });
}

function readMapping() {
  const result = {};
  for (const [key] of roleKeys) result[key] = boneList.find((bone) => bone.uuid === $(`#map-${key}`)?.value) ?? null;
  return result;
}

function boneSide(name, side) {
  const raw = name.toLowerCase();
  const normalized = raw.replace(/[^a-z0-9]/g, "");
  if (side === "Left") return normalized.includes("left") || /(^|[^a-z])l([^a-z]|$)/i.test(raw);
  return normalized.includes("right") || /(^|[^a-z])r([^a-z]|$)/i.test(raw);
}

function suggestBone(roleKey) {
  const side = roleKey.endsWith("Left") ? "Left" : "Right";
  const family = roleKey.startsWith("upper") ? "upper" : roleKey.startsWith("forearm") ? "forearm" : "lowerLeg";
  const candidates = boneList.filter((bone) => {
    const raw = bone.name.toLowerCase();
    const compact = raw.replace(/[^a-z0-9]/g, "");
    if (!boneSide(raw, side)) return false;
    if (family === "upper") return compact.includes("arm") && !/forearm|lowerarm|hand|finger|shoulder|clavicle/.test(compact);
    if (family === "forearm") return /forearm|lowerarm/.test(compact);
    return /calf|shin/.test(compact) || (compact.includes("leg") && !/upleg|thigh|foot|toe/.test(compact));
  });
  return candidates.length === 1 ? candidates[0] : null;
}

function autoMapBones() {
  for (const [key] of roleKeys) {
    const match = suggestBone(key);
    if (match) $(`#map-${key}`).value = match.uuid;
  }
  updatePoseAvailability();
  $("#pose-test-status").textContent = t("statusAutoMap");
}

function selectBone(uuid) {
  const bone = boneList.find((item) => item.uuid === uuid);
  $("#selected-bone-state").textContent = bone?.name || t("selectedNone");
  const rest = bone && restTransforms.get(bone.uuid);
  const delta = rest && bone
    ? ["x", "y", "z"].map((axis) => Math.round(THREE.MathUtils.radToDeg(bone.rotation[axis] - rest.rotation[axis])))
    : [0, 0, 0];
  ["x", "y", "z"].forEach((axis, index) => { $(`#rotation-${axis}`).value = String(delta[index]); });
}

function getModelSnapshot(root) {
  const bounds = new THREE.Box3().setFromObject(root);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);
  if (!Number.isFinite(maxDimension) || maxDimension <= 0) throw new Error("invalid");
  root.position.sub(center);
  const group = new THREE.Group();
  group.add(root);
  group.scale.setScalar(2.5 / maxDimension);
  return group;
}

function verifyTextureLimits(root) {
  let pixels = 0;
  root.traverse((object) => {
    const list = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    for (const material of list) {
      for (const value of Object.values(material)) {
        if (!value?.isTexture) continue;
        const image = value.source?.data ?? value.image;
        const width = image?.width ?? 0;
        const height = image?.height ?? 0;
        if (width > 8192 || height > 8192) throw new Error("complex");
        pixels += width * height;
        if (pixels > 48_000_000) throw new Error("complex");
      }
    }
  });
}

function updateControlAvailability() {
  const hasModel = Boolean(activeGltf);
  $$(".mode-button").forEach((button) => {
    const needsRig = button.dataset.mode === "bones" || button.dataset.mode === "xray";
    button.disabled = !hasModel || (needsRig && !modelHasSkeleton);
  });
  $$(".camera-button, #reset-camera").forEach((button) => { button.disabled = !hasModel; });
  $("#bone-select").disabled = !modelHasSkeleton;
  ["#rotation-x", "#rotation-y", "#rotation-z", "#reset-pose"].forEach((selector) => {
    $(selector).disabled = !modelHasSkeleton;
  });
  $("#auto-map").disabled = !modelHasSkeleton;
  $("#animation-select").disabled = !hasModel || !activeGltf?.animations.length;
  $("#play-animation").disabled = !hasModel || !activeGltf?.animations.length;
  $("#stop-animation").disabled = !hasModel || !activeGltf?.animations.length;
  if (!modelHasSkeleton) {
    $("#skeleton-state").textContent = t("stateNo");
    $("#bone-count").textContent = "0";
    setViewerStatus(t("statusNoSkeleton"), "error");
    $("#pose-test-status").textContent = t("statusNoSkeleton");
  } else {
    $("#skeleton-state").textContent = t("stateYes");
    $("#bone-count").textContent = t("bonesCount", { count: boneList.length });
    setViewerStatus(t("statusHasSkeleton"));
  }
}

function refreshModelLabels() {
  if (!activeGltf) {
    $("#mode-state").textContent = t("modeNameSurface");
    return;
  }
  $("#mode-state").textContent = t(`modeName${mode[0].toUpperCase()}${mode.slice(1)}`);
  $("#skeleton-state").textContent = modelHasSkeleton ? t("stateYes") : t("stateNo");
  $("#bone-count").textContent = modelHasSkeleton ? t("bonesCount", { count: boneList.length }) : "0";
  $("#mesh-count").textContent = t("meshesCount", { count: meshStates.length });
  $("#selected-bone-state").textContent ||= t("selectedNone");
}

function clearModelStatus() {
  $("#skeleton-state").textContent = "—";
  $("#bone-count").textContent = "—";
  $("#mesh-count").textContent = "—";
  $("#selected-bone-state").textContent = "—";
}

function setAnimations(clips) {
  const select = $("#animation-select");
  select.replaceChildren();
  if (!clips?.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = t("noAnimations");
    select.append(option);
    return;
  }
  clips.forEach((clip, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = clip.name || `Animation ${index + 1}`;
    select.append(option);
  });
  select.value = "0";
}

async function parseAndAdopt(buffer, filename, isDemo, token) {
  safeGLBManifest(buffer);
  const manager = new THREE.LoadingManager();
  manager.setURLModifier((url) => {
    if (url.startsWith("data:")) return url;
    throw new Error("external");
  });
  const loader = new window.XRayThreeModules.GLTFLoader(manager);
  let gltf;
  try {
    gltf = await loader.parseAsync(buffer, "");
    if (token !== loadToken) {
      disposeCurrentModel(gltf.scene);
      return;
    }
    verifyTextureLimits(gltf.scene);
    const stats = getBonesAndMeshes(gltf.scene);
    const group = getModelSnapshot(gltf.scene);

    disposeCurrentModel();
    frameGroup = group;
    activeGltf = gltf;
    modelName = filename;
    modelHasSkeleton = stats.bones.length > 0;
    boneList = stats.bones;
    meshStates = stats.meshes.map((source) => {
      const materials = makeMaterials(source.material);
      const overlay = makeOverlay(source);
      overlay.material = materials.wire;
      return { source, overlay, materials };
    });
    makeSkeletonHelpers(stats.skinned);
    scene.add(frameGroup);
    frameGroup.updateMatrixWorld(true);
    saveRestPose(boneList);
    mixer = gltf.animations.length ? new THREE.AnimationMixer(gltf.scene) : null;
    setAnimations(gltf.animations);
    createMappingControls();
    fillBoneOptions($("#bone-select"), "noBones");
    $("#bone-select").addEventListener("change", () => selectBone($("#bone-select").value), { once: true });
    $("#bone-select").onchange = () => selectBone($("#bone-select").value);
    $("#model-summary .summary-empty").textContent = filename;
    $("#mesh-count").textContent = t("meshesCount", { count: stats.meshes.length });
    $("#selected-bone-state").textContent = t("selectedNone");
    $("#demo-credit").hidden = !isDemo;
    $("#viewer-placeholder").hidden = true;
    clearError();
    mode = "surface";
    syncVisualMode();
    updateControlAvailability();
    if (isDemo && modelHasSkeleton) autoMapBones();
    if (!gltf.animations.length) $("#pose-test-status").textContent = t("statusNoAnimations");
    camera.position.set(0, 1.15, 4.2);
    controls.target.set(0, 1.05, 0);
    controls.update();
  } catch (error) {
    if (gltf?.scene && gltf !== activeGltf) disposeCurrentModel(gltf.scene);
    throw error;
  }
}

async function loadLocalModel(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".glb")) return showError(t("statusNotGLB"));
  if (file.size > MAX_MODEL_BYTES) return showError(t("statusTooLarge"));
  const token = ++loadToken;
  showLoading(t("statusLoadingFile"));
  try {
    const buffer = await file.arrayBuffer();
    await parseAndAdopt(buffer, file.name, false, token);
  } catch (error) {
    showError(errorMessage(error));
  }
}

async function loadDemoModel() {
  const token = ++loadToken;
  showLoading(t("statusLoadingDemo"));
  $("#load-demo").disabled = true;
  try {
    const response = await fetch(DEMO_URL, { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer" });
    if (!response.ok) throw new Error("demo");
    const length = Number(response.headers.get("content-length") || 0);
    if (length > MAX_MODEL_BYTES) throw new Error("tooLarge");
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_MODEL_BYTES) throw new Error("tooLarge");
    await parseAndAdopt(buffer, "RobotExpressive.glb", true, token);
  } catch (error) {
    showError(error?.message === "tooLarge" ? t("statusTooLarge") : t("statusDemoError"));
  } finally {
    $("#load-demo").disabled = !hasWebGL;
  }
}

function setCameraView(view) {
  if (!camera || !controls) return;
  const distance = camera.position.distanceTo(controls.target) || 4.2;
  const target = controls.target.clone();
  const positions = {
    front: new THREE.Vector3(0, 0.12, 1),
    back: new THREE.Vector3(0, 0.12, -1),
    left: new THREE.Vector3(-1, 0.12, 0),
    right: new THREE.Vector3(1, 0.12, 0)
  };
  camera.position.copy(target).add(positions[view].normalize().multiplyScalar(distance));
  camera.up.set(0, 1, 0);
  camera.lookAt(target);
  controls.update();
}

function applyBoneRotation() {
  if (!modelHasSkeleton) return;
  mixer?.stopAllAction();
  activeAction = null;
  const bone = boneList.find((item) => item.uuid === $("#bone-select").value);
  const base = bone && restTransforms.get(bone.uuid);
  if (!bone || !base) return;
  const degree = (axis) => THREE.MathUtils.degToRad(Math.max(-180, Math.min(180, Number($(`#rotation-${axis}`).value) || 0)));
  bone.rotation.set(
    base.rotation.x + degree("x"),
    base.rotation.y + degree("y"),
    base.rotation.z + degree("z"),
    base.rotation.order
  );
  activeGltf.scene.updateMatrixWorld(true);
  syncVisualMode();
  updateControlAvailability();
}

function applyPoseTest(name) {
  const mapping = readMapping();
  const pairs = {
    arms: [mapping.upperLeft, mapping.upperRight],
    elbows: [mapping.forearmLeft, mapping.forearmRight],
    knees: [mapping.lowerLegLeft, mapping.lowerLegRight]
  };
  const pair = pairs[name];
  if (!pair?.[0] || !pair?.[1]) {
    $("#pose-test-status").textContent = t("statusPoseMapping");
    return;
  }
  mixer?.stopAllAction();
  activeAction = null;
  restoreRestPose();
  const degrees = { arms: 36, elbows: 65, knees: 55 }[name];
  pair.forEach((bone, index) => {
    const sign = index === 0 ? 1 : -1;
    bone.rotateX(THREE.MathUtils.degToRad(degrees * sign));
  });
  activeGltf.scene.updateMatrixWorld(true);
  $("#pose-test-status").textContent = t("statusPoseAxis");
  selectBone($("#bone-select").value);
  syncVisualMode();
}

function resetPose() {
  mixer?.stopAllAction();
  activeAction = null;
  restoreRestPose();
  for (const axis of ["x", "y", "z"]) $(`#rotation-${axis}`).value = "0";
  $("#pose-test-status").textContent = "";
  selectBone($("#bone-select").value);
  syncVisualMode();
  updateControlAvailability();
}

$("#model-file").addEventListener("change", (event) => loadLocalModel(event.target.files?.[0]));
$("#load-demo").addEventListener("click", loadDemoModel);
$$(".mode-button").forEach((button) => button.addEventListener("click", () => {
  if (button.disabled) return;
  mode = button.dataset.mode;
  syncVisualMode();
}));
$$(".camera-button").forEach((button) => button.addEventListener("click", () => setCameraView(button.dataset.camera)));
$("#reset-camera").addEventListener("click", () => {
  if (!camera || !controls) return;
  camera.position.set(0, 1.15, 4.2);
  controls.target.set(0, 1.05, 0);
  controls.update();
  setViewerStatus(t("statusCamera"));
});
$("#bone-select").addEventListener("change", (event) => selectBone(event.target.value));
["#rotation-x", "#rotation-y", "#rotation-z"].forEach((selector) => $(selector).addEventListener("input", applyBoneRotation));
$("#reset-pose").addEventListener("click", resetPose);
$("#auto-map").addEventListener("click", autoMapBones);
$$(".pose-test").forEach((button) => button.addEventListener("click", () => applyPoseTest(button.dataset.poseTest)));
$("#animation-select").addEventListener("change", () => {
  if (!mixer || !activeGltf?.animations.length) return;
  mixer.stopAllAction();
  activeAction = mixer.clipAction(activeGltf.animations[Number($("#animation-select").value)]);
});
$("#play-animation").addEventListener("click", () => {
  if (!mixer || !activeGltf?.animations.length) return;
  mixer.stopAllAction();
  activeAction = mixer.clipAction(activeGltf.animations[Number($("#animation-select").value)]);
  activeAction.reset().play();
});
$("#stop-animation").addEventListener("click", resetPose);
window.addEventListener("pagehide", () => {
  cancelAnimationFrame(animationFrame);
  for (const record of imageRecords.values()) URL.revokeObjectURL(record.url);
  disposeCurrentModel();
  renderer?.dispose();
});

initializeViewer();
