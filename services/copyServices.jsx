import api from "../services/apiConnect";



export const issueCopy = async (copyDto) => {
    const res= await api.post(`/Contract/copy/issue`,{copyDto});
    return res;
}




export const getCopies = async (page,size,search,filter) => {
    const res = await api.get(`/Contract/copy?page=${page}&size=${size}&search=${search}&filter=${filter}`);
    return res;
}


export const getCopyId = async (id) => {
    const res = await api.get(`/Contract/copy/${id}`);
    return res;
}