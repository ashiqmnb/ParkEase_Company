import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { FormikProps } from "formik";

interface ForgotPwFormProps {
  formik: FormikProps<{ email: string }>;
  isLoading: boolean;
}

const ForgotPwForm: React.FC<ForgotPwFormProps> = ({ formik, isLoading }) => {
   return (
      <Box
         sx={{
         width: "450px",
         height: "350px",
         backgroundColor: "white",
         borderRadius: "20px",
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center",
         zIndex: 2,
         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
         }}
      >
         <Box sx={{ width: "300px", alignContent: "center" }}>
         <Typography
            sx={{
               textAlign: "center",
               fontFamily: "Libre Baskerville",
               fontWeight: "800",
               color: "#101921",
            }}
         >
            Forgot Your Password?
         </Typography>
         <Box
            sx={{
               height: "3px",
               width: "300px",
               backgroundColor: "#101921",
               borderRadius: "10px",
               marginY: "10px",
            }}
         />
         <Typography
            sx={{
               textAlign: "center",
               fontSize: "12px",
               fontFamily: "Libre Baskerville",
               fontWeight: "800",
               color: "#101921",
            }}
         >
            Enter your email address and we'll send you an OTP to reset your
            password.
         </Typography>
         </Box>

         <Box
         component="form"
         onSubmit={formik.handleSubmit}
         sx={{ width: "300px" }}
         >
            <TextField
               sx={{
                  color: "#7940CF",
                  marginY: "20px",
               }}
               label="Email"
               name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
               fullWidth
               required
            />

         <Button fullWidth type="submit" variant="contained"
            sx={{
               textTransform: "none",
               fontFamily: "Libre Baskerville",
               backgroundColor:'#101921',
               color:'white'
            }}
            >
            {isLoading ? (
               <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
               "Send"
            )}
         </Button>
         </Box>
      </Box>
   );
};

export default ForgotPwForm;
