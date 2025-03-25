import { Box, Typography } from "@mui/material";
import { Slot } from "../../types/slotTypes";
import React, { useState } from "react";
import SlotDetailsModal from "../modals/SlotDetailsModal";


interface SlotsBodyProps{
   slots: Slot[]
}

const getBackgroundColor = (status: string) => {
   switch (status) {
     case "Available":
       return "#D9D9D9";
     case "Reserved":
       return "#2DC98A";
     case "Parked":
       return "#2F7A58";
     default:
       return "#D9D9D9";
   }
 };


const SlotsBody: React.FC<SlotsBodyProps> = ({slots = []}) => {

   const [openSlot, setOpenSlot] = useState<boolean>(false)
   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

   const handleSlotClick = (slot:Slot)=>{
      setSelectedSlot(slot);
      setOpenSlot(true);
   }


   return (
      <Box
         sx={{
            backgroundColor: "white",
            padding: "30px",
            marginTop: "30px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            display:'flex',
            flexWrap:'wrap',
            gap:3,
            justifyContent:'center'
         }}
      >
         {slots.length === 0 ? (
            <Box>No slots available</Box>
            ) : (
            slots.map((slot, index) => (
               <Box
                  onClick={()=>handleSlotClick(slot)}
                  key={index}
                  sx={{
                     height: "100px",
                     width: "100px",
                     cursor: "pointer",
                     transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                     "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
                     },
                  }}
               >
                  <Box
                     sx={{
                        height: "65px",
                        width: "100%",
                        backgroundColor: getBackgroundColor(slot.status),
                        borderRadius: "5px 5px 0 0",
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                     }}
                  >
                  <Typography
                     sx={{color:slot.status === "Available" ? 'black': 'white', fontWeight:'600', fontSize:'18px'}}
                     >
                     {slot.name}
                  </Typography>
                  </Box>
                  <Box
                     sx={{
                        height: "35px",
                        width: "100%",
                        backgroundColor: "#101921",
                        borderRadius: "0 0 5px 5px",
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                     }}
                  >
                     <Typography
                        sx={{color:'white', fontWeight:'600', fontSize:'14px'}}
                        >
                        {slot.type == "FourWheeler" ? '4 Wheeler':'2 Wheeler'}
                     </Typography>
                  </Box>
               </Box>
            ))
         )}

         <SlotDetailsModal
            open={openSlot}
            onClose={()=>setOpenSlot(false)}
            slot={selectedSlot}
            />
      </Box>
   );
};

export default SlotsBody;
