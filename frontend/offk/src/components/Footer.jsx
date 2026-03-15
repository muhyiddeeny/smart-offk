//frontend/offk/src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">SmartOffK</h3>
          <p className="text-sm">
            Your trusted off-campus housing solution. Verified landlords,
            secure payments, and stress-free bookings.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/houses" className="hover:text-blue-400">Browse Houses</Link></li>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">Email: smartoffk@gmail.com</p>
          <p className="text-sm">Phone: +234 815 765 0420</p>
          <p className="text-sm">Bauchi, Nigeria</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DigiSmart. For your convinient digital solutions
      </div>
    </footer>
  );
}

