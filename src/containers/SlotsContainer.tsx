import { Box } from "@mui/material";
import SlotsHead from "../components/slots/SlotsHead";
import SlotsBody from "../components/slots/SlotsBody";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addSlots, getSlots } from "../api/slot";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddNewSlotModal from "../components/modals/AddNewSlotModal";
import { AddSlotCredentials } from "../types/slotTypes";
import { toast } from "sonner";


const SlotsContainer = () => {

   const { data: slots, refetch } = useQuery({
      queryKey:['slots'],
      queryFn:getSlots,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
   }) 

   const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

   const addSlotMutation = useMutation({
      mutationFn:addSlots,
      onSuccess:()=>{
         toast.success("Slot added successfully");
         refetch();
         setAddModalOpen(false);
      },
      onError:(err:any)=>{
         toast.error(err.error)
      }
   })


   const validationSchema = Yup.object({
      name: Yup.string()
         .min(3, "Slot name must be at least 3 characters")
         .required("Slot name is required"),
      type: Yup.string()
         .oneOf(["FourWheeler", "TwoWheeler"], "Invalid slot type")
         .required("Slot type is required"),
   });
 

   const formik = useFormik({
      initialValues: {
         name: "",
         type: "FourWheeler",
      },
      validationSchema,
      onSubmit: (values:AddSlotCredentials) => {
         addSlotMutation.mutate(values)
      },
   });

   return (
      <Box sx={{ backgroundColor: "#E6F8F0", padding: "30px", height:'90vh' }}>
         <SlotsHead
            total={slots?.total}
            twoWheeler={slots?.twoWheeler}
            fourWheeler={slots?.fourWheeler}
            available={slots?.available}
            reserved={slots?.reserved}
            parked={slots?.parked}
            onOpen={()=>setAddModalOpen(true)}
         />
         <SlotsBody
            slots={slots?.slots}
         />

         <AddNewSlotModal
            formik={formik}
            open={addModalOpen}
            onClose={()=>setAddModalOpen(false)}
            isPending={addSlotMutation.isPending}
         />
      </Box>
   );
};

export default SlotsContainer;
