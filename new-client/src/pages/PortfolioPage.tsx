import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const portfolioData = [
  { id: 1, name: "HDFC Equity", type: "Equity", quantity: 50, value: 50000 },
  { id: 2, name: "SBI Debt Fund", type: "Debt", quantity: 100, value: 30000 },
  { id: 3, name: "ICICI Balanced", type: "Hybrid", quantity: 80, value: 40000 },
  { id: 4, name: "Axis Bluechip", type: "Equity", quantity: 40, value: 20000 },
  { id: 5, name: "Kotak Liquid", type: "Liquid", quantity: 150, value: 25000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const chartData = Object.values(
  portfolioData.reduce((acc: any, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = { name: curr.type, value: 0 };
    }
    acc[curr.type].value += curr.value;
    return acc;
  }, {})
);

function PortfolioPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Portfolio</h2>

      <div className="mb-6 w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Security Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Value (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.value.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PortfolioPage;
