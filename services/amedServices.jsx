import api from "../services/apiConnect"; 
import axios from 'axios';

export const calldata = async (amendDto) =>{
   const res = await axios.post(`/amend/calldata`, amendDto) 
    return res;
};


export const getAmend = async (page,size,search,filter) => {
    const res = await api.get(`/Contract/amend?page=${page}&size=${size}&search=${search}&filter=${filter}`);
    return res;
}


export const getAmendId = async (id) => {
    const res = await api.get(`/Contract/amend/${id}`);
    return res;
}