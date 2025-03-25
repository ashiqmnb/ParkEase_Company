import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, Avatar, IconButton, CircularProgress } from "@mui/material";
import { ImageData } from "../../types/profileTypes";
import { Upload, Close, Image } from '@mui/icons-material';
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addImages } from "../../api/profile";

interface AddImageModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AddImagesModal: React.FC<AddImageModalProps> = ({ open, onClose, refetch }) => {

   const [images, setImages] = useState<ImageData[]>([]);
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(images.length === 3){
         toast.warning("Maximun image limit reached");
         return;
      }

      if (event.target.files) {
        const uploadedFiles: ImageData[] = Array.from(event.target.files).map(
          (file) => ({
            file,
            preview: URL.createObjectURL(file),
          })
        );
  
        setImages((prevImages) => [...prevImages, ...uploadedFiles]);
      }
    };
  

   const handleRemoveImage = (index: number) => {
      setImages((prevImages) => {
         const updatedImages = [...prevImages];
         URL.revokeObjectURL(updatedImages[index].preview);
         updatedImages.splice(index, 1);
         return updatedImages;
      });
   };

   const addImageMutation = useMutation({
      mutationFn:addImages,
      onSuccess:()=>{
         toast.success("Images added successfully");
         onClose();
         refetch()
      },
      onError:(err)=>{
         console.log("addImageMutation err", err)
      }
   });


   const handleSubmit = ()=>{

      const formData = new FormData();

      images.forEach((image) => {
         formData.append("images", image.file);
      });

      addImageMutation.mutate(formData);
   }

   useEffect(() => {
      if (images.length > 0) {
         setSelectedImage(images[0].preview);
      } else {
         setSelectedImage(null);
      }
   }, [images]);


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
            <Typography variant="h6" mb={2}>
               Upload Image
            </Typography>

            <Box sx={{ width:"100%" ,height: 'auto' }}>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     p: 3,
                     border: "1px dashed #ccc",
                     borderRadius: 1,
                     mt: 2,
                     backgroundColor: "#F4ECFF",
                  }}
               >
                  <Upload fontSize="large" />
                  <input
                     type="file"
                     multiple
                     onChange={handleImageUpload}
                     style={{ display: "none" }}
                     id="upload-input"
                  />
                  <label htmlFor="upload-input">
                  <Button
                     size="small"
                     variant="contained"
                     sx={{
                        backgroundColor: "#2DC98A",
                        fontFamily: "Libre Baskerville",
                        textTransform:'none'
                     }}
                     component="span"
                     >  
                     Add Image
                  </Button>
                  </label>
               </Box>

               <Box
                  sx={{
                     mt: 2,
                     display: "flex",
                     flexDirection: "column",
                     justifyItems: "flex-start",
                     flexWrap: "nowrap",
                     gap: 2,
                     height: 'auto',
                     overflow: "auto",
                     "&::-webkit-scrollbar": { display: "none" },
                  }}
                  >
                  {images.map((image, index) => (
                  <Box
                     key={index}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        bgcolor: "#f5f5f5",
                        borderRadius: 1,
                        cursor: "pointer",
                     }}
                     onClick={() => setSelectedImage(image.preview)}
                  >
                     <Avatar
                        src={image.preview}
                        variant="square"
                        sx={{ width: 40, height: 40 }}
                     >
                        <Image />
                     </Avatar>
                     <Typography sx={{ flexGrow: 1 }}>{image.file.name}</Typography>
                     <IconButton onClick={() => handleRemoveImage(index)}>
                        <Close />
                     </IconButton>
                  </Box>
                  ))}
               </Box>
               <Box 
                  sx={{
                     backgroundColor: "#D9D9D9", width: "100%", borderRadius: '5px',marginY:'10px',
                     display: { xs: "none", sm: 'flex' }, justifyContent: "center", alignItems: "center",
                     height: "auto", overflow: "hidden", 
                  }}>
                  {selectedImage ? (
                     <img src={selectedImage} alt="Selected" style={{
                        width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px"
                     }} />
                  ) : (
                     <Typography sx={{padding:'10px', color:'gray'}}>Add images to see preview</Typography>
                  )}
               </Box>

               <Box sx={{display:'flex', justifyContent:'space-between', marginY:'10px'}}>
                  <Button
                     onClick={handleSubmit}
                     sx={{
                        backgroundColor: "#2DC98A",
                        fontFamily: "Libre Baskerville",
                        textTransform:'none',
                        color:'black',
                        paddingX:'20px'
                     }}
                     >
                     {addImageMutation.isPending ? (
                       <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                       "Submit"
                     )}
                  </Button>
                  <Button
                     sx={{
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        fontFamily: "Libre Baskerville",
                        textTransform:'none',
                        color: 'white',
                        paddingX:'20px'
                     }}
                     onClick={onClose} >
                     Cancel
                  </Button>
               </Box>

            </Box>
         </Box>
      </Modal>
   );
};

export default AddImagesModal;
