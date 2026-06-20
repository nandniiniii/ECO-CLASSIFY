import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Classify" },
  { to: "/impact", label: "Impact" },
  { to: "/learn", label: "Learn" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 sticky top-0 bg-background/90 backdrop-blur z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo size={36} />
        <div className="flex gap-6 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-accent" : "text-white/60 hover:text-white"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}