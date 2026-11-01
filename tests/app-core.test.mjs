import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inspectGLB, GLB_LIMITS } from "../glb-safety.js";
import { suggestPoseMapping } from "../pose-mapping.js";

function makeGLB(manifest) {
  const json = new TextEncoder().encode(JSON.stringify(manifest));
  const paddedLength = Math.ceil(json.length / 4) * 4;
  const totalLength = 12 + 8 + paddedLength;
  const bytes = new ArrayBuffer(totalLength);
  const view = new DataView(bytes);
  view.setUint32(0, 0x46546c67, true);
  view.setUint32(4, 2, true);
  view.setUint32(8, totalLength, true);
  view.setUint32(12, paddedLength, true);
  view.setUint32(16, 0x4e4f534a, true);
  new Uint8Array(bytes, 20, json.length).set(json);
  new Uint8Array(bytes, 20 + json.length, paddedLength - json.length).fill(0x20);
  return bytes;
}

const validManifest = () => ({ asset: { version: "2.0" }, scene: 0, scenes: [{ nodes: [] }], nodes: [] });

test("accepts a self-contained GLB 2.0 manifest", () => {
  assert.equal(inspectGLB(makeGLB(validManifest())).asset.version, "2.0");
});

test("rejects bad magic, version, or declared byte length", () => {
  const badMagic = makeGLB(validManifest());
  new DataView(badMagic).setUint32(0, 0, true);
  assert.throws(() => inspectGLB(badMagic), /invalid/);

  const badVersion = makeGLB(validManifest());
  new DataView(badVersion).setUint32(4, 1, true);
  assert.throws(() => inspectGLB(badVersion), /invalid/);

  const badLength = makeGLB(validManifest());
  new DataView(badLength).setUint32(8, 999, true);
  assert.throws(() => inspectGLB(badLength), /invalid/);
});

test("rejects buffer and image references that could fetch external files", () => {
  const bufferRef = { ...validManifest(), buffers: [{ uri: "https://example.invalid/mesh.bin", byteLength: 4 }] };
  const imageRef = { ...validManifest(), images: [{ uri: "../texture.png" }] };
  assert.throws(() => inspectGLB(makeGLB(bufferRef)), /external/);
  assert.throws(() => inspectGLB(makeGLB(imageRef)), /external/);
});

test("allows embedded data URIs", () => {
  const manifest = { ...validManifest(), images: [{ uri: "data:image/png;base64,AA==" }] };
  assert.equal(inspectGLB(makeGLB(manifest)).images.length, 1);
});

test("rejects files and geometry that exceed safe limits", () => {
  const tooLarge = makeGLB(validManifest());
  assert.throws(() => inspectGLB(tooLarge, { ...GLB_LIMITS, maxBytes: 32 }), /tooLarge/);

  const oversizedMesh = {
    ...validManifest(),
    accessors: [{ count: GLB_LIMITS.maxVertices + 1 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }]
  };
  assert.throws(() => inspectGLB(makeGLB(oversizedMesh)), /complex/);
});

test("rejects unsupported required compression extensions", () => {
  const manifest = { ...validManifest(), extensionsRequired: ["KHR_draco_mesh_compression"] };
  assert.throws(() => inspectGLB(makeGLB(manifest)), /unsupported/);
});

test("suggests only unique, side-specific bones from actual names", () => {
  const names = [
    "mixamorigLeftArm", "mixamorigRightArm",
    "mixamorigLeftForeArm", "mixamorigRightForeArm",
    "mixamorigLeftUpLeg", "mixamorigRightUpLeg",
    "mixamorigLeftLeg", "mixamorigRightLeg"
  ];
  const bones = names.map((name, index) => ({ name, uuid: String(index) }));
  const result = suggestPoseMapping(bones);
  assert.equal(result.upperLeft.name, "mixamorigLeftArm");
  assert.equal(result.forearmRight.name, "mixamorigRightForeArm");
  assert.equal(result.lowerLegLeft.name, "mixamorigLeftLeg");
  assert.equal(result.lowerLegRight.name, "mixamorigRightLeg");
});

test("does not guess when bone names are absent or ambiguous", () => {
  assert.equal(suggestPoseMapping([]).upperLeft, null);
  const ambiguous = [
    { name: "LeftArm", uuid: "a" },
    { name: "LeftArmTwist", uuid: "b" },
    { name: "RightArm", uuid: "c" }
  ];
  assert.equal(suggestPoseMapping(ambiguous).upperLeft, null);
  assert.equal(suggestPoseMapping(ambiguous).upperRight.name, "RightArm");
});

test("matches the actual RobotExpressive demo bone names", () => {
  const names = [
    "UpperArm.L", "UpperArm.R", "LowerArm.L", "LowerArm.R",
    "UpperLeg.L", "UpperLeg.R", "LowerLeg.L", "LowerLeg.R"
  ];
  const bones = names.map((name, index) => ({ name, uuid: `demo-${index}` }));
  const result = suggestPoseMapping(bones);
  assert.equal(result.upperLeft.name, "UpperArm.L");
  assert.equal(result.upperRight.name, "UpperArm.R");
  assert.equal(result.forearmLeft.name, "LowerArm.L");
  assert.equal(result.forearmRight.name, "LowerArm.R");
  assert.equal(result.lowerLegLeft.name, "LowerLeg.L");
  assert.equal(result.lowerLegRight.name, "LowerLeg.R");
});

test("a model without skin joints keeps pose mapping unavailable", () => {
  const manifest = { ...validManifest(), skins: [] };
  assert.deepEqual(Object.values(suggestPoseMapping([])), [null, null, null, null, null, null]);
  assert.equal(inspectGLB(makeGLB(manifest)).skins, 0);
});

test("page exposes all four modes, accessible status, mobile layout, and keyboard controls", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = readFileSync(new URL("../main.css", import.meta.url), "utf8");
  const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
  for (const mode of ["surface", "mesh", "bones", "xray"]) {
    assert.match(html, new RegExp(`data-mode="${mode}"`));
    assert.match(app, new RegExp(`mode === "${mode}"`));
  }
  assert.match(html, /viewer-summary[^>]*aria-live="polite"/);
  assert.match(html, /role="alert"/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /touch-action: pan-y pinch-zoom/);
  assert.match(app, /ArrowLeft|ArrowRight/);
  assert.match(app, /resetPose\(\)/);
  assert.match(app, /statusNoSkeleton/);
});
