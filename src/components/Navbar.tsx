import { Box, Link, Tooltip, Typography } from "@mui/material";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import Logo from '../assets/images/ParkEase_Logo_black.png';
import { useState } from "react";
import AddCoinModal from "./modals/AddCoinModal";

const Navbar = () => {

   const coins = Number(localStorage.getItem("coins")) || 0;
   const name = localStorage.getItem("name");

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <Box
         sx={{
         height: "100%",
         width: "auto",
         backgroundColor: "#2DC98A",
         }}
      >
         <Box
         sx={{
            height: "100%",
            paddingX: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
         }}
         >
         <Typography
            sx={{
               fontFamily: "Libre Baskerville",
               fontSize: "clamp(14px, 2vw, 24px)",
               fontWeight: "600",
            }}
         >
            {name}
         </Typography>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 2,
            }}
         >
            <Tooltip title="Add coins" arrow>
               <Box 
                  onClick={handleOpen}
                  sx={{display:'flex', gap:1, alignItems:'center', cursor:'pointer'}}>
                  <Typography sx={{color:'black', fontWeight:'600'}}>
                     {coins}
                  </Typography>
                  <TbCoinRupeeFilled 
                     style={{
                        color:'gold',
                        fontSize:'28px'
                     }}
                     />
               </Box>
            </Tooltip>
            {/* <Tooltip title="notifications" arrow>
                  <NotificationsIcon sx={{ cursor: "pointer" }} />
               </Tooltip> */}
            <Typography
               sx={{
               fontFamily: "Protest Strike",
               fontSize: "clamp(14px, 3vw, 24px)",
               }}
            >
               ParkEase
            </Typography>
            <Link component={NavLink} underline="none" to="/dashboard">
               <img style={{ height: "70px", width: "auto" }} src={Logo} alt="Logo" />
            </Link>
         </Box>
         </Box>

         <AddCoinModal
            coins={coins}
            handleClose={handleClose}
            open={open}
            />


      </Box>
   );
};

export default Navbar;
