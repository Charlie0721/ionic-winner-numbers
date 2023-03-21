import axios, { AxiosInstance } from "axios";
import {URL_API_URL} from './configUrl';



const axiosInstance: AxiosInstance=axios.create({

    baseURL:`${URL_API_URL}` ,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
