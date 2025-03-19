import { Box, Button, CircularProgress, Typography } from "@mui/material";
import MapComponent from "./MapComponent";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { EditLatLong } from "../../api/profile";
import AddImagesModal from "../modals/AddImagesModal";



interface MapAndImagesProps{
   images: string[] | null;
   latitude: number;
   longitude: number;
   addressId: string;
   refetch: () => void;
}

const MapAndImages:React.FC<MapAndImagesProps> = ({images, latitude, longitude, addressId, refetch}) => {

   const isValidNumber = (num: any) => typeof num === "number" && !isNaN(num);
   const [currentLat, setCurrentLat] = useState(
      isValidNumber(latitude) ? latitude : 0
   );
   const [currentLng, setCurrentLng] = useState(
      isValidNumber(longitude) ? longitude : 0
   );

   const [isEditing, setIsEditing] = useState(false);
   const [mapKey, setMapKey] = useState(0);

   const editLatLongMutation = useMutation({
      mutationFn:EditLatLong,
      onSuccess:()=>{
         console.log("editLatLongMutation success")
         refetch();
         setIsEditing((prev) => !prev)
         toast.success("Saved Changes in mapview");
      },
      onError: (err) => {
         console.log("addAddressMutation error", err);
      },
   })

   const handleEditLatLong = ()=>{
      if(addressId == undefined || currentLat == undefined || currentLng == undefined){
         toast.warning("adjust dragger to update mapview");
         return;
      }
      editLatLongMutation.mutate({addressId,currentLat,currentLng});
   }

   const handleCancel = ()=>{
      setCurrentLat(latitude);
      setCurrentLng(longitude);
      setMapKey(prevKey => prevKey + 1);
      setIsEditing((prev) => !prev)
   }

   const [addImgOpen, setAddImgOpen] = useState<boolean>(false);

   return (
      <Box
         sx={{
         padding: "30px",
         backgroundColor: "white",
         borderRadius: "10px",
         boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
         marginTop: "30px",
         display: "flex",
         gap: 2,
         }}
      >
         <Box sx={{ height: "auto", width: "40%", }} >
            <Typography>Images</Typography>
            <Box
               sx={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
               }}
               >
               {images && images.length > 0 ? (
                  <Box sx={{ height:'100%', width:'100%' }} >
                     <Box component='img' src={images[0]}
                        sx={{
                           height: "300px",
                           width: "100%",
                           objectFit: "cover",
                           borderRadius: "10px"
                        }}
                     />
                     <Box sx={{display:'flex', gap:1}}>
                        <Box component='img' src={images[1]}
                           sx={{
                              height: "200px",
                              width: "50%",
                              objectFit: "cover",
                              borderRadius: "10px"
                           }}
                        />
                        <Box component='img' src={images[2]}
                           sx={{
                              height: "200px",
                              width: "50%",
                              objectFit: "cover",
                              borderRadius: "10px"
                           }}
                        />
                     </Box>
                  </Box>
               ) : (
                  <Box 
                     sx={{
                        display:'flex', 
                        flexDirection:'column', 
                        gap:2,marginTop:'100px', 
                        justifyContent:'center', 
                        alignItems:'center'
                     }}>
                     <Typography color="gray">No images added</Typography>
                     <Button
                        size="large"
                        onClick={()=> setAddImgOpen(true)}
                        sx={{
                           textTransform:'none', 
                           backgroundColor:'#2DC98A', 
                           color:'white'
                        }}
                        >
                        Add Images
                     </Button>
                  </Box>
               )}
            </Box>
         </Box>
         <Box sx={{ height: "auto", width: "60%", display:'flex', flexDirection:'column', minHeight:'400px' }}>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
               <Typography>Mapview</Typography>
               {isEditing ? 
                  
                  <Box>
                     <Button 
                        size="small"
                        sx={{ textTransform:'none', backgroundColor:'#2DC98A', color:'white' }}
                        onClick={handleEditLatLong}>
                        {editLatLongMutation.isPending ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                           ) : (
                        "Save"
                        )}
                     </Button>
                     <Button
                        size="small"
                        sx={{
                           textTransform:'none',
                           backgroundColor:'#101921',
                           color:'white',
                           marginLeft:'10px'
                        }}
                        onClick={handleCancel}>
                        Cancel
                     </Button>
                  </Box>
                  :
                  <Button
                     size="small"
                     sx={{ textTransform:'none', backgroundColor:'#2DC98A', color:'white' }}
                     onClick={() => setIsEditing((prev) => !prev)}>
                     Edit
                  </Button>
               }
            </Box>
            {isValidNumber(latitude) && isValidNumber(longitude) ? (
               <MapComponent
                  key={mapKey}
                  latitude={latitude}
                  longitude={longitude}
                  onLocationChange={(lat, lng) => {
                     setCurrentLat(lat);
                     setCurrentLng(lng);
                  }}
                  isEditing={isEditing}
               />
            ) : (
               <Typography>No valid location data available</Typography>
            )}
         </Box>
         <AddImagesModal
            open={addImgOpen}
            onClose={()=> setAddImgOpen(false)}
            refetch={refetch}
            />
      </Box>
   );
};
export default MapAndImages;
