import { Modal, Box, Typography, Button } from "@mui/material";


interface LogoutModalProps{
   open: boolean;
   onClose: () => void;
   onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onClose, onConfirm }) => {
   return (
      <Modal open={open} onClose={onClose}>
         <Box
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: 300,
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 3,
               borderRadius: 2,
               textAlign: "center",
            }}
         >
            <Typography variant="h6" gutterBottom>
               Confirm Logout
            </Typography>
            <Typography variant="body2" gutterBottom>
               Are you sure you want to log out?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
               <Button variant="contained" color="error" onClick={onConfirm}>
                  Logout
               </Button>
               <Button variant="outlined" onClick={onClose}>
                  Cancel
               </Button>
            </Box>
         </Box>
      </Modal>
   );
};

export default LogoutModal;
