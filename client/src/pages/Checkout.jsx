import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createRental } from "../redux/rentalSlice";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.rentals);

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [formError, setFormError] = useState("");

  const subtotal = items.reduce((total, item) => total + item.monthlyRent * item.months * item.quantity, 0);
  const securityDeposit = items.reduce((total, item) => total + item.securityDeposit * item.quantity, 0);
  const grandTotal = subtotal + securityDeposit;

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-50">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Login required</h1>
          <p className="mt-3 text-slate-500">Please login before checkout.</p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-50">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!deliveryDate || !deliveryAddress.trim()) {
      setFormError("Please provide delivery date and address.");
      return;
    }

    try {
      for (const item of items) {
        await dispatch(
          createRental({
            productId: item.productId,
            months: item.months,
            quantity: item.quantity,
            deliveryDate,
            deliveryAddress,
          })
        ).unwrap();
      }
      dispatch(clearCart());
      navigate("/rentals");
    } catch (error) {
      setFormError(error || "Checkout failed.");
    }
  };

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-emerald-600 font-semibold uppercase tracking-[0.24em]">Checkout</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Confirm Your Rental</h1>
          <p className="mt-2 text-slate-600">Schedule delivery and submit your rental request.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">Delivery Information</h2>
            <div className="mt-6 grid gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your complete delivery address"
                  rows={5}
                  required
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-emerald-50 p-5 text-sm text-emerald-700">
              <p>💡 Your rental request will be sent for approval. Payment integration is not included in this MVP.</p>
            </div>

            {(formError || error) && (
              <div className="mt-5 rounded-3xl bg-red-50 p-4 text-sm text-red-600">{formError || error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-3xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 transition"
            >
              {loading ? "Creating Rental..." : "Confirm Rental"}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
              <div className="mt-6 space-y-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="h-16 w-16 rounded-3xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.months} months × {item.quantity}</p>
                      <p className="mt-1 font-semibold text-slate-900">₹{item.monthlyRent * item.months * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Rental total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security deposit</span>
                  <span>₹{securityDeposit}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between font-semibold text-slate-900">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
