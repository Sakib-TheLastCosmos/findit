import Link from "next/dist/client/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-primary text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          FindIt – Lost & Found Made Easy
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8 text-primary-light">
          Reconnect with your belongings or help others by returning theirs.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <Link href="./report" className="bg-accent hover:bg-hover text-white font-semibold px-6 py-3 rounded-lg transition">
            Report Lost Item
          </Link>
          <Link href="./browse" className="bg-white text-primary hover:bg-primary-light font-semibold px-6 py-3 rounded-lg transition">
            Browse Found Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
