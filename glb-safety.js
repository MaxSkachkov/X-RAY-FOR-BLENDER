export const GLB_LIMITS = Object.freeze({
  maxBytes: 30 * 1024 * 1024,
  maxNodes: 3000,
  maxBones: 512,
  maxVertices: 3_000_000,
  maxAnimationKeys: 250_000
});

const SUPPORTED_REQUIRED_EXTENSIONS = new Set([
  "KHR_lights_punctual",
  "KHR_materials_anisotropy",
  "KHR_materials_clearcoat",
  "KHR_materials_diffuse_roughness",
  "KHR_materials_dispersion",
  "KHR_materials_emissive_strength",
  "KHR_materials_ior",
  "KHR_materials_iridescence",
  "KHR_materials_specular",
  "KHR_materials_transmission",
  "KHR_materials_unlit",
  "KHR_materials_volume",
  "KHR_mesh_quantization",
  "KHR_texture_transform",
  "EXT_materials_bump",
  "EXT_mesh_gpu_instancing",
  "EXT_texture_avif",
  "EXT_texture_webp"
]);

export function inspectGLB(buffer, limits = GLB_LIMITS) {
  if (!(buffer instanceof ArrayBuffer) || buffer.byteLength < 20) throw new Error("invalid");
  if (buffer.byteLength > limits.maxBytes) throw new Error("tooLarge");
  const view = new DataView(buffer);
  if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength) {
    throw new Error("invalid");
  }

  let offset = 12;
  let manifest = null;
  while (offset + 8 <= buffer.byteLength) {
    const length = view.getUint32(offset, true);
    const type = view.getUint32(offset + 4, true);
    offset += 8;
    if (length > buffer.byteLength - offset) throw new Error("invalid");
    if (type === 0x4e4f534a) {
      const source = new TextDecoder().decode(new Uint8Array(buffer, offset, length)).replace(/[\u0000\u0020]+$/g, "");
      try { manifest = JSON.parse(source); } catch { throw new Error("invalid"); }
      break;
    }
    offset += length;
  }

  if (!manifest || !/^2\.0(?:$|\.)/.test(manifest.asset?.version ?? "")) throw new Error("invalid");
  const references = [
    ...(Array.isArray(manifest.buffers) ? manifest.buffers : []),
    ...(Array.isArray(manifest.images) ? manifest.images : [])
  ];
  if (references.some((item) => item.uri && !item.uri.startsWith("data:"))) throw new Error("external");
  if ((manifest.nodes?.length ?? 0) > limits.maxNodes) throw new Error("complex");

  const jointIds = new Set((manifest.skins ?? []).flatMap((skin) => skin.joints ?? []));
  if (jointIds.size > limits.maxBones) throw new Error("complex");

  const positionAccessorIds = (manifest.meshes ?? []).flatMap((mesh) =>
    (mesh.primitives ?? []).map((primitive) => primitive.attributes?.POSITION).filter(Number.isInteger)
  );
  const vertexCount = positionAccessorIds.reduce((total, id) => total + (manifest.accessors?.[id]?.count ?? 0), 0);
  if (vertexCount > limits.maxVertices) throw new Error("complex");

  const animationAccessorIds = new Set();
  for (const animation of manifest.animations ?? []) {
    for (const channel of animation.channels ?? []) {
      const sampler = animation.samplers?.[channel.sampler];
      if (Number.isInteger(sampler?.input)) animationAccessorIds.add(sampler.input);
      if (Number.isInteger(sampler?.output)) animationAccessorIds.add(sampler.output);
    }
  }
  const animationKeyCount = [...animationAccessorIds].reduce((total, id) => total + (manifest.accessors?.[id]?.count ?? 0), 0);
  if (animationKeyCount > limits.maxAnimationKeys) throw new Error("complex");

  if ((manifest.extensionsRequired ?? []).some((name) => !SUPPORTED_REQUIRED_EXTENSIONS.has(name))) {
    throw new Error("unsupported");
  }
  return manifest;
}
