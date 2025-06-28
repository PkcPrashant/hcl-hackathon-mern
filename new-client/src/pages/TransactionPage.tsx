import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react";

function TransactionPage() {
  const mockOrders = Array.from({ length: 23 }, (_, i) => ({
    id:`${i+1}`,
    fundName: `Fund ${i + 1}`,
    transactionType: i % 2 === 0 ? "Purchase" : "Redeem",
    quantity: (i + 1) * 5,
    orderValue: (i + 1) * 100,
    status: ["Submitted", "Completed", "Failed", "Cancelled"][i % 4],
    time: new Date(Date.now() - i * 3600 * 1000).toLocaleString(),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: { target: { value: string } }) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginatedRows = mockOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="p-3">
      <span className="text-[18px] font-bold !mt-2 !mb-2">
        Transaction Page
      </span>
      <TableContainer component={Paper} className="shadow-md rounded-lg mt-2">
        <Table>
          <TableHead className="bg-gray-100 ">
            <TableRow>
              <TableCell>Order Ref No.</TableCell>
              <TableCell>Security Name</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Order Value</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.fundName}</TableCell>
                <TableCell>{order.transactionType}</TableCell>
                <TableCell>{order.orderValue}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.time}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={mockOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default TransactionPage;
