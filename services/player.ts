import axios, { AxiosError, AxiosResponse } from 'axios';
import CONFIG from '../config';
import { CheckoutTypes } from '../datatypes';
import { getToken } from '../utils/cookie';



export const getFeaturedGame  = async () => {
    const response = await axios.get(`${CONFIG.ROOT_API}/players`);
    return response?.data?.data;
}

export const getVoucherGameDetail = async (id: string) => {
    const response = await axios.get(`${CONFIG.ROOT_API}/players/detail/${id}`);
    return response?.data?.data;
}
export const checkUsername = async (id:string, gamecode: string) => {
    const merchantID = "M220908VTPV3066ZU";
    const signature = "65e7b2587ecadf5de5ef34091bda5a2a";
    const response = await axios.get(
      `https://v1.apigames.id/merchant/${merchantID}/cek-username/${gamecode}?user_id=${id}&signature=${signature}`
    );
    if(response?.data){
        return response.data
    }
}
export const checkoutToApiGame = async (id:string) => {
    const merchantID = "M220908VTPV3066ZU";
    const signature = "65e7b2587ecadf5de5ef34091bda5a2a";
    const data = {
        "ref_id": +Date.now(),
        "merchant_id": merchantID,
        "produk": "FF5",
        "tujuan": id,
        "signature": signature
    }
    const response = await axios.post(
      `https://v1.apigames.id/transaksi`,
      {...data}
    );
    if(response?.data){
        return response.data
    }
}

export async function setCheckout(data: CheckoutTypes) {
    try {
        const response = await axios({
            method:"post",
            url:`${CONFIG.ROOT_API}/players/checkout`,
            headers:{
                Authorization: `Bearer ${getToken()}`
            },
            data
        });
        return response?.data?.data;
    } catch (error: any) {
        return {error: true, ...error.response.data}
    }
  }