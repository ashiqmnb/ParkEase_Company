import { Box, CircularProgress, Typography } from "@mui/material";

interface SlotStatusProps {
   available: number;
   fourWheeler: number;
   parked: number;
   reserved: number;
   total: number;
   twoWheeler: number;
   slotPending: boolean
}

const SlotsStatus: React.FC<SlotStatusProps> = ({
   available,
   fourWheeler,
   parked,
   reserved,
   total,
   twoWheeler,
   slotPending
}) => {

   return (
      <Box>
         <Typography sx={{ fontSize: "24px", fontFamily: "Li", fontWeight: "600" }} >
            Current Slot Stauts
         </Typography>

         <Box sx={{ width:'100%', height:'120px', display:'flex', gap:2 }}>
            {slotPending ? 
               <Box sx={{
                  height:'100%',
                  width:'50%',
                  backgroundColor:'#101921',
                  borderRadius:'10px',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center'
               }}>
                  <CircularProgress size={30} sx={{color:'#2DC98A'}}/>
               </Box>   
               :
               <Box
                  sx={{
                     height:'100%',
                     width:'50%',
                     backgroundColor:'#101921',
                     borderRadius:'10px',
                     display:'flex',
                     justifyContent:'space-evenly'
                  }}
                  >
                  <Box sx={{display:'flex',height:'100%',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <Typography sx={{ fontSize:'36px', fontWeight:'600', color:'#2DC98A'}}>
                        {available}
                     </Typography>
                     <Typography sx={{ fontSize:'18px', fontWeight:'600', marginTop:'-5px', color:'#2DC98A' }}>
                        Available
                     </Typography>
                  </Box>
                  <Box sx={{display:'flex',height:'100%',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <Typography sx={{ fontSize:'36px', fontWeight:'600', color:'#2DC98A'}}>
                        {reserved}
                     </Typography>
                     <Typography sx={{ fontSize:'18px', fontWeight:'600', marginTop:'-5px', color:'#2DC98A' }}>
                        Reserved
                     </Typography>
                  </Box>
                  <Box sx={{display:'flex',height:'100%',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <Typography sx={{ fontSize:'36px', fontWeight:'600', color:'#2DC98A'}}>
                        {parked}
                     </Typography>
                     <Typography sx={{ fontSize:'18px', fontWeight:'600', marginTop:'-5px', color:'#2DC98A' }}>
                        Parked
                     </Typography>
                  </Box>
            </Box>
            }

            {slotPending ? 
               <Box 
                  sx={{
                     height:'100%',
                     width:'50%',
                     backgroundColor:'#101921',
                     borderRadius:'10px',
                     display:'flex',
                     justifyContent:'center',
                     alignItems:'center'
                  }}
                  >
                  <CircularProgress size={30} sx={{color:'#2DC98A'}}/>
               </Box>  
               :
               <Box
                  sx={{
                     height:'100%',
                     width:'50%',
                     backgroundColor:'#2DC98A',
                     borderRadius:'10px',
                     display:'flex',
                     justifyContent:'space-evenly'
                  }}
                  >
                  <Box sx={{display:'flex',height:'100%',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <Typography sx={{ fontSize:'36px', fontWeight:'600', color:'#101921'}}>
                        {twoWheeler}
                     </Typography>
                     <Typography sx={{ fontSize:'18px', fontWeight:'600', marginTop:'-5px', color:'#101921' }}>
                        Two Wheeler
                     </Typography>
                  </Box>
                  <Box sx={{display:'flex',height:'100%',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <Typography sx={{ fontSize:'36px', fontWeight:'600', color:'#101921'}}>
                        {fourWheeler}
                     </Typography>
                     <Typography sx={{ fontSize:'18px', fontWeight:'600', marginTop:'-5px', color:'#101921' }}>
                        Four Wheeler
                     </Typography>
                  </Box>
                  <Box sx={{display:'flex',height:'100%',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                     <Typography sx={{ fontSize:'36px', fontWeight:'600', color:'#101921'}}>
                        {total}
                     </Typography>
                     <Typography sx={{ fontSize:'18px', fontWeight:'600', marginTop:'-5px', color:'#101921' }}>
                        Total
                     </Typography>
                  </Box>
               </Box>
            }
         </Box>
      </Box>
   );
};

export default SlotsStatus;
