import React from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography, CircularProgress } from "@mui/material";
import { FormikProps } from "formik";

interface AddNewSlotModalProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<{ name: string; type: string }>;
  isPending: boolean
}

const AddNewSlotModal: React.FC<AddNewSlotModalProps> = ({ open, onClose, formik, isPending }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Slot
        </Typography>

        <Box component='form' onSubmit={formik.handleSubmit}>
          <TextField
            label="Slot Name"
            name="name"
            fullWidth
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            select
            label="Slot Type"
            name="type"
            fullWidth
            margin="normal"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          >
            <MenuItem value="FourWheeler">Four Wheeler</MenuItem>
            <MenuItem value="TwoWheeler">Two Wheeler</MenuItem>
          </TextField>

          <Button 
            sx={{
                textTransform:'none', 
                marginTop:'10px',
                backgroundColor:'#2DC98A',
                color:'white'
            }}
            type="submit"  fullWidth>
            {isPending ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewSlotModal;
