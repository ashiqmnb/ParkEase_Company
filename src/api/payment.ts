import axios from "axios";
import { PaymentData } from "../types/payment";



export const cretePayment = async (amount:string) => {
   try {
      const res = await axios.post(`https://localhost:7050/api/Coin/create-payment?amount=${amount}`,
         {},
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
      return res.data
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
};



export const confirmPaymentApi = async (paymentData: PaymentData) => {
   try {
      const res = await axios.post(`https://localhost:7050/api/Coin/confirm-payment`,
         paymentData,
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
      return res.data
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
};
