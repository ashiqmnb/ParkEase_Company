import { Modal, Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import { FormikProps } from "formik";


interface ChangePwModalProps {
   open: boolean;
   onClose: () => void;
   formik: FormikProps<{
      currentPassword: string;
      newPassword: string;
   }>;
   isPending:boolean
}

const ChangePwModal: React.FC<ChangePwModalProps> = ({ open, onClose, formik, isPending }) => {
   return (
      <Modal open={open} onClose={onClose}>
         <Box
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: 350,
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 3,
               borderRadius: 2,
               textAlign: "center",
            }}
         >
         <Typography variant="h6" gutterBottom>
            Change Password
         </Typography>
         <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField
               fullWidth
               margin="normal"
               label="Current Password"
               type="text"
               name="currentPassword"
               value={formik.values.currentPassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
               helperText={formik.touched.currentPassword && formik.errors.currentPassword}
            />
            <TextField
               fullWidth
               margin="normal"
               label="New Password"
               type="text"
               name="newPassword"
               value={formik.values.newPassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
               helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
            <Box
               sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
               >
               <Button 
                  sx={{
                     textTransform:'none',
                     backgroundColor:'#101921',
                     flex:1,
                     color:'white'
                  }}
                  type="submit">
                  {isPending ? (
                     <CircularProgress size={22} sx={{ color: "white" }} />
                     ) : (
                     "Change Password"
                  )}
               </Button>
               <Button
                  sx={{
                     width:'30%',
                     color:'white',
                     textTransform:'none', 
                     backgroundColor:'#2DC98A'
                  }}
                  onClick={onClose}>
                  Cancel
               </Button>
            </Box>
         </Box>
         </Box>
      </Modal>
   );
};

export default ChangePwModal;
