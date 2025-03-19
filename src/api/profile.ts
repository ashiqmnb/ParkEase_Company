import axios from "axios";
import { AddressFormValues, EditLatLondValues } from "../types/profile";



export const getProfile = async () => {
   try {
      const res = await axios.get("https://localhost:7277/api/Company", 
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );
      return res.data;
   } 
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
};


export const AddAddress = async (values: AddressFormValues) => {
   try {
      await axios.post("https://localhost:7277/api/Address", 
         values, 
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );
   } 
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
};


export const EditLatLong = async(values:EditLatLondValues)=>{
   try{
      var res = await axios.patch(`https://localhost:7277/api/Address/${values.addressId}?latitude=${values.currentLat}&longitude=${values.currentLng}`,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );

      console.log("EditLatLong res", res.data)
      
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const addImages = async(values:any)=>{
   try{
      await axios.patch('https://localhost:7277/api/Company/add-images',
         values,
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
      );
   }
   catch (err: any) {
      return Promise.reject(err.response.data);
   }
}


export const updateProfile = async(values : any)=>{
   try{
      await axios.patch('https://localhost:7277/api/Company/profile-update',
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
