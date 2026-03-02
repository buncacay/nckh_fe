import api from "../services/apiConnect"; 
import bigIntReplacer from '../components/utils/utils'

export const calldata = async (diplomaDto) =>{
    const res = await api.post(`/diploma/calldata`, diplomaDto); 
    return res;
};





export const getDiplomas = async (page,size,search,filter,sort) => {
    const res = await api.get(`/Contract/diploma?page=${page}&size=${size}&search=${search}&filter=${filter}&sort=${sort}`);
    return res;
}


export const getDiplomaId = async (id) => {
    const res = await api.get(`/Contract/diploma/${id}`);
    return res;
}

