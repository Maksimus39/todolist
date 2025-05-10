import axios from "axios";


const token = "54275d2e-2ded-46e5-91b3-790e8c1121ec"
const ApiKey = "887da9d0-52cf-4f16-99b8-0b6391f66433"

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        "API-KEY": ApiKey
    },
})