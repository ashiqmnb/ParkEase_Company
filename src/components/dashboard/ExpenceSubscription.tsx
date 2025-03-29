import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



interface ExpenceSubscriptionProps{
   expense: number;
   revenue: number;
   expencePending: boolean;
   status: string;
   duration: string;
   expiryDate: string;
   startData: string
   subscriptionPending: boolean
}


const ExpenceSubscription: React.FC<ExpenceSubscriptionProps> = ({
   expense,
   revenue,
   expencePending,
   duration,
   expiryDate,
   startData,
   status,
   subscriptionPending
}) => {

   const navigate = useNavigate();

   return (
      <Box 
         sx={{ 
            marginTop: "20px",
            display:'flex',
            gap:2,
         }}>
         <Box sx={{ width:'45%', height:'100%', display:'flex', flexDirection:'column', gap: 1}}>
            <Typography sx={{ fontSize: "24px", fontFamily: "Li", fontWeight: "600" }} >
               Expence and Revenue
            </Typography>
            <Box
               sx={{
                  backgroundColor: "#E6F8F0",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
                  padding:'20px',
                  minHeight:'136px',
                  flex:1
               }}
            >
               {expencePending ? 
                  <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                     <CircularProgress size={28} sx={{color:'#101921'}} />
                  </Box>
                  :
                  <>
                     <Typography>
                        Total Expence : <strong>{expense}</strong>
                     </Typography>
                     <Typography>
                        Total Revenue : <strong>{revenue}</strong>
                     </Typography>
                  </>
               }
            </Box>
         </Box>

         <Box sx={{ width:'5  5%', height:'100%', display:'flex', flexDirection:'column', gap: 1}} >
            <Typography sx={{ fontSize: "24px", fontFamily: "Li", fontWeight: "600" }}>
               Current Subscription Details
            </Typography>
            <Box
               sx={{
                  backgroundColor: "#E6F8F0",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
                  padding:'20px',
               }}
            >
               {subscriptionPending ? 
                  <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                     <CircularProgress size={28} sx={{color:'#101921'}} />
                  </Box>
                  :
                  <>
                     <Typography>
                        Subscription Status : <strong>{status}</strong>
                     </Typography>
                     {status == "Active" ? 
                        <Box>
                           <Typography>
                              Plan Duration : <strong>{duration} Days</strong>
                           </Typography>
                           <Typography>
                              Starting Date : <strong>{new Date(startData).toLocaleDateString("en-GB")}</strong>
                           </Typography>
                           <Typography>
                              Expiring Date : <strong>{new Date(expiryDate).toLocaleDateString("en-GB")}</strong>
                           </Typography>
                        </Box>
                        :
                        <Box>
                           <Button
                              onClick={()=> navigate('/profile')}
                              sx={{
                                 textTransform:'none',
                                 backgroundColor:'#101921',
                                 color:'white',
                                 width:"100%",
                                 marginTop:'20px'
                              }}
                              >
                              Add or Renew Subscription
                           </Button>
                        </Box>
                     }
                  </>
               }
            </Box>
         </Box>
      </Box>
   );
};

export default ExpenceSubscription;