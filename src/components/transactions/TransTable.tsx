import {
   Box,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from "@mui/material";
import { Transaction } from "../../types/paymentTypes";

interface TransTableProps {
   transactions: Transaction[];
   pageSize: number;
   page: number;
}

const tableHeadStyle = {
   fontFamily: "Inter",
   fontWeight: "600",
   height: "50px",
   padding: "5px",
   lineHeight: "1",
};

const tableContentStyle = {
   fontFamily: "Inter",
   height: "40px",
   padding: "5px",
   ineHeight: "1",
   cursor: "pointer",
};

const TransTable: React.FC<TransTableProps> = ({
   transactions,
   pageSize,
   page,
}) => {
   const starting = pageSize * (page - 1) + 1;

   return (
      <Box sx={{marginY:'20px'}}>
         {transactions?.length > 0 ? (
         <Box>
            <TableContainer component={Paper}>
               <Table>
               <TableHead>
                  <TableRow sx={{ height: "40px", backgroundColor: "#2DC98A" }}>
                     <TableCell sx={{ ...tableHeadStyle, paddingLeft: "20px" }}>
                     Sl No
                     </TableCell>
                     <TableCell sx={tableHeadStyle}>Transaction Id</TableCell>
                     <TableCell sx={tableHeadStyle}>Sender Id</TableCell>
                     <TableCell sx={tableHeadStyle}>Coin</TableCell>
                     <TableCell sx={tableHeadStyle}>Description</TableCell>
                     <TableCell sx={tableHeadStyle}>Date</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {transactions?.map((trans, index) => (
                     <TableRow
                        key={index}
                        sx={{  height: "40px", backgroundColor: index % 2 === 0 ? "white" : "#E6F8F0",}}
                     >
                        <TableCell sx={{ ...tableContentStyle, paddingLeft: "20px" }} > {index + starting} </TableCell>
                        <TableCell sx={tableContentStyle}> {trans.transactionId} </TableCell>
                        <TableCell sx={tableContentStyle}> {trans.senderId} </TableCell>
                        <TableCell sx={tableContentStyle}>{trans.coin}</TableCell>
                        <TableCell sx={tableContentStyle}> {trans.description} </TableCell>
                        <TableCell sx={{...tableContentStyle, paddingRight:'20px'}}>
                           {new Date(trans.date).toLocaleDateString("en-GB")}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
               </Table>
            </TableContainer>
         </Box>
         ) : (
         <Typography sx={{ fontWeight: "600", color: "gray" }}>
            No Transaction history
         </Typography>
         )}
      </Box>
   );
};

export default TransTable;
