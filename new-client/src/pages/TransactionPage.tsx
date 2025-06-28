import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TextField,
    MenuItem,
  } from "@mui/material";
  import React, { useState } from "react";
  
  function TransactionPage() {
    const mockOrders = Array.from({ length: 23 }, (_, i) => ({
      id: `${i + 1}`,
      fundName: `Fund ${i + 1}`,
      transactionType: i % 2 === 0 ? "Purchase" : "Redeem",
      quantity: (i + 1) * 5,
      orderValue: (i + 1) * 100,
      status: ["Submitted", "Completed", "Failed", "Cancelled"][i % 4],
      time: new Date(Date.now() - i * 3600 * 1000).toLocaleString(),
    }));
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const [searchFundName, setSearchFundName] = useState("");
    const [filterTransactionType, setFilterTransactionType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
  
    const handleChangePage = (_: any, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    };
  
    const filteredOrders = mockOrders.filter((order) => {
      return (
        order.fundName.toLowerCase().includes(searchFundName.toLowerCase()) &&
        (filterTransactionType ? order.transactionType === filterTransactionType : true) &&
        (filterStatus ? order.status === filterStatus : true)
      );
    });
  
    const paginatedRows = filteredOrders.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  
    return (
      <div className="p-3">
        <span className="text-[18px] font-bold !mt-2 !mb-2">
          Transaction Page
        </span>
  
        {/* Filters */}
        <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
          <TextField
            label="Search Fund Name"
            variant="outlined"
            size="medium"
            value={searchFundName}
            onChange={(e) => setSearchFundName(e.target.value)}
          />
          <TextField
            select
            label="Transaction Type"
            variant="outlined"
            size="medium"
            value={filterTransactionType}
            onChange={(e) => setFilterTransactionType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Purchase">Purchase</MenuItem>
            <MenuItem value="Redeem">Redeem</MenuItem>
          </TextField>
          <TextField
            select
            label="Status"
            variant="outlined"
            size="medium"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Submitted">Submitted</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </div>
  
        <TableContainer component={Paper} className="shadow-md rounded-lg">
          <Table>
            <TableHead className="bg-gray-100">
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
              {paginatedRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={filteredOrders.length}
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
  