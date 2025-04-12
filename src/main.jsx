import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collections from "./pages/Collection";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import NotFound from "./pages/NotFound";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store"; // Import the store and persistor

import "./index.css";

const queryClient = new QueryClient({});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/collections" element={<Collections />} />
              </Route>

              <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/** Admin Layout */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/** 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        {/* </PersistGate>
      </Provider> */}
    </QueryClientProvider>
  </StrictMode>
);
