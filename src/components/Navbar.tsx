import { Box, Link, Typography } from "@mui/material";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import Logo from '../assets/images/ParkEase_Logo_black.png';

const Navbar = () => {
   const coins = localStorage.getItem("coins");
   const name = localStorage.getItem("name");

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
            <Box
               sx={{
               display: "flex",
               alignItems: "center",
               gap: 0.5,
               }}
            >
               <Typography sx={{ fontWeight: "600" }}>{coins}</Typography>
               <TbCoinRupeeFilled
               style={{
                  color: "#FFD700",
                  fontSize: "25px",
               }}
               />
            </Box>
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
            <Link component={NavLink} underline="none" to="/">
               <img style={{ height: "70px", width: "auto" }} src={Logo} alt="Logo" />
            </Link>
         </Box>
         </Box>
      </Box>
   );
};

export default Navbar;
