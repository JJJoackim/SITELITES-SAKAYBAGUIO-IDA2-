import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-xl p-4 border-b transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-blue-200/70 via-white/50 to-blue-200/70 shadow-xl border-white/30"
            : "bg-gradient-to-r from-white/60 via-white/40 to-white/60 shadow-lg border-white/20"
        }`}
      >
        <div className="grid grid-cols-3 items-center">
          {/* Left */}
          <h1 className="text-sm md:text-xl font-bold">Sakay Baguio</h1>

          {/* Center */}
          <h2 className="text-center text-base md:text-xl font-semibold tracking-widest">
            BAGUIO CITY
          </h2>

          {/* Right */}
          <div className="flex justify-end gap-2 md:gap-4 text-sm md:text-base">
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">Trips</a>
            <a href="#" className="hover:text-blue-500">Settings</a>
            <a href="#" className="hover:text-blue-500">Support</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Ride Smarter Through Baguio</h2>
        <p className="mb-6">View Jeepney Trips Easily</p>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-full shadow hover:bg-gray-200">
          View Trips
        </button>
      </section>

      {/* Center Banner */}
      <section className="flex justify-center items-center py-12">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-700 tracking-widest">
          BAGUIO CITY
        </h2>
      </section>

      {/* Routes Section */}
      <section className="p-8">
        <h3 className="text-2xl font-semibold mb-4">Available Routes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Trancoville",
            "Aurora Hill",
            "Ambiong",
            "Irisan",
            "Mines View",
          ].map((route) => (
            <div key={route} className="bg-white p-4 rounded-xl shadow hover:shadow-lg">
              <h4 className="font-semibold">{route}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Trip Card */}
      <section className="p-8">
        <h3 className="text-2xl font-semibold mb-4">Featured Trip</h3>
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-xl font-bold mb-2">Ambiong - Aurora Hill</h4>
          <p>Route: Melvin Jones Grandstand - Lower Brookside</p>
          <p>Fare: Regular ₱20 | Student ₱15 | Senior ₱15</p>
          <p>Capacity: 24 passengers</p>
          <p>First Trip: 6:00 AM | Last Trip: 9:00 PM</p>
        </div>
      </section>

      {/* Settings Preview */}
      <section className="p-8 bg-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Settings</h3>
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Theme: Default</p>
          <p>Language: English</p>
        </div>
      </section>

      {/* Support Section */}
      <section className="p-8">
        <h3 className="text-2xl font-semibold mb-4">Report an Issue</h3>
        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Your Name" />
          <input className="w-full border p-2 rounded" placeholder="Type of Error" />
          <textarea className="w-full border p-2 rounded" placeholder="Describe the issue"></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit Report
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 bg-white shadow-inner">
        <p>© 2026 Sakay Baguio</p>
      </footer>
    </div>
  );
}
