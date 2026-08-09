import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition duration-300 hover:shadow-lg">
      <Link to={`/products/${product._id}`}>
        <div className="h-64 overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            {product.category}
          </span>
          {product.available ? (
            <span className="text-xs font-semibold text-emerald-600">
              Available
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-500">
              Unavailable
            </span>
          )}
        </div>

        <Link to={`/products/${product._id}`}>
          <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition">
            {product.title}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-slate-500">
          {product.brand}
        </p>

        <div className="mt-4 text-sm text-slate-500">
          Security deposit ₹{product.securityDeposit}
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-slate-900">
              ₹{product.monthlyRent}
            </span>
            <span className="text-sm text-slate-500">/ month</span>
          </div>

          <Link
            to={`/products/${product._id}`}
            className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
