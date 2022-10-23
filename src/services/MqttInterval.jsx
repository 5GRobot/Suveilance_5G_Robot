import axios from 'axios';

export const getMqttInterval = async () => {
    return await axios.get(`${import.meta.env.VITE_API}/mqtt/Interval`)
}