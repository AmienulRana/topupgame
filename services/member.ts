import axios from "axios";
import CONFIG from "../config";
import { getToken } from "../utils/cookie";


interface getServiceApiType {
    method:string;
    url:string;
    data?:any;
}
export async function getServiceApi({ method, url, data }: getServiceApiType){
    try {
        const response = await axios({
            method, data,
            headers:{ Authorization: `Bearer ${getToken()}` },
            url: `${CONFIG.ROOT_API}/players${url}`
        })
        return response?.data?.data;
    } catch (error: any) {
        return { error:true, ...error.response.data}
    }
}



export function getMemberOverview() {
    return getServiceApi({method: 'get', url: '/dashboard'})     
}

export function getMemberTransaction() {
    return getServiceApi({method: 'get', url: `/history`});    
}

export async function getTransactionDetail(id?:string, token?: string){
    return getServiceApi({method: 'get', url: `/history/${id}/detail`});    
}
export async function updateProfile(data: {username:string}){
    return getServiceApi({method:'post', url:"/edit", data})
}