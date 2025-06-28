// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import { Provider } from "react-redux";
import { store } from "./features/store";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import TransactionPage from "./pages/TransactionPage";
import PortfolioPage from "./pages/PortfolioPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/order-page"
            element={
              <PrivateRoute>
                <Layout>
                  <OrderPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction-page"
            element={
              <PrivateRoute>
                <Layout>
                  <TransactionPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio-page"
            element={
              <PrivateRoute>
                <Layout>
                  <PortfolioPage />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
