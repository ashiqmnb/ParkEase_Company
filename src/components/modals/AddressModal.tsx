import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddressFormValues } from "../../types/profile";
import { useMutation } from "@tanstack/react-query";
import { AddAddress } from "../../api/profile";

interface AddressModalProps {
   open: boolean;
   onClose: () => void;
   refetch: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({open, onClose, refetch}) => {

   const formik = useFormik<AddressFormValues>({
      initialValues: {
         place: "",
         district: "",
         state: "",
         postalCode: "",
      },
      validationSchema: Yup.object({
         place: Yup.string().required("Place is required"),
         district: Yup.string().required("District is required"),
         state: Yup.string().required("State is required"),
         postalCode: Yup.string()
            .matches(/^\d{6}$/, "Postal code must be 6 digits")
            .required("Postal code is required"),
      }),
      onSubmit: (values) => {
         addAddressMutation.mutate(values);
      },
   });

  const addAddressMutation = useMutation({
      mutationFn: AddAddress,
      onSuccess: () => {
         refetch();
         onClose();
      },
      onError: (err) => {
         console.log("addAddressMutation error", err);
      },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Address</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Place"
            fullWidth
            margin="dense"
            {...formik.getFieldProps("place")}
            error={formik.touched.place && Boolean(formik.errors.place)}
            helperText={formik.touched.place && formik.errors.place}
          />
          <TextField
            label="District"
            fullWidth
            margin="dense"
            {...formik.getFieldProps("district")}
            error={formik.touched.district && Boolean(formik.errors.district)}
            helperText={formik.touched.district && formik.errors.district}
          />
          <TextField
            label="State"
            fullWidth
            margin="dense"
            {...formik.getFieldProps("state")}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
          <TextField
            label="Postal Code"
            fullWidth
            margin="dense"
            {...formik.getFieldProps("postalCode")}
            error={
              formik.touched.postalCode && Boolean(formik.errors.postalCode)
            }
            helperText={formik.touched.postalCode && formik.errors.postalCode}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button sx={{textTransform:'none', backgroundColor:'#2DC98A', color:'white', paddingX:'20px'}} onClick={onClose} >
          Cancel
        </Button>
        <Button onClick={formik.submitForm} sx={{textTransform:'none', backgroundColor:'#101921', color:'white', paddingX:'20px'}}>
          {addAddressMutation.isPending ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Sign In"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
