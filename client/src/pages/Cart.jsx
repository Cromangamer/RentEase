import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart, updateCartQuantity, updateCartTenure } from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce((total, item) => total + item.monthlyRent * item.months * item.quantity, 0);
  const securityDeposit = items.reduce((total, item) => total + item.securityDeposit * item.quantity, 0);
  const grandTotal = subtotal + securityDeposit;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="text-6xl">🛒</div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Your cart is waiting</h1>
          <p className="mt-3 text-slate-500">Explore furniture and appliances for your space.</p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-3xl bg-emerald-600 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-emerald-600 font-semibold uppercase tracking-[0.24em]">Your Cart</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-2 text-slate-600">Review your selected rentals before checkout.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item.productId} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <img src={item.image} alt={item.title} className="h-36 w-full rounded-3xl object-cover sm:w-40" />
                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                        <p className="mt-2 text-sm text-slate-500">₹{item.monthlyRent} / month</p>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500">Rental tenure</label>
                        <select
                          value={item.months}
                          onChange={(e) =>
                            dispatch(
                              updateCartTenure({
                                productId: item.productId,
                                months: Number(e.target.value),
                              })
                            )
                          }
                          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value={3}>3 Months</option>
                          <option value={6}>6 Months</option>
                          <option value={12}>12 Months</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500">Quantity</label>
                        <div className="mt-2 flex items-center rounded-2xl border border-slate-300 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartQuantity({
                                  productId: item.productId,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              )
                            }
                            className="px-4 py-3 text-slate-700"
                          >
                            −
                          </button>
                          <span className="px-5 text-sm font-semibold text-slate-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartQuantity({
                                  productId: item.productId,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="px-4 py-3 text-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
                      <span>Rental total</span>
                      <span className="font-semibold text-slate-900">
                        ₹{item.monthlyRent * item.months * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Rental total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security deposit</span>
                  <span>₹{securityDeposit}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full rounded-3xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white hover:bg-emerald-700 transition"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="mt-4 block text-center text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Cart;
