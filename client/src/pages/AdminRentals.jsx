import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdminRentals, updateRentalStatus } from "../redux/adminSlice";
import AdminSidebar from "../components/AdminSidebar";
import StatusBadge from "../components/StatusBadge";

function AdminRentals() {
  const dispatch = useDispatch();
  const { rentals, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminRentals());
  }, [dispatch]);

  const statuses = ["Pending", "Approved", "Active", "Completed", "Cancelled"];

  const handleStatusChange = (id, status) => {
    dispatch(updateRentalStatus({ id, status }));
  };

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <main className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-slate-900">Rental Management</h1>
              <p className="mt-2 text-slate-600">Review and manage customer rental requests.</p>
            </div>
            {error && <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>}
            {loading && <div className="text-slate-500">Loading rentals...</div>}
            {!loading && rentals.length === 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm text-slate-500">No rentals found.</div>
            ) : (
              <div className="space-y-5">
                {rentals.map((rental) => (
                  <div key={rental._id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-5">
                        <img src={rental.product?.image} alt={rental.product?.title} className="h-36 w-full rounded-3xl object-cover lg:w-36" />
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900">{rental.product?.title}</h2>
                          <p className="mt-2 text-sm text-slate-500">Customer: {rental.user?.name}</p>
                          <p className="text-sm text-slate-500">{rental.user?.email}</p>
                        </div>
                      </div>
                      <StatusBadge status={rental.status} />
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-sm text-slate-500">Tenure</p>
                        <p className="mt-2 font-medium text-slate-900">{rental.months} months</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Quantity</p>
                        <p className="mt-2 font-medium text-slate-900">{rental.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Delivery</p>
                        <p className="mt-2 font-medium text-slate-900">{new Date(rental.deliveryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Rental total</p>
                        <p className="mt-2 font-semibold text-slate-900">₹{rental.totalRent}</p>
                      </div>
                    </div>
                    <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">Delivery address</p>
                      <p className="mt-2">{rental.deliveryAddress}</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="text-sm font-medium text-slate-700">Update Status:</label>
                      <select
                        value={rental.status}
                        onChange={(e) => handleStatusChange(rental._id, e.target.value)}
                        className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminRentals;
