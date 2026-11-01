const ROLE_KEYS = ["upperLeft", "upperRight", "forearmLeft", "forearmRight", "lowerLegLeft", "lowerLegRight"];

function isSide(name, side) {
  const raw = String(name ?? "").toLowerCase();
  const compact = raw.replace(/[^a-z0-9]/g, "");
  if (side === "Left") return compact.includes("left") || /(^|[^a-z])l([^a-z]|$)/i.test(raw);
  return compact.includes("right") || /(^|[^a-z])r([^a-z]|$)/i.test(raw);
}

function matchesRole(name, role) {
  const compact = String(name ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (role === "upper") return compact.includes("arm") && !/forearm|lowerarm|hand|finger|shoulder|clavicle/.test(compact);
  if (role === "forearm") return /forearm|lowerarm/.test(compact);
  return /calf|shin/.test(compact) || (compact.includes("leg") && !/upleg|thigh|foot|toe/.test(compact));
}

export function suggestPoseMapping(bones) {
  const result = {};
  for (const key of ROLE_KEYS) {
    const side = key.endsWith("Left") ? "Left" : "Right";
    const role = key.startsWith("upper") ? "upper" : key.startsWith("forearm") ? "forearm" : "lowerLeg";
    const candidates = bones.filter((bone) => isSide(bone.name, side) && matchesRole(bone.name, role));
    result[key] = candidates.length === 1 ? candidates[0] : null;
  }
  return result;
}
