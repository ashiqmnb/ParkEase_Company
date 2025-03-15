import { Box, Typography } from "@mui/material";
import logo from "../../assets/images/ParkEase_Logo_noBg.png"


const AuthBanner = () => {
  return (
    <Box
      sx={{
        height: { xs: "250px", md: "450px" },
        width: "400px",
        backgroundColor: "#101921",
        borderRadius: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Li",
              color: "#2DC98A",
              fontSize: { xs: "24px", md: "30px" },
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Welcome To <br />
            ParkEase
          </Typography>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: { xs: "12px", md: "18px" },
            }}
          >
            Reserve, Park, Relex
          </Typography>
        </Box>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: "200px",
            height: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthBanner;
