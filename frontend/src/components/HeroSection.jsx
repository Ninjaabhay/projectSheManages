import React from "react";
import HeroImage from "../images/Hero Image.gif";
// import HeroImage from "../images/hero-background.gif";
import HeroWave from "../images/wave (10).svg";
// import WomenInTech1 from "../images/women_in_tech_1.jpg";
// import WomenInTech2 from "../images/women_in_tech_2.jpg";

const HeroSection = () => {
  return (
    <>
      <section id="hero-section" className="max-w-screen">
        {/* Hero Section */}
        <div className=" mx-auto ">
          <div className="flex sm:flex-row flex-col items-center justify-center py-12  w-full">
            <div className="hero-intro sm:w-1/2 w-full sm:h-full sm:p-6 h-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 ">
                Empowering women across communities to get started
                <span className="text-pink-600">.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                We see you, we hear you, and we empower you!
              </p>
              <a href="/">
                <button className="btn btn-lg bg-pink-600 text-white px-4 sm:text-base text-sm py-1 rounded-lg hover:bg-pink-700 transition duration-200">
                  Learn More
                </button>
              </a>
            </div>
            <div className="  w-full h-full z-10 flex items-center sm:justify-end justify-center">
              <img
                className=" w-[100%]  max-w-fit"
                src={HeroImage}
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
        <img
          className="hero-wave w-full"
          src={HeroWave}
          alt="hero-wave"
        />
      </section>

      {/* Additional Sections */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-12">
          <div className="text-section">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Bridging the Gender Gap in Entrepreneurship
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We strive to create a community where women can thrive in Entrepreneurship, offering mentorship, resources, and a supportive network
              to help them achieve their goals.
            </p>
            <a href="#learn-more-1">
              <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Learn More
              </button>
            </a>
          </div>
          <div className="image-section">
            <img
              className="max-w-full rounded-lg shadow-lg"
              src="https://img.freepik.com/premium-photo/international-global-networking-concept_700248-1103.jpg"
              alt="Women"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-12">
          <div className="image-section order-last md:order-first">
            <img
              className="max-w-full rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBpbiUyMHRlY2h8ZW58MHx8MHx8fDA="
              alt="Women Collaboration"
            />
          </div>
          <div className="text-section">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Building a Supportive Network
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our platform connects women with experienced mentors, industry
              leaders, and like-minded peers to foster collaboration and
              innovation.
            </p>
            <a href="#learn-more-2">
              <button className="btn bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Become a part of a growing community of women in Entrepreneurship. Sign up today
            to start your journey!
          </p>
          <a href="/signup">
            <button className="btn bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200">
              Sign Up
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
