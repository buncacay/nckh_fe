import api from '../services/apiConnect';


export const archive = async (id) => {
    const res = await api.post(`Faculty/${id}`);
    return res;
}


export const addFaculty = async (name) =>{
    const res = await api.post(`Faculty/${name}`);
    return res;
}

export const getFaculty = async(page, size, search=null) =>{
    const res = await api.get(`Faculty?page=${page}&size=${size}&search=${search}`);
    return res;
}


export const getFacultyId = async(id,page, size) =>{
    const res = await api.get(`Faculty/${id}?page=${page}&&size=${size}`);
    return res;
}


export const validate = async (names) => {
    return await api.post("Faculty/validate", names);
};