import { Box, Tooltip, Typography } from "@mui/material";
import logo from "../assets/images/ParkEase_Logo_noBg.png";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GarageIcon from '@mui/icons-material/Garage';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';

const listItemBox = {
   height: "50px",
   // width:'200px',
   paddingX: { xs: "20px", sm: "30px" },
   borderRadius: "10px",
   border: "1px solid #2DC98A",
   display: "grid",
   placeItems: "center",
   cursor: "pointer",
};

const listItemText = {
   fontFamily: "Libre Baskerville",
   fontWeight: "600",
   display: { xs: "none", sm: "hidden" },
};

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation();

   return (
      <Box
         sx={{
         height: "100vh",
         width: { sx: "100px", sm: "300px" },
         backgroundColor: "#101921",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: 10,
         }}
      >
         <Box
         component="img"
         src={logo}
         alt="Logo"
         sx={{
            width: { xs: "80px", sm: "200px" },
            height: "auto",
         }}
         />
         <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
         }}
         >
         <Box
            onClick={() => navigate("dashboard")}
            sx={{
               ...listItemBox,
               backgroundColor: location.pathname.startsWith("/dashboard")
               ? "#2DC98A"
               : "#101921",
            }}
            >
            <Tooltip title="Dashboard" arrow>
               <DashboardIcon
               sx={{
                  display: { xs: "hidden", sm: "none" },
                  color: location.pathname.startsWith("/dashboard")
                     ? "#101921"
                     : "#2DC98A",
               }}
               />
            </Tooltip>
            <Typography
               sx={{
               ...listItemText,
               color: location.pathname.startsWith("/dashboard")
                  ? "#101921"
                  : "#2DC98A",
               }}
            >
               Dashboard
            </Typography>
         </Box>

         <Box
            onClick={() => navigate("slots")}
            sx={{
               ...listItemBox,
               backgroundColor: location.pathname.startsWith("/slots")
               ? "#2DC98A"
               : "#101921",
            }}
            >
            <Tooltip title="Slots" arrow>
               <GarageIcon
                  sx={{
                     display: { xs: "hidden", sm: "none" },
                     color: location.pathname.startsWith("/slots")
                        ? "#101921"
                        : "#2DC98A",
                  }}
               />
            </Tooltip>
            <Typography
               sx={{
               ...listItemText,
               color: location.pathname.startsWith("/slots")
                  ? "#101921"
                  : "#2DC98A",
               }}
            >
               Slots
            </Typography>
         </Box>

         <Box
            onClick={() => navigate("transactions")}
            sx={{
               ...listItemBox,
               backgroundColor: location.pathname.startsWith("/transactions")
               ? "#2DC98A"
               : "#101921",
            }}
            >
            <Tooltip title="Transactions" arrow>
               <ReceiptIcon
                  sx={{
                     display: { xs: "hidden", sm: "none" },
                     color: location.pathname.startsWith("/transactions")
                        ? "#101921"
                        : "#2DC98A",
                  }}
               />
            </Tooltip>
            <Typography
               sx={{
                  ...listItemText,
                  color: location.pathname.startsWith("/transactions")
                     ? "#101921"
                     : "#2DC98A",
               }}
            >
               Transactions
            </Typography>
         </Box>

         <Box
            onClick={() => navigate("profile")}
            sx={{
               ...listItemBox,
               backgroundColor: location.pathname.startsWith("/profile")
               ? "#2DC98A"
               : "#101921",
            }}
            >
            <Tooltip title="Profile" arrow>
               <AccountBoxIcon
                  sx={{
                     display: { xs: "hidden", sm: "none" },
                     color: location.pathname.startsWith("/profile")
                        ? "#101921"
                        : "#2DC98A",
                  }}
               />
            </Tooltip>
            <Typography
               sx={{
                  ...listItemText,
                  color: location.pathname.startsWith("/profile")
                     ? "#101921"
                     : "#2DC98A",
               }}
            >
               Profile
            </Typography>
         </Box>

         </Box>
      </Box>
   );
};

export default Sidebar;
