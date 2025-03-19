import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { purchaseSubscription } from "../../api/profile";




interface AddSubModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AddSubModal: React.FC<AddSubModalProps> = ({ open, onClose, refetch }) => {
   const [selectedPlan, setSelectedPlan] = useState<{ days: number; price: number } | null>(null);

   const subscriptionPlans = [
      { days: 7, price: 500 },
      { days: 14, price: 950 },
   ];

   const purchaseMutation = useMutation({
      mutationFn: purchaseSubscription,
      onSuccess: () => {
         toast.success("Subscription purchased successfully!");
         refetch();
         onClose();
      },
      onError: (err:any) => {
         console.log("errorr", err)
         toast.error("Failed to purchase subscription. Please try again.");
      },
   });

   const coins = localStorage.getItem("coins") || "";


   const handlePurchase = ()=>{
      if(selectedPlan != undefined){
         if( Number(coins) < selectedPlan?.price){
            toast.warning("Coins are not enought, Add more coins")
         }
         else{
            purchaseMutation.mutate(selectedPlan.days);
         }
      }
   }

   return (
      <Modal open={open} onClose={onClose}>
         <Box
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: 400,
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 4,
               borderRadius: 2,
            }}
         >
            <Box display="flex" justifyContent="space-between" alignItems="center">
               <Typography variant="h6">Choose a Subscription</Typography>
               <Button onClick={onClose}>
                  <Close sx={{color:'black'}} />
               </Button>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
               {subscriptionPlans.map((plan) => (
                  <Grid item xs={6} key={plan.days}>
                  <Card
                     sx={{
                        border: selectedPlan?.days === plan.days ? "2px solid #2DC98A" : "1px solid gray",
                        borderRadius: "10px",
                        boxShadow: selectedPlan?.days === plan.days ? "0px 0px 10px #2DC98A" : "none",
                        transition: "0.3s",
                        backgroundColor:selectedPlan?.days === plan.days ? "#2DC98A" : "none",
                     }}
                  >
                     <CardActionArea onClick={() => setSelectedPlan(plan)}>
                        <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6">{plan.days} Days</Typography>
                        <Typography variant="body1">₹{plan.price}</Typography>
                        </CardContent>
                     </CardActionArea>
                  </Card>
                  </Grid>
               ))}
            </Grid>

            <Button
               variant="contained"
               sx={{ mt: 3, width: "100%", background: "#101921", color: "white", textTransform:'none' }}
               disabled={!selectedPlan}
               onClick={handlePurchase}
            >
               {purchaseMutation.isPending ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Purchase"}
            </Button>
         </Box>
      </Modal>
   );
};

export default AddSubModal;
