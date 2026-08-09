import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-slate-50">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                Flexible monthly rentals
              </span>

              <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Furnish your space.
                <span className="text-emerald-600"> Live freely.</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Rent quality furniture and appliances without the high upfront cost. Pick a product, choose a rental plan, and enjoy a home that feels ready.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Browse Products
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  How It Works
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl shadow-slate-200/50">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                alt="Modern rental living room"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Categories
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Find furniture and appliances for your space.
              </h2>
            </div>
            <div className="text-slate-600">
              Rent from trusted products with clear monthly pricing and flexible delivery.
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Link
              to="/products?category=Furniture"
              className="group relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-white transition hover:-translate-y-1 hover:bg-slate-800"
            >
              <div className="text-4xl">🛋️</div>
              <h3 className="mt-6 text-2xl font-semibold">Furniture</h3>
              <p className="mt-2 text-sm text-slate-300">Beds, sofas, tables and chairs for every room.</p>
            </Link>
            <Link
              to="/products?category=Appliances"
              className="group relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-white transition hover:-translate-y-1 hover:bg-slate-800"
            >
              <div className="text-4xl">⚡</div>
              <h3 className="mt-6 text-2xl font-semibold">Appliances</h3>
              <p className="mt-2 text-sm text-slate-300">Refrigerators, washers, TVs and air conditioners.</p>
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-emerald-600 font-semibold uppercase tracking-[0.3em]">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              Simple rental steps for modern living.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: "1",
                title: "Choose a product",
                description: "Browse curated furniture and appliances for your home.",
              },
              {
                icon: "2",
                title: "Select your plan",
                description: "Choose the rental duration that fits your move.",
              },
              {
                icon: "3",
                title: "Schedule delivery",
                description: "Pick a delivery date that works for your schedule.",
              },
              {
                icon: "4",
                title: "Enjoy your rental",
                description: "Settle in with flexible support and easy returns.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-50 text-xl font-semibold text-emerald-700">
                  {item.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-emerald-600 px-8 py-14 text-white shadow-2xl shadow-emerald-600/10 sm:px-12 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  Trusted by renters
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  Everything you need for a flexible rental experience.
                </h2>
                <p className="mt-4 text-sm leading-7 text-emerald-100">
                  RentEase makes furniture and appliance rentals transparent, reliable, and easy to manage on your terms.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Affordable", value: "Low upfront cost" },
                  { label: "Flexible", value: "Choose your months" },
                  { label: "Easy Relocation", value: "Move with confidence" },
                  { label: "Maintenance", value: "Support when you need it" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-white/10 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm text-emerald-100">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Featured rentals
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Discover top-rated products.
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              View all products
            </Link>
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-96 rounded-3xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-3xl bg-red-50 p-8 text-red-700">{error}</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center sm:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Ready to get started?
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              Ready to furnish your space?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Explore furniture and appliances designed for students, professionals, and anyone moving to a new city.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
