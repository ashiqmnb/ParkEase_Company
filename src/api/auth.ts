import axios from "axios";
import { ChangePwCredentials, LoginCredential, ResetPwCredentials, verifyEmailCredentials } from "../types/authTypes";



export const login = async (credential: LoginCredential) => {
   try {
      const res = await axios.post(
         "https://localhost:7277/api/Auth/comapny/login",
         credential
      );
      return res.data;
   } catch (err: any) {
      return Promise.reject(err.response.data);
   }
};


export const forgotPw = async(email:string)=>{
   try{
      const res = await axios.post(`https://localhost:7277/api/Auth/company/forgot-password?email=${email}`)
      return res.data
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const verifyEmail = async(credetials: verifyEmailCredentials) => {
   try{
      const res = await axios.post(`https://localhost:7277/api/Auth/user/verify-otp-reset-password?email=${credetials.email}&otp=${credetials.otp}`)
      return res.data;
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const resetpw = async (credential: ResetPwCredentials)=>{
   try{
      const res = await axios.patch(`https://localhost:7277/api/Auth/company/reset-password`,credential)
      return res.data
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const changePassword = async(credentials: ChangePwCredentials)=>{
   try{
      await axios.patch('https://localhost:7277/api/Auth/company/change-password', 
         credentials,
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}
