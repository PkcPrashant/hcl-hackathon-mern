import React from "react";
import OrderRecentTransactions from "../components/OrderRecentTransactions";
import OrderForm from "../components/OrderForm";

function OrderPage() {
  return (
    <div>
        Order Pagee
      <OrderForm />
      <OrderRecentTransactions />
    </div>
  );
}

export default OrderPage;
