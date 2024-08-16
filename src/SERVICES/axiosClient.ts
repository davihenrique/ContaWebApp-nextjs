import environments from "@/constants/environments";
import axios from "axios";

export const axiosClient = axios.create({
    baseURL: environments.BASE_URL
});