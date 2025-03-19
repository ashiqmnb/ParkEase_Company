import { Box, Button, Tooltip, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { ProfileDescription } from "../../types/profile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UpdateProfileModal from "../modals/UpdateProfileModal";


interface ProfileDetailsProps{
   handleLogout:()=>void,
   data:ProfileDescription,
   openAddress: ()=>void,
   refetch: ()=> void
}

const ProfileDetails : React.FC<ProfileDetailsProps> = ({handleLogout, data, openAddress, refetch}) => {

   const navigate = useNavigate();

   const [openUpdate, setOpenUpdate] = useState<boolean>(false);

   const [preview, setPreview] = useState<string | null>(null);
   const [image, setImage] = useState<File | null>(null);
   
 
   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files && event.target.files?.[0];
     setImage(file);
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setPreview(reader.result as string);
       };
       reader.readAsDataURL(file);
     }
   };

   return (
      <Box
         sx={{
            padding: "30px",
            backgroundColor:'white',
            borderRadius:'10px',
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
         }}
      >
         <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography 
               sx={{
                  fontFamily: "Li",
                  fontSize: "24px",
                  color: "#101921",
                  marginBottom: "10px",
               }}
               >
                  {data.name}
            </Typography>
            <Box sx={{display:'flex', alignItems:'center',gap:2}}>
               <Typography sx={{ fontSize:'16px',}}>
                  Listed Slots
               </Typography>
               <Typography sx={{ fontSize:'14px',  fontWeight:'600',}}>
                  12 (2W)  24(4W)
               </Typography>
            </Box>
            <Tooltip title='Logout' arrow>
               <LogoutIcon onClick={handleLogout} />
            </Tooltip> 
         </Box>

         <Box
            sx={{display:'flex', gap:2}}
            >
            <Box
               component="img"
               src={data.profile ?? "fallback-image-url.jpg"}
               // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsDcwXQ2w9u4FMlEf_MMgtV0UGOblUKItSPQ&s"
               sx={{
                  borderRadius:'5px',
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  // minHeight:'200px',
                  // minWidth:'200px',
                  height: "250px",
                  width: "250px",
               }}
            />

            {/* right side */}
            <Box sx={{flex:1}}>
              <Box sx={{display:'flex', gap:2}}>
                  {/* description */}
                  <Box
                     sx={{
                        backgroundColor:'#EFF3F2',
                        padding:'10px',
                        borderRadius:'5px',
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                        width:'40%',
                        flex:1,
                     }}
                     >
                     <Typography sx={{ fontSize:'16px', fontWeight:'600' }}>
                        Description
                     </Typography>
                     <Typography sx={{ fontSize:'14px'}} >
                        {data.description}
                     </Typography>
                  </Box>

                  <Box
                     sx={{
                        backgroundColor:'#EFF3F2',
                        padding:'10px',
                        borderRadius:'5px',
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                        width:'40%',
                        flex:1
                     }}
                     >
                     <Typography sx={{ fontSize:'16px', fontWeight:'600' }}>
                        Contact
                     </Typography>
                     <Typography sx={{ fontSize:'14px'}} >
                       Email :-  {data.email}
                     </Typography>
                     <Typography sx={{ fontSize:'14px'}} >
                       Phone :-  {data.phone}
                     </Typography>
                  </Box>
              </Box>
              <Box
               sx={{display:'flex', gap:2, marginTop:'20px', justifyContent:'space-between'}}
               >
                  <Box
                     sx={{
                        backgroundColor:'#EFF3F2',
                        padding:'10px',
                        borderRadius:'5px',
                        width:'40%',
                        fontFamily:'Inter',
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                     }}
                     >
                     <Typography sx={{ fontSize:'16px', fontWeight:'600' }}>
                        Address
                     </Typography>

                     {!data.addressId ? 
                        <Button
                           onClick={openAddress}
                           sx={{
                              textTransform:'none',
                              backgroundColor:'#101921',
                              color:'white',
                              width:"100%",
                              marginTop:'20px'
                           }}
                           >
                        Add Address
                     </Button>
                     :
                     <Typography sx={{ fontSize:'14px'}}>
                        {data.place}, {data.district}, {data.state}, {data.postalCode}
                     </Typography>
                     }
                  </Box>
                  <Box
                     sx={{
                        backgroundColor:'#EFF3F2',
                        padding:'10px',
                        borderRadius:'5px',
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                        width:'35%'
                     }}
                     >
                     <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Typography sx={{ fontSize:'16px', fontWeight:'600' }}>
                           Subscription Status
                        </Typography>
                        <Typography 
                           sx={{
                              paddingX:'10px', 
                              fontSize:'14px',
                              borderRadius:'20px', 
                              fontFamily:'Li',
                              border: `2px solid ${data.subscriptionStatus === 'Active' ? 'green' : 'red'}`,
                              backgroundColor: data.subscriptionStatus === 'Active' ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                              color: data.subscriptionStatus === 'Active' ? 'green' : 'red',
                           }}
                           >
                           {data.subscriptionStatus}
                        </Typography>
                     </Box>
                     {data.subscriptionStatus === "Actice" ?
                        <Box>
                           <Typography sx={{ fontSize:'14px'}}>
                              Start Date : 12/11/2024
                           </Typography>
                           <Typography sx={{ fontSize:'14px'}}>
                              End Date : 12/12/2024
                           </Typography>
                        </Box>
                        :
                        <Box sx={{marginTop:'20px'}}>
                           <Button
                              sx={{
                                 textTransform:'none',
                                 backgroundColor:'#101921',
                                 color:'white',
                                 width:"100%"
                              }}
                              >
                              Add or Renew Subscription
                           </Button>
                        </Box>
                        }
                  </Box>
                  <Box
                     sx={{
                        backgroundColor:'#EFF3F2',
                        padding:'10px',
                        borderRadius:'5px',
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                        width:'20%'
                     }}
                     >
                     <Button
                        onClick={()=>setOpenUpdate(true)}
                        sx={{
                           textTransform:'none',
                           backgroundColor:"#2DC98A",
                           color:"white",
                           width:'100%',
                        }}
                        >
                        Edit Profile
                     </Button>
                     <Button
                        onClick={()=> navigate('/slots')}
                        sx={{
                           textTransform:'none',
                           backgroundColor:"#101921",
                           color:"white",
                           width:'100%',
                           marginTop:'10px'
                        }}
                        >
                        Add Slot
                     </Button>

                  </Box>
              </Box>
            </Box>
         </Box>

         <UpdateProfileModal
            onClose={()=>setOpenUpdate(false)}
            open={openUpdate}
            description={data.description }
            name={data.name}
            phone={data.phone}
            preview={preview}
            handleImageUpload={handleImageUpload}
            image={image}
            refetch={refetch}
            />


      </Box>
   );
};

export default ProfileDetails;
