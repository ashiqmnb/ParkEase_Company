import axios from "axios";
import { AddSlotCredentials } from "../types/slot.";

export const getSlots = async () => {
   try {
      const res = await axios.get('https://localhost:7144/api/Slots',
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      )
      return res.data.data
   } 
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
};



export const addSlots = async (values:AddSlotCredentials) => {
   try{
      await axios.post('https://localhost:7144/api/Slots',
         values,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      )
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}

