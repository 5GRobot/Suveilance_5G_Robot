import axios from "axios"

export const postMode = async (mode) => {
    return await axios.post(`${import.meta.env.VITE_API}/mqtt/Mode`, { Mode: mode })
}
