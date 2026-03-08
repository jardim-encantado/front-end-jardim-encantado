const normalizeRoleString = (value) => {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export const normalizeRoleName = normalizeRoleString;

export const toRoleSchema = (role = {}) => {
  if (!role || typeof role !== "object") {
    return null;
  }

  return {
    id: role.id ?? role.roleId ?? null,
    name: role.name ?? role.roleName ?? "",
  };
};

export const roleNameMatches = (candidateRoleName, aliases = []) => {
  const normalizedCandidate = normalizeRoleString(candidateRoleName);

  return aliases
    .map(normalizeRoleString)
    .some((alias) => normalizedCandidate === alias || normalizedCandidate.includes(alias));
};
