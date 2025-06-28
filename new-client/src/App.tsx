// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import { Provider } from "react-redux";
import { store } from "./features/store";
import Layout from "./components/Layout";


function App() {
  return (
    <Provider store={store}>
     
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/order-page"
            element={
                <Layout>
                  <OrderPage />
                </Layout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
