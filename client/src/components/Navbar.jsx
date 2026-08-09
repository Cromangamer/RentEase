import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authSlice";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-semibold tracking-tight text-emerald-600"
          >
            RentEase
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition"
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                to="/rentals"
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition"
              >
                My Rentals
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/maintenance"
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition"
              >
                Maintenance
              </Link>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-2 text-[0.65rem] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition"
                >
                  Hi, {user?.name?.split(" ")[0]}
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle mobile menu"
          >
            <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-5">
            <div className="mt-4 space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <Link
                to="/"
                onClick={closeMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={closeMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
              >
                Products
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/rentals"
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
                  >
                    My Rentals
                  </Link>
                  <Link
                    to="/maintenance"
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
                  >
                    Maintenance
                  </Link>
                </>
              )}
              <Link
                to="/cart"
                onClick={closeMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
              >
                Cart {cartCount > 0 ? `(${cartCount})` : ""}
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="block rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
