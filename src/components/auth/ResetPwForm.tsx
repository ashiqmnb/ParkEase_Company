import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

interface ResetPwFormProps {
   formik: FormikProps<{
      password: string;
      confirmPassword: string;
   }>;
   isPending: boolean;
}

const ResetPwForm: React.FC<ResetPwFormProps> = ({ formik, isPending }) => {
   return (
      <Box
         sx={{
         width: "500px",
         height: "400px",
         backgroundColor: "white",
         borderRadius: "20px",
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center",
         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
         zIndex: 2,
         }}
      >
         <Box sx={{ width: "400px", height: "50px" }}>
         <Typography
            sx={{
               textAlign: "center",
               fontFamily: "Libre Baskerville",
               fontWeight: "800",
               color: "#101921",
            }}
         >
            Reset Your Password
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

         <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "400px", marginTop: "20px" }}
            >
            <TextField
               sx={{ color: "#7940CF", marginTop: "10px" }}
               label="Password"
               type="password"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.password && Boolean(formik.errors.password)}
               helperText={formik.touched.password && formik.errors.password}
               fullWidth
               required
            />
            <TextField
               sx={{ color: "#7940CF", marginTop: "20px" }}
               label="Confirm Password"
               type="password"
               name="confirmPassword"
               value={formik.values.confirmPassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
               }
               helperText={
                  formik.touched.confirmPassword && formik.errors.confirmPassword
               }
               fullWidth
               required
            />
            <Button
               type="submit"
               variant="contained"
               sx={{
                  width: "100%",
                  backgroundColor: "#101921",
                  marginTop: "20px",
                  fontFamily: "Libre Baskerville",
                  textTransform: "none",
                  color: "white",
               }}
            >
               {isPending ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
               ) : (
                  "Verify Email"
               )}
            </Button>
         </Box>
      </Box>
   );
};

export default ResetPwForm;
