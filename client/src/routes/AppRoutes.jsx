import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import Dashboard from "../pages/Dashboard";
import MyRentals from "../pages/MyRentals";
import Maintenance from "../pages/Maintenance";

import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminRentals from "../pages/AdminRentals";
import AdminMaintenance from "../pages/AdminMaintenance";

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/rentals"
            element={<MyRentals />}
          />

          <Route
            path="/maintenance"
            element={<Maintenance />}
          />

        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/rentals"
            element={<AdminRentals />}
          />

          <Route
            path="/admin/maintenance"
            element={<AdminMaintenance />}
          />

        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;