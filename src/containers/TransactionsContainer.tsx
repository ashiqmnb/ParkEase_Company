import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/payment";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TransHead from "../components/transactions/TransHead";
import CustomPagination from "../components/CustomPagination";
import TransTable from "../components/transactions/TransTable";

const TransactionsContainer = () => {
   const [pageSize, setPageSize] = useState<number>(6);
   const [pageNumber, setPageNumber] = useState<number>(1);

   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setPageNumber(value);
   };

   const { data: trans, refetch } = useQuery({
      queryKey: ["transactions"],
      queryFn: () => getTransactions(pageNumber, pageSize),
   });

   useEffect(()=>{
      refetch()
   }, [pageNumber, pageSize])

   return (
      <Box sx={{ backgroundColor: "#E6F8F0", padding: "30px", height: "90vh" }}>
         <TransHead
            pageSize={pageSize}
            setPageSize={setPageSize}
         />

         <TransTable
            page={pageNumber}
            pageSize={pageSize}
            transactions={trans?.transactions}
         />

         <CustomPagination
            count={trans?.totalPages}
            handleChange={handlePageChange}
            page={pageNumber}
         />
      </Box>
   );
};

export default TransactionsContainer;
