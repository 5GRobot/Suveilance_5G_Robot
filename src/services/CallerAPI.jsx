import axios from 'axios';

export const getCaller = async () => {
    return await axios.get(`${import.meta.env.VITE_API}/cfr/getCaller`)
}


export const updateCaller = async (id) => {
    return await axios.put(`${import.meta.env.VITE_API}/cfr/updateCaller`, { id: id})
}

export const endCaller = async (id) => {
    return await axios.put(`${import.meta.env.VITE_API}/cfr/endCaller`, { id: id})
}

export const postComment = async (id, comment, title) => {
    return await axios.post(`${import.meta.env.VITE_API}/cfr/postComment`, { id: id, comment: comment, title: title })
}