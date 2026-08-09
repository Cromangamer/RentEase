import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdminMaintenance, updateMaintenanceStatus } from "../redux/adminSlice";
import AdminSidebar from "../components/AdminSidebar";
import StatusBadge from "../components/StatusBadge";

function AdminMaintenance() {
  const dispatch = useDispatch();
  const { maintenance, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminMaintenance());
  }, [dispatch]);

  const statuses = ["Pending", "In Progress", "Resolved"];

  const handleStatusChange = (id, status) => {
    dispatch(updateMaintenanceStatus({ id, status }));
  };

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <main className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-slate-900">Maintenance Requests</h1>
              <p className="mt-2 text-slate-600">Handle customer support and maintenance issues.</p>
            </div>
            {error && <div className="rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>}
            {loading && <div className="text-slate-500">Loading requests...</div>}
            {!loading && maintenance.length === 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm text-slate-500">No maintenance requests.</div>
            ) : (
              <div className="space-y-5">
                {maintenance.map((request) => (
                  <div key={request._id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{request.rental?.product?.title}</h2>
                        <p className="mt-2 text-sm text-slate-500">Customer: {request.user?.name}</p>
                        <p className="text-sm text-slate-500">{request.user?.email}</p>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">Reported Issue</p>
                      <p className="mt-2">{request.issue}</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="text-sm font-medium text-slate-700">Update Status:</label>
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request._id, e.target.value)}
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

export default AdminMaintenance;
