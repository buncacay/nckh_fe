import api from "../services/apiConnect";
import axios from 'axios';

export const getLogs = async (page, size, search, filter, sort) => {


    const res = await api.get(`Log?page=${page}&size=${size}&search=${search}&filter=${filter}&sort=${sort}`); 
    return res;
};


export const getLogId = async (id) => {
    const res = await api.get(`Log/${id}`);
    return res;
}