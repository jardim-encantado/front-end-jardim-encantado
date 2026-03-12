import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { toPersonRequest } from "../schemas/dto/PersonRequest";
import { toPersonSchema } from "../schemas/Person";
import { sanitizeCpf } from "../util/objectUtil";

const PERSONS_ENDPOINT = "/api/v1/person";

const personApi = createApiRepository(
	PERSONS_ENDPOINT,
	toPersonRequest,
	toPersonSchema
);

export function createPersonService() {

	return {

		async createPerson(personData) {
			return personApi.create(personData);
		},

		async getAllPersons() {
			return personApi.getAll();
		},

		async getPersonById(id) {
			return personApi.getById(id);
		},

		async updatePerson(id, personData) {
			return personApi.update(id, personData);
		},

		async login(cpf, password) {

			try {

				const payload = {
					cpf: sanitizeCpf(cpf),
					password,
				};

				const response = await api.post(
					`${PERSONS_ENDPOINT}/login`,
					payload
				);

				return response.data;

			} catch (error) {

				console.error("Error during login:", error);
				throw error;

			}
		},
	};
}