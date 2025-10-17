import { useState } from "react";
import logo from "../../assets/logo.png";
import Button from "./GradientButton";
import Signbtn from "./Signbtn";
import { Menu } from "lucide-react";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b-2 border-gray-300 bg-white/80 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" style={{ width: "80px", height: "auto" }} />
        </div>

        {/* Desktop Menu */}
        <div className=" flex text-gray-600 hover:*:text-gray-900 gap-3 transition-colors">
          <a href="#features">Features</a>
          <a href="#howitworks">How it Works</a>
          <a href="#impact">Impact</a>
          <a href="#community">Community</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Signbtn  />
          <Button name="Get Started" />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Side Navbar (mobile) */}
      <SideNavbar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
