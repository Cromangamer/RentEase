import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductById, clearSelectedProduct } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [months, setMonths] = useState(3);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct?.tenureOptions?.length) {
      setMonths(selectedProduct.tenureOptions[0]);
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="mt-4 text-slate-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
          <p className="mt-2 text-slate-500">{error}</p>
          <Link to="/products" className="inline-block mt-6 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedProduct) return null;

  const totalMonthly = selectedProduct.monthlyRent * quantity;
  const totalRent = selectedProduct.monthlyRent * months * quantity;
  const securityDeposit = selectedProduct.securityDeposit * quantity;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: selectedProduct._id,
        title: selectedProduct.title,
        image: selectedProduct.image,
        monthlyRent: selectedProduct.monthlyRent,
        securityDeposit: selectedProduct.securityDeposit,
        months,
        quantity,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="text-sm text-slate-500">
            <Link to="/products" className="text-emerald-600 hover:underline">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span>{selectedProduct.title}</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full rounded-[1.75rem] object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {selectedProduct.category}
                  </span>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                    {selectedProduct.available ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">● Available</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-red-600">● Unavailable</span>
                    )}
                    {selectedProduct.brand && <span>{selectedProduct.brand}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Monthly rent</p>
                  <p className="text-4xl font-bold text-slate-900">₹{selectedProduct.monthlyRent}</p>
                </div>
              </div>

              <h1 className="mt-8 text-4xl font-bold text-slate-900">{selectedProduct.title}</h1>

              <p className="mt-5 text-slate-600 leading-7">{selectedProduct.description}</p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Select Rental Tenure</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {selectedProduct.tenureOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setMonths(option)}
                      className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                        months === option
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400"
                      }`}
                    >
                      {option} Months
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900">Quantity</h2>
                <div className="mt-4 flex w-fit items-center rounded-3xl border border-slate-300 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="px-4 py-3 text-lg text-slate-700"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 text-sm font-semibold text-slate-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.min(selectedProduct.stock, value + 1))}
                    className="px-4 py-3 text-lg text-slate-700"
                  >
                    +
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate-500">{selectedProduct.stock} units available</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Monthly rent</span>
                  <span>₹{totalMonthly}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{months}-month rental</span>
                  <span>₹{totalRent}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Security deposit</span>
                  <span>₹{securityDeposit}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between text-base font-semibold">
                  <span>Total estimate</span>
                  <span>₹{totalRent + securityDeposit}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedProduct.available}
                className="mt-6 w-full rounded-3xl bg-emerald-600 px-5 py-4 text-base font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 transition"
              >
                {selectedProduct.available ? "Add to Cart" : "Currently Unavailable"}
              </button>

              <Link
                to="/products"
                className="mt-4 inline-flex w-full justify-center rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
