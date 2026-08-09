import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              RentEase
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Flexible furniture and appliance rentals for modern city living.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Explore
            </h3>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <Link to="/products" className="block hover:text-white transition">
                Browse Products
              </Link>
              <Link to="/rentals" className="block hover:text-white transition">
                My Rentals
              </Link>
              <Link to="/maintenance" className="block hover:text-white transition">
                Maintenance
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Support
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Need help? Reach out to us for rental support, delivery planning, and maintenance assistance.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} RentEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
