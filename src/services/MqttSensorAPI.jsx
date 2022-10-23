import axios from 'axios';

export const getSensor = async () => {
    return await axios.get(`${import.meta.env.VITE_API}/mqtt/Sensor`)
}