import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyRentals } from "../redux/rentalSlice";
import StatusBadge from "../components/StatusBadge";

function MyRentals() {
  const dispatch = useDispatch();
  const { rentals, loading, error } = useSelector((state) => state.rentals);

  useEffect(() => {
    dispatch(fetchMyRentals());
  }, [dispatch]);

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-emerald-600 font-semibold uppercase tracking-[0.24em]">My Rentals</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Your active rentals</h1>
          <p className="mt-2 text-slate-600">Track and manage your rental orders.</p>
        </div>

        {error && (
          <div className="mt-8 rounded-3xl bg-red-50 p-6 text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="mt-8 text-center text-slate-500">Loading your rentals...</div>
        ) : rentals.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">📦</div>
            <h2 className="mt-6 text-xl font-semibold text-slate-900">No rentals yet</h2>
            <p className="mt-3 text-slate-500">Start exploring our furniture and appliances.</p>
            <Link
              to="/products"
              className="mt-8 inline-flex rounded-3xl bg-emerald-600 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {rentals.map((rental) => (
              <div key={rental._id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src={rental.product?.image}
                      alt={rental.product?.title}
                      className="h-40 w-full rounded-3xl object-cover lg:w-40"
                    />
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">{rental.product?.title}</h2>
                      <p className="mt-2 text-sm text-slate-500">Rental ID: {rental._id.slice(-8)}</p>
                      <div className="mt-4">
                        <StatusBadge status={rental.status} />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                      <p className="text-sm text-slate-500">Rental amount</p>
                      <p className="mt-2 font-semibold text-slate-900">₹{rental.totalRent}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Delivery address</p>
                  <p className="mt-2">{rental.deliveryAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRentals;
