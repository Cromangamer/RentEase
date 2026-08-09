import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-24 space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Admin panel
          </p>
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            RentEase Admin
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Manage inventory, rentals, and maintenance requests.
          </p>
        </div>

        <nav className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/admin/rentals" className={linkClass}>
            Rentals
          </NavLink>
          <NavLink to="/admin/maintenance" className={linkClass}>
            Maintenance
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;
