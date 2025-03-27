import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { toast } from "sonner";
import { confirmPaymentApi, cretePayment } from "../../api/payment";
import { PaymentData } from "../../types/paymentTypes";

interface AddCoinModalProps {
   open: boolean,
   handleClose: ()=>void,
   coins: number
}

declare global {
   interface Window {
     Razorpay: any;
   }
 }


const loadScript = (src:string): Promise<boolean> => {
   return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
   });
 };

const AddCoinModal:React.FC<AddCoinModalProps> = ({ open, handleClose, coins }) => {

   const [newCoins, setNewCoins] = useState("");

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewCoins(event.target.value);
   };

   const [raz, setRaz] = useState<any>(null);
   const [isRazorpayLoaded, setIsRazorpayLoaded] = useState<boolean  >(false);
  
   const handleSubmit = async () => {

      console.log("raz", raz);

      if(Number(newCoins) < 20){
         toast.error('amount should be minimum 20');
         return;
      }

      if(!isRazorpayLoaded){
         const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
         setIsRazorpayLoaded(scriptLoaded);
   
         if(!scriptLoaded){
           toast.error("Failed to load payment gateway. Please try again later");
           return;
         }
      }

      try{
         const createPayment = await cretePayment(newCoins);
         const orderId = createPayment.data;

         const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: Number(newCoins) * 100,
            currency: "INR",
            name: "ParkEase",
            description: "Coin Purchase Payment",
            order_id: orderId,
            handler: async function(response:any) {

               const paymentData: PaymentData = {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
               };

               setRaz(paymentData);

               try{
                  await confirmPaymentApi(paymentData);
                  
                  const updatedCoins = Number(coins) + Number(newCoins)/2;
                  localStorage.setItem('coins', updatedCoins.toString());

                  toast.success(`Coins Added +${Number(newCoins)/2}`)
                  setNewCoins('');
                  handleClose();
               }
               catch(error){
                  console.log("==>",error);
                  toast.error("Error occured while confirming payment");
               }
            },
            theme: {
               color: "#2DC98A"
            }
         };

         const razorpay = new window.Razorpay(options);
         razorpay.open();

      }
      catch(err:any){
         console.log("eooro while creating order id", err);
         toast.error(err.message);
      }

   };

   return (
      <Modal open={open} onClose={handleClose}>
         <Box sx={style}>
            <Box
               onClick={handleClose}
               sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
               }}
            >
               <Typography
                  sx={{ color: "black", fontWeight: "600", fontSize: "20px" }}
               >
                  {coins}
               </Typography>
               <TbCoinRupeeFilled style={{ color: "gold", fontSize: "28px" }} />
            </Box>
            <Box
               sx={{
                  backgroundColor:'#101921',
                  padding:'20px',
               }}
            >
               <Typography
                  sx={{color:'#2DC98A', fontFamily:'Protest strike', fontSize:'20px', textAlign:'center'}}
                  >
                  10 ParkEase Coins for just ₹ 20
               </Typography>
               <Typography
                  sx={{color:'#2DC98A', textAlign:'center'}}
                  >
                  Add more coins now  !!
               </Typography>
            </Box>
            <Box sx={{marginY:'20px', display:'flex', flexDirection:'column', gap:1}}>
               <TextField
                  type="number"
                  label="Enter Amount"
                  variant="outlined"
                  fullWidth
                  rows={3}
                  value={newCoins}
                  onChange={handleChange}
                  />
               <Button
                  sx={{width:'100%', textTransform:'none', fontWeight:'600', fontFamily:'Li'}}
                  variant="contained" onClick={handleSubmit}>
                  Purchase
               </Button>
            </Box>
         </Box>
      </Modal>
   );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  bboxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.2)", 
  borderRadius: 4,
};

export default AddCoinModal;
