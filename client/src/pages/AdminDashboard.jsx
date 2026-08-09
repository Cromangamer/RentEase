import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/productSlice";
import { fetchAdminRentals, fetchAdminMaintenance } from "../redux/adminSlice";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { rentals, maintenance } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAdminRentals());
    dispatch(fetchAdminMaintenance());
  }, [dispatch]);

  const pendingRentals = rentals.filter((rental) => rental.status === "Pending").length;
  const activeRentals = rentals.filter((rental) => rental.status === "Approved" || rental.status === "Active").length;
  const pendingMaintenance = maintenance.filter((request) => request.status !== "Resolved").length;

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <main className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-emerald-600 font-semibold uppercase tracking-[0.24em]">Admin Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Manage RentEase</h1>
              <p className="mt-2 text-slate-600">A high-level overview of inventory, rentals, and maintenance requests.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Total Products</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{products.length}</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Pending Rentals</p>
                <p className="mt-4 text-3xl font-semibold text-yellow-600">{pendingRentals}</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Active Rentals</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-600">{activeRentals}</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Open Maintenance</p>
                <p className="mt-4 text-3xl font-semibold text-red-600">{pendingMaintenance}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Link to="/admin/products" className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="text-3xl">🛋️</div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">Manage Products</h2>
                <p className="mt-3 text-sm text-slate-500">Add, edit and remove furniture and appliances.</p>
              </Link>
              <Link to="/admin/rentals" className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="text-3xl">📦</div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">Manage Rentals</h2>
                <p className="mt-3 text-sm text-slate-500">Approve rentals and manage rental status.</p>
              </Link>
              <Link to="/admin/maintenance" className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="text-3xl">🛠️</div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">Maintenance</h2>
                <p className="mt-3 text-sm text-slate-500">Handle customer maintenance requests.</p>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
