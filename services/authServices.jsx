import api from "../services/apiConnect"; 


export const login = async (loginDto)  => {
    const res = await api.post(`Account/login`,loginDto);
    return res;
};



export const getInfor = async(id) =>{
    const res = await api.get(`Account/infor/${id}`);
    return res;
} 