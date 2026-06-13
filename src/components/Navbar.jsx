import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="cursor-pointer">
            <h1 className="font-bold text-2xl tracking-tight">UMS</h1>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-8 items-center font-medium">
              <li>
                <Link to="/" className="hover:text-red-500 transition">Home</Link>
              </li>
              <li>
                <Link to="/add-user" className="hover:text-red-500 transition">Add User</Link>
              </li>
              <li>
              </li>
            </ul>
          </nav>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl focus:outline-none"
            >
              <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden pb-4 transition-all duration-300`}>
          <nav className="flex flex-col gap-4 font-semibold text-center bg-gray-50 p-6 rounded-xl">
            <Link to="/" className="hover:text-red-500 transition py-2 border-b border-gray-100">Home</Link>
            <Link to="/add-user" className="hover:text-red-500 transition py-2">Add User</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}