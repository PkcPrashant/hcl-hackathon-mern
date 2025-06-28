// src/components/OrderRecentTransactions.jsx

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

// Mock static orders
const mockOrders = Array.from({ length: 23 }, (_, i) => ({
  fundName: `Fund ${i + 1}`,
  transactionType: i % 2 === 0 ? "Purchase" : "Redeem",
  quantity: (i + 1) * 5,
  orderValue: (i + 1) * 100,
  status: ["Submitted", "Completed", "Failed", "Cancelled"][
    i % 4
  ],
  time: new Date(
    Date.now() - i * 3600 * 1000
  ).toLocaleString(),
}));

function OrderRecentTransactions() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginatedRows = mockOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6">
      <TableContainer
        component={Paper}
        className="shadow-md rounded-lg"
      >
        <Table>
          <TableHead className="bg-gray-100 " >
            <TableRow>
              <TableCell>Fund Name</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell>{order.fundName}</TableCell>
                <TableCell>{order.transactionType}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.orderValue}</TableCell>
                <TableCell>{order.status}</TableCell>
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

export default OrderRecentTransactions;
