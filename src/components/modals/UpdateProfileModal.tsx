import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../api/profile";
import { toast } from "sonner";

interface UpdateProfileModalProps {
   open: boolean;
   onClose: () => void;
   name: string;
   phone: string | null;
   description: string | null;
   preview: string | null;
   handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
   image: File | null;
   refetch: () => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
   open,
   onClose,
   preview,
   handleImageUpload,
   phone,
   description,
   name,
   image,
   refetch,
}) => {
   const updateProfilMutation = useMutation({
      mutationFn: updateProfile,
      onSuccess: () => {
         toast.success("Profile updated successfully");
         refetch();
         onClose();
      },
      onError: (err) => {
         console.log("updateUserMutation error", err);
      },
   });

   const validationSchema = Yup.object({
      name: Yup.string()
         .min(3, "Name must be at least 3 characters")
         .max(25, "Name cannot exceed 25 characters")
         .required("Name is required"),

      phone: Yup.string()
         .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
         .required("Phone is required"),

      description: Yup.string()
         .min(10, "Description must be at least 10 characters")
         .max(500, "Description cannot exceed 500 characters")
         .required("Description is required"),
   });

   const formik = useFormik({
      initialValues: {
         name: name,
         phone: phone,
         description: description,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
         const formData = new FormData();
         formData.append("Name", values.name);
         formData.append("Description", values.description || "");
         formData.append("Phone", values.phone || "");
         if (image) {
         formData.append("Profile", image);
         }

         updateProfilMutation.mutate(formData);
      },
   });

   useEffect(() => {
      if (open) {
         formik.setValues({
         name: name || "",
         phone: phone || "",
         description: description || "",
         });
      }
   }, [open, name, phone, description]);

   return (
      <Modal open={open} onClose={onClose}>
         <Box
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: "auto",
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 4,
               borderRadius: 2,
            }}
            >
            <Box display="flex" justifyContent="space-between" alignItems="center">
               <Typography variant="h6">Update Profile</Typography>
               <IconButton onClick={onClose}>
                  <Close />
               </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
               <Box>
                  <Box
                  sx={{
                     border: "1px solid black",
                     borderRadius: "10px",
                     textAlign: "center",
                     padding: 2,
                  }}
                  >
                  {preview ? (
                     <img
                        src={preview}
                        alt="Preview"
                        style={{
                        objectFit: "cover",
                        width: 200,
                        height: 200,
                        borderRadius: "10px",
                        }}
                     />
                  ) : (
                     <Typography>Image Preview</Typography>
                  )}
                  </Box>

                  <FormControl fullWidth sx={{ mt: 2 }}>
                  <FormLabel sx={{ color: "#101921", fontWeight: "bold", mb: 1 }}>
                     Upload Profile Picture
                  </FormLabel>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleImageUpload}
                  />
                  </FormControl>
               </Box>

               <Box
                  component="form"
                  onSubmit={formik.handleSubmit}
                  sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  }}
                  >
                  <TextField
                     sx={{ color: "#7940CF", width: "300px" }}
                     label="Name"
                     name="name"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                     required
                  />
                  <TextField
                  sx={{ color: "#7940CF", width: "300px" }}
                     label="Phone"
                     name="phone"
                     type="number"
                     value={formik.values.phone}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={formik.touched.phone && Boolean(formik.errors.phone)}
                     helperText={formik.touched.phone && formik.errors.phone}
                     required
                  />
                  <TextField
                     sx={{ color: "#7940CF", width: "300px" }}
                     label="Description"
                     name="description"
                     value={formik.values.description}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={
                        formik.touched.description && Boolean(formik.errors.description)
                     }
                     helperText={
                        formik.touched.description && formik.errors.description
                     }
                     required
                     multiline
                     rows={4}
                  />
                  <Button
                     type="submit"
                     sx={{
                        width: "300px",
                        background: "#101921",
                        color: "white",
                        textTransform: "none",
                     }}
                  >
                  {updateProfilMutation.isPending ? (
                     <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                     "Submit"
                  )}
                  </Button>
               </Box>
            </Box>
         </Box>
      </Modal>
   );
};

export default UpdateProfileModal;
