import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const categories = [
  { label: "All", value: "" },
  { label: "Furniture", value: "Furniture" },
  { label: "Appliances", value: "Appliances" },
];

function Products() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    dispatch(fetchProducts(params));
  }, [dispatch, category]);

  const handleCategoryChange = (value) => {
    if (value) setSearchParams({ category: value });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
              Filters
            </p>
            <div className="mt-6 space-y-3">
              {categories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleCategoryChange(item.value)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                    category === item.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          <section>
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-emerald-600 font-semibold uppercase tracking-[0.24em]">
                    Browse Products
                  </p>
                  <h1 className="mt-3 text-3xl font-bold text-slate-900">
                    Find furniture and appliances for rent.
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Discover flexible rental options with transparent pricing and fast delivery.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {products.length} products found
                </div>
              </div>
            </div>

            {loading ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-96 rounded-3xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="mt-8 rounded-3xl bg-red-50 p-8 text-red-700">
                {error}
              </div>
            ) : products.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl bg-white p-14 text-center border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">No products found</h2>
                <p className="mt-3 text-slate-500">Try selecting a different category or check back soon.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Products;
