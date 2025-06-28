import { Box, MenuItem, TextField } from '@mui/material'
import React from 'react'

function OrderForm() {

  const currencies = [
    {
      value: 'MSFT',
      label: '$',
    },
    {
      value: 'APPLE',
      label: '€',
    },
    {
      value: 'ORACLE',
      label: '฿',
    }
  ];

  return (
    <div>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Select Symbol"
          defaultValue="MSFT"
          helperText="Please select your symbol"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Amount"
          defaultValue="1"
        />
      </Box>
    </div>
  )
}

export default OrderForm