import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import bgImage from "../../assets/images/authBg.jpg"
import OTP from "../../components/auth/OtpInput";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../../api/auth";
import { verifyEmailCredentials } from "../../types/authTypes";
import { toast } from "sonner";

const VerifyOtpContainer = () => {

	const [otp, setOtp] = useState('');

	const navigate = useNavigate();
	const email = localStorage.getItem('email');

	const verifyOtpMutation = useMutation({
		mutationFn:verifyEmail,
		onSuccess:(res)=>{
			toast.success(res.data)
			setTimeout(() => {
        navigate('/auth/resetpw')
      }, 3000);
		},
		onError:(err:any)=>{
			console.log("error", err)
			toast.error(err.error)
		}
	})

	const handleSubmit = ()=>{
		if(otp.length < 6 || otp === ''){
			toast.warning('OTP must contain 6 charecters')
			return
		}
		const credentials:verifyEmailCredentials = {
			email : email || "",
			otp : otp || "",
		}
		verifyOtpMutation.mutate(credentials)
	}

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
        }}
      />
      <Box
        sx={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            marginTop: "80px",
            width: "400px",
            height: "50px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Libre Baskerville",
              fontWeight: "800",
              color: "#101921",
            }}
          >
            Verify Your Email
          </Typography>
          <Box
            sx={{
              height: "3px",
              width: "400px",
              backgroundColor: "#101921",
              borderRadius: "10px",
              marginY: "10px",
            }}
          />
        </Box>

        <Box sx={{ width: "400px", marginTop: "30px",}}>
          <Typography
            sx={{
              marginBottom: "12px",
              fontSize: "12px",
              textAlign: "left",
              fontFamily: "Libre Baskerville",
              fontWeight: "800",
              color: "#101921",
            }}
          >
            Enter OTP here !
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <OTP
              separator={<span></span>}
              value={otp}
              onChange={setOtp}
              length={6}
            />
          </Box>

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#101921",
              marginTop: "50px",
              fontFamily: "Libre Baskerville",
              textTransform: "none",
				      color:'white'
            }}
          >
            {verifyOtpMutation.isPending ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Verify Email"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyOtpContainer;
