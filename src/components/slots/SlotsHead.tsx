import { Box, Button, Typography } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

interface SlotsHeadProps {
   total: number;
   twoWheeler: number;
   fourWheeler: number;
   available: number;
   reserved: number;
   parked: number;
   onOpen: () => void
}

const SlotsHead: React.FC<SlotsHeadProps> = ({
   total,
   twoWheeler,
   fourWheeler,
   available,
   reserved,
   parked,
   onOpen
}) => {
   return (
      <Box>
         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
            <Typography
               sx={{
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#101921",
               }}
            >
               Listed Slots From Your Company
            </Typography>
            <Box sx={{ display: "flex" }}>
               <Typography
                  sx={{
                     backgroundColor: "rgba(0, 0, 0, 0.3)",
                     paddingX: "15px",
                     paddingY: "5px",
                     borderRadius: "5px 0 0 5px",
                     fontWeight: "600",
                  }}
               >
                  {total} Total
               </Typography>
               <Typography
                  sx={{
                     backgroundColor: "rgba(45, 201, 138, 0.3)",
                     paddingX: "15px",
                     paddingY: "5px",
                     fontWeight: "600",
                  }}
               >
                  {twoWheeler} 2W
               </Typography>
               <Typography
                  sx={{
                     backgroundColor: "rgba(0, 0, 0, 0.3)",
                     paddingX: "15px",
                     paddingY: "5px",
                     borderRadius: "0 5px 5px 0",
                     fontWeight: "600",
                  }}
               >
                  {fourWheeler} 4W
               </Typography>
            </Box>
         </Box>

         <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               marginTop:'30px'
            }}
            >
            <Typography
               sx={{
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "gray",
               }}
            >
               Select a slot to manage
            </Typography>

            <Button
               onClick={onOpen}
               sx={{color:'white', textTransform:'none'}}
               variant="contained" startIcon={<AddToPhotosIcon sx={{color:'white'}}/>}>
               Add New Slot
            </Button>
            <Box sx={{ display: "flex",gap:2}}>
               <Typography
                  sx={{
                     backgroundColor: "#D9D9D9",
                     paddingX: "15px",
                     paddingY: "5px",
                     borderRadius: "5px",
                     fontWeight: "600",
                  }}
               >
                  {available} Available
               </Typography>
               <Typography
                  sx={{
                     backgroundColor: "#2DC98A",
                     paddingX: "15px",
                     paddingY: "5px",
                     borderRadius: "5px",
                     fontWeight: "600",
                     color:'white'
                  }}
               >
                  {reserved} Reserved
               </Typography>
               <Typography
                  sx={{
                     backgroundColor: "#2F7A58",
                     paddingX: "15px",
                     paddingY: "5px",
                     borderRadius: "5px",
                     fontWeight: "600",
                     color:'white'
                  }}
               >
                  {parked} Parked
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default SlotsHead;
