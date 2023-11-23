/* import axios from "axios";
import { config } from "dotenv";
import 'dotenv/config'
config()

const strapiURL = process.env.API_URL
const strapiBEARER = process.env.API_BEARER

const strapiApiClient = axios.create({
    baseURL: strapiURL,
    headers: { Authorization: `Bearer ${strapiBEARER}` }
})

export const setAuthToken = (token: string | null) => {
    if (token) {
        strapiApiClient.defaults.headers["Authorization"] = `Bearer ${token}`
    } else {
        strapiApiClient.defaults.headers["Authorization"] = `Bearer ${strapiBEARER}`
    }
}

export default strapiApiClient */