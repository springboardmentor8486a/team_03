import { X } from "lucide-react";
import logo from "../../assets/logo.png";
import Button from "./GradientButton";
import Signbtn from "./Signbtn";

const SideNavbar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <img src={logo} alt="Logo" className="w-16" />
          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 p-6 text-gray-600">
          <a href="#features" onClick={onClose}>Features</a>
          <a href="#howitworks" onClick={onClose}>How it Works</a>
          <a href="#impact" onClick={onClose}>Impact</a>
          <a href="#community" onClick={onClose}>Community</a>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 px-6 mt-6">
          <Signbtn />
          <Button name="Get Started" />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default SideNavbar;
