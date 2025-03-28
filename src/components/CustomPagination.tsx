import React from "react";
import { Pagination, Stack, Box } from "@mui/material";

interface CustomPaginationProps {
  count: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ count, page, handleChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center"}}>
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          shape="circular"
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "bold",
              fontSize: "16px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              color: "#101921",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#2DC98A",
                color: "white",
              },
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#2DC98A",
              color: "white",
            },
            "& .MuiPaginationItem-previous, & .MuiPaginationItem-next": {
              backgroundColor: "#8C8C8C",
              color: "black",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              "&:hover": {
                backgroundColor: "#6E6E6E",
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CustomPagination;
