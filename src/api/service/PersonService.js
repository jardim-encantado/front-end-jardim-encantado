import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { toPersonRequest } from "../dto/PersonRequest";
import {
    toPersonResponseModel,
} from "../dto/PersonResponseModel";

const PERSONS_ENDPOINT = "/v1/persons";
const personApi = createApiRepository(PERSONS_ENDPOINT, toPersonRequest, toPersonResponseModel);

export function createPersonService() {
    return {
        async createPerson(personData) { return personApi.create(personData); },

        async getAllPersons() { return personApi.getAll(); },

        async getPersonById(id) { return personApi.getById(id); },

        async updatePerson(id, personData) { return personApi.update(id, personData); },

        async deletePerson(id) { return personApi.delete(id); },

        async login(cpf, password) { 
            try {
                const payload = {
                    cpf: cpf.replace(/\D/g, ""),
                    password,
                };
                const response = await api.post(`${PERSONS_ENDPOINT}/login`, payload);
                return toPersonResponseModel(response.data);
            } catch (error) {
                console.error("Error during login:", error);
                throw error;
            }
        }
    }
}