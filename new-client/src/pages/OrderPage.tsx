import React from "react";
import OrderRecentTransactions from "../components/OrderRecentTransactions";
import OrderForm from "../components/OrderForm";
import NavBar from "../components/NavBar";

function OrderPage() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-grow">
        <OrderForm />
        <OrderRecentTransactions />
      </div>
    </div>
  );
}

export default OrderPage;