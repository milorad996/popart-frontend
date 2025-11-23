import axios from "axios";

export default class HttpService {
    constructor() {
        this.client = axios.create({
            baseURL: "https://web-production-6bf77.up.railway.app/api"
        });
        this.client.interceptors.request.use(function (config) {
            const token = sessionStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
}