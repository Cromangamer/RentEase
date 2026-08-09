import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createMaintenanceRequest, fetchMyMaintenance } from "../redux/maintenanceSlice";
import { fetchMyRentals } from "../redux/rentalSlice";
import StatusBadge from "../components/StatusBadge";

function Maintenance() {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.maintenance);
  const { rentals } = useSelector((state) => state.rentals);

  const [rentalId, setRentalId] = useState("");
  const [issue, setIssue] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchMyRentals());
    dispatch(fetchMyMaintenance());
  }, [dispatch]);

  const activeRentals = rentals.filter((rental) => rental.status === "Approved" || rental.status === "Active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!rentalId || !issue.trim()) return;

    try {
      await dispatch(createMaintenanceRequest({ rentalId, issue })).unwrap();
      setRentalId("");
      setIssue("");
      setSuccess("Maintenance request submitted successfully.");
    } catch {
      // error stored in Redux
    }
  };

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-emerald-600 font-semibold uppercase tracking-[0.24em]">Maintenance</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Report a problem</h1>
          <p className="mt-2 text-slate-600">Submit a maintenance request for your active rentals.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Report a Problem</h2>
            {activeRentals.length === 0 ? (
              <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-600">
                You don't have any approved or active rentals eligible for maintenance.
              </div>
            ) : (
              <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Rental</label>
                  <select
                    value={rentalId}
                    onChange={(e) => setRentalId(e.target.value)}
                    required
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select a rental</option>
                    {activeRentals.map((rental) => (
                      <option key={rental._id} value={rental._id}>
                        {rental.product?.title} — {rental.months} months
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Describe the issue</label>
                  <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    rows={5}
                    required
                    placeholder="Describe what went wrong..."
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
                {error && <div className="rounded-3xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}
                {success && <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">{success}</div>}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">My Requests</h2>
              {loading && requests.length === 0 ? (
                <p className="mt-6 text-slate-500">Loading requests...</p>
              ) : requests.length === 0 ? (
                <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-500">No maintenance requests yet.</div>
              ) : (
                <div className="mt-6 space-y-4">
                  {requests.map((request) => (
                    <div key={request._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{request.rental?.product?.title || "Rental Product"}</h3>
                          <p className="mt-1 text-sm text-slate-500">Submitted {new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>
                        <StatusBadge status={request.status} />
                      </div>
                      <div className="mt-4 rounded-3xl bg-white p-4 text-sm text-slate-700">
                        {request.issue}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
