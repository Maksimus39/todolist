import axios from "axios";


const token = "54275d2e-2ded-46e5-91b3-790e8c1121ec"
const ApiKey = "54bd2699-2115-4c67-8b13-b021468f774d"

export const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        "API-KEY": ApiKey
    },
})