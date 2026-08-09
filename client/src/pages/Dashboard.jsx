import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-emerald-600 px-8 py-10 text-white shadow-2xl shadow-emerald-600/10 sm:px-12 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Welcome back</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{user?.name}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-100">
            Manage your rentals, requests, and account from one place.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "My Rentals",
              description: "View your active rentals and order history.",
              to: "/rentals",
              emoji: "📦",
            },
            {
              title: "Maintenance",
              description: "Report issues and track support requests.",
              to: "/maintenance",
              emoji: "🛠️",
            },
            {
              title: "Browse Products",
              description: "Discover furniture and appliances for rent.",
              to: "/products",
              emoji: "🛋️",
            },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">{item.emoji}</div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Account information</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-2 font-medium text-slate-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 font-medium text-slate-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Account type</p>
              <p className="mt-2 font-medium text-slate-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
