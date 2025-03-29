import axios from "axios"


export const getSlotStatus = async ()=>{
   try{
      const res = await axios.get('https://localhost:7144/api/Slots/count',
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
      return res.data.data;
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const getExpenceRevenue = async ()=>{
   try{
      const res = await axios.get('https://localhost:7050/api/Transaction/expense-revenue',
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
      return res.data.data;
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const getSubscriptionSummury = async ()=>{
   try{
      const res = await axios.get('https://localhost:7277/api/Company/subscription-summary',
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
      return res.data.data;
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const getRecentTransaction = async ()=>{
   try{
      const res = await axios.get('https://localhost:7050/api/Transaction/recent-transactions/company',
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );
      return res.data.data;
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}