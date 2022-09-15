import axios from "axios";
import CONFIG from "../config";
import { SigninPropType, SignupPropType } from "../datatypes";

export const signupPlayer = async (data: SignupPropType) => {
    try {
        const response = await axios.post(`${CONFIG.ROOT_API}/auth/signup`, {...data});
        return response?.data;
    } catch (error: any) {
        return {...error.response.data, error:true};
    }
}
export const signinPlayer = async (data: SigninPropType) => {
    try {
        const response = await axios.post(`${CONFIG.ROOT_API}/auth/signin`, {...data});
        return response?.data;
    } catch (error: any) {
        return {...error.response.data, error:true};
    }
}