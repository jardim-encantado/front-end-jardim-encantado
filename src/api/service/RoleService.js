import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { roleNameMatches, toRoleSchema } from "../schemas/Role";
import { ROLE_NAME_ALIASES } from "../schemas/Role";

const ROLES_ENDPOINT = "/api/v1/roles";
const roleApi = createApiRepository(ROLES_ENDPOINT, undefined, toRoleSchema);

const toPositiveNumber = (value) => {
  const normalized = Number(value);
  return Number.isFinite(normalized) && normalized > 0 ? normalized : null;
};

const getRoleEnvFallback = (roleKey) => {
  const mapping = {
    admin: import.meta.env.VITE_ROLE_ID_ADMIN,
    teacher: import.meta.env.VITE_ROLE_ID_TEACHER,
    guardian: import.meta.env.VITE_ROLE_ID_GUARDIAN,
    student: import.meta.env.VITE_ROLE_ID_STUDENT,
  };

  return toPositiveNumber(mapping[roleKey]);
};

export function createRoleService() {
  return {
    async getAllRoles() {
      return roleApi.getAll();
    },

    async getRoleById(id) {
      return roleApi.getById(id);
    },

    async resolveRoleId(roleKey) {
      const aliases = ROLE_NAME_ALIASES[roleKey] ?? [String(roleKey ?? "")];

      try {
        const allRoles = await roleApi.getAll();
        const roleFromList = allRoles.find(
          (role) => roleNameMatches(role?.name, aliases) && role?.id !== null && role?.id !== undefined
        );

        if (roleFromList?.id !== null && roleFromList?.id !== undefined) {
          return roleFromList.id;
        }
      } catch (error) {
        console.warn("Could not list roles while resolving role id:", error);
      }

      for (let roleId = 1; roleId <= 20; roleId += 1) {
        try {
          const response = await api.get(`${ROLES_ENDPOINT}/${roleId}`);
          const role = toRoleSchema(response.data);

          if (roleNameMatches(role?.name, aliases)) {
            return role?.id ?? roleId;
          }
        } catch {}
      }

      return getRoleEnvFallback(roleKey);
    },
  };
}
