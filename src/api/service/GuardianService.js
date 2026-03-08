import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";
import { toGuardianRequest } from "../schemas/dto/GuardianRequest";
import { toGuardianSchema } from "../schemas/Guardian";

const GUARDIANS_ENDPOINT = "v1/guardians";

const guardianApi = createApiRepository(GUARDIANS_ENDPOINT, toGuardianRequest, toGuardianSchema);

export function createGuardianService() {
    const personService = createPersonService();

    return {
        async createGuardian(guardianData) {
            try {
                await personService.createPerson(guardianData);
                return guardianApi.create(guardianData);
            } catch (error) {
                console.error("Error creating guardian:", error);
                throw error;
            }
        },

        async getAllGuardians() { return guardianApi.getAll(); },

        async getGuardianById(id) { return guardianApi.getById(id); },

        async updateGuardian(id, guardianData) { return guardianApi.update(id, guardianData); },

        async deleteGuardian(id) { return guardianApi.delete(id); },

        async addStudentToGuardian(guardianId, studentId) {
            try {
                const response = await api.post(`${GUARDIANS_ENDPOINT}/${guardianId}/students/${studentId}`);
                return response.data;
            } catch (error) {
                console.error(`Error adding student ${studentId} to guardian ${guardianId}:`, error);
                throw error;
            }
        }
    }
}