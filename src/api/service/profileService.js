import api from "../base/config";

const USER_ENDPOINT = "/api/v1/usuario";

export function createProfileService() {
  return {

    async getUserById(id) {
      try {
        const response = await api.get(`${USER_ENDPOINT}/${id}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        throw error;
      }
    },

    async getUserByCpf(cpf) {
      try {
        const response = await api.get(`${USER_ENDPOINT}/cpf/${cpf}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar usuário por CPF:", error);
        throw error;
      }
    }

  };
}