// src/components/Loader.jsx
import React, { useState, useEffect } from "react";
export default function Loader({ message = "Loading, please wait..." }) {
  // Default messages array
  const defaultMessages = [
    message, // First value replaced with the received prop
    "Fetching your data...",
    "Almost there...",
    "Just a moment...",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % defaultMessages.length
      );
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, [defaultMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-700">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-pink-500 border-pink-200 rounded-full animate-spin mb-4"></div>

      {/* Animated bouncing dots */}
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-300"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-450"></div>
      </div>

      {/* Dynamic Message */}
      <span className="text-lg font-medium" style={{ color: "#fa7516" }}>
        {defaultMessages[currentMessageIndex]}
      </span>
    </div>
  );
}
