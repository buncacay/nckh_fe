import api from "../services/apiConnect"; 


export const login = async (loginDto)  => {
    const res = await api.post(`/Account/login`,loginDto);
    return res;
};