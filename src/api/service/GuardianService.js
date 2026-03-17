import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";
import { toGuardianRequest } from "../schemas/dto/GuardianRequest";
import { toGuardianSchema } from "../schemas/Guardian";
import { createRoleService } from "./RoleService";

const GUARDIANS_ENDPOINT = "/guardians";

const guardianApi = createApiRepository(GUARDIANS_ENDPOINT, toGuardianRequest, toGuardianSchema);

export function createGuardianService() {
    const personService = createPersonService();
    const roleService = createRoleService();

    const ensureGuardianRole = async (guardianData) => {
        if (guardianData?.roleId) {
            return guardianData.roleId;
        }

        const resolvedRoleId = await roleService.resolveRoleId("guardian");

        if (!resolvedRoleId) {
            throw new Error(
                "Could not resolve guardian roleId. Configure VITE_ROLE_ID_GUARDIAN or provide roleId in payload."
            );
        }

        return resolvedRoleId;
    };

    

    return {
        async createGuardian(guardianData) {
            try {
                const roleId = await ensureGuardianRole(guardianData);
                const normalizedGuardianData = { ...guardianData, roleId };

                await personService.createPerson(normalizedGuardianData);
                return guardianApi.create(normalizedGuardianData);
            } catch (error) {
                console.error("Error creating guardian:", error);
                throw error;
            }
        },

        async getAllGuardians() { return guardianApi.getAll(); },

        async getGuardianById(id) { return guardianApi.getById(id); },

        async getGuardianByCpf(cpf) {
            try {
                const response = await api.get(`${GUARDIANS_ENDPOINT}/cpf/${cpf}`);
                return response.data ? toGuardianSchema(response.data[0]) : null;
            } catch (error) {
                console.error(`Error fetching guardian by CPF ${cpf}:`, error);
                throw error;
            }
        },

        async addStudentToGuardian(guardianId, studentId) {
            try {
                const response = await api.post(`${GUARDIANS_ENDPOINT}/${guardianId}/students/${studentId}`);
                return response.data;
            } catch (error) {
                console.error(`Error adding student ${studentId} to guardian ${guardianId}:`, error);
                throw error;
            }
        },

        async removeStudentFromGuardian(guardianId, studentId) {
            try {
                const response = await api.delete(`${GUARDIANS_ENDPOINT}/${guardianId}/students/${studentId}`);
                return response.data;
            } catch (error) {
                console.error(`Error removing student ${studentId} from guardian ${guardianId}:`, error);
                throw error;
            }
        },
    }
}