import React from "react";
import Resource from "../images/resources-hero.png";

function Resources() {
  return (
    <div className="p-12 bg-white">
      <section id="" className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                Community is made by all of us
                <span className="text-pink-500">.</span>
              </h1>
              <p className="text-lg mb-4 text-gray-600">
                And the best way to give back to the community is by sharing.
              </p>
              <a href="#scholarships">
                <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition duration-200">
                  Take me to resources ⚡️
                </button>
              </a>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img
                className="max-w-full h-auto"
                src={Resource}
                alt="resources-hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="scholarships" className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Scholarships
          </h1>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://research.adobe.com/scholarship/"
                className="text-blue-500 hover:text-blue-700 transition duration-200"
              >
                ADOBE RESEARCH WOMEN-IN-TECHNOLOGY SCHOLARSHIP ↗️
              </a>
            </li>
            {/* Add more scholarships here */}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Resources;
