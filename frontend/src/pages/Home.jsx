import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { FaTrash, FaRoad, FaTint, FaLightbulb } from 'react-icons/fa';
import HomeHero from '../components/HomeHero';
import HomeSections from '../components/HomeSections';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // const navigate = useNavigate();

  const testimonials = [
  {
    name: "Rohit Mehra",
    role: "Community Volunteer",
    content: "Reporting potholes and garbage spots has never been this easy. This app empowers me to make my neighborhood safer!",
    avatar: "RM",
    rating: 5
  },
  {
    name: "Sunita Verma",
    role: "Local Resident",
    content: "I reported a broken streetlight near my house and it got fixed within a week. The city really listens now!",
    avatar: "SV",
    rating: 5
  },
  {
    name: "Dr. Anjali Patel",
    role: "City Planner",
    content: "This platform helps us monitor civic issues in real-time. It improves efficiency and keeps citizens engaged.",
    avatar: "AP",
    rating: 5
  },
  {
    name: "Rahul Kumar",
    role: "Environmental Activist",
    content: "I love how easy it is to report garbage dumps and water leaks. It encourages the community to take responsibility for cleaner streets.",
    avatar: "RK",
    rating: 5
  }
];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleGetStarted = () => navigate('/login');
  const handleRegisterInstitute = () => navigate('/register-institute');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                Thinking Name...
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">Reviews</a>
              <button
                onClick={handleGetStarted}
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 bg-white border-t">
              <div className="space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-green-600">Features</a>
                <a href="#about" className="block text-gray-600 hover:text-green-600">About</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-green-600">Reviews</a>
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <HomeHero onGetStarted={handleGetStarted} onRegisterInstitute={handleRegisterInstitute} />

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What You Can Report / Track</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaTrash className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Garbage Dumps</h3>
            <p className="text-gray-600 mt-2">Report overflowing bins and unhygienic spots.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaRoad className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Potholes</h3>
            <p className="text-gray-600 mt-2">Help make roads safer by reporting potholes.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaTint className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Water Leakage</h3>
            <p className="text-gray-600 mt-2">Highlight leaks or broken pipes to save water.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
            <FaLightbulb className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Streetlights</h3>
            <p className="text-gray-600 mt-2">Report faulty streetlights for safer nights.</p>
          </div>
        </div>
      </section>

      {/* Testimonials & Other Sections */}
      <HomeSections
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
        onGetStarted={handleGetStarted}
        onRegisterInstitute={handleRegisterInstitute}
      />
    </div>
  );
};

export default Home;







// import { FaTrash, FaRoad, FaTint, FaLightbulb } from "react-icons/fa";

// export default function Home() {
//   return (
//     <div className="w-full min-h-screen bg-gray-50 text-gray-900">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-b from-green-50 to-white py-20 text-center px-6">
//         <h1 className="text-5xl font-extrabold">
//           Cleaner Streets, <span className="text-green-600">Brighter Future</span>
//         </h1>
//         <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
//           Report garbage, potholes, water leaks, and broken streetlights in seconds.  
//           Empower your community to build a cleaner, safer, and smarter city 🚀
//         </p>
//         <div className="mt-8 flex flex-wrap justify-center gap-4">
//           <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition">
//             Report an Issue
//           </button>
//           <button className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-full hover:bg-green-50 transition">
//             Join the Movement
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           What You Can Report
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
//             <FaTrash className="text-4xl text-green-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold">Garbage Dumps</h3>
//             <p className="text-gray-600 mt-2">
//               Report overflowing bins and unhygienic garbage spots.
//             </p>
//           </div>

//           <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
//             <FaRoad className="text-4xl text-green-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold">Potholes</h3>
//             <p className="text-gray-600 mt-2">
//               Help make roads safer by reporting potholes in your area.
//             </p>
//           </div>

//           <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
//             <FaTint className="text-4xl text-green-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold">Water Leakage</h3>
//             <p className="text-gray-600 mt-2">
//               Stop water wastage by highlighting leaks and broken pipes.
//             </p>
//           </div>

//           <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition text-center">
//             <FaLightbulb className="text-4xl text-green-600 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold">Streetlights</h3>
//             <p className="text-gray-600 mt-2">
//               Report faulty or broken streetlights for safer nights.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
