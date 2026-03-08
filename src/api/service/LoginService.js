import api from "./config";

export const login = async (cpf, password) => {
    try {
        const payload = {
            cpf: cpf.replace(/\D/g, ""),
            password,
        };
        const response = await api.post("/login", payload);
        return toPersonResponseModel(response.data);
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}