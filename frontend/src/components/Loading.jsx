import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-24 h-24 bg-indigo-100 rounded-full opacity-20 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-slate-100 rounded-full opacity-25 animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main Loader */}
      <div className="flex flex-col items-center relative z-10">
        <div
          className="loader"
          style={{
            width: "60px",
            padding: "5px", // patla kar diya
            aspectRatio: "1",
            borderRadius: "50%",
            background: "#2563eb", // Tailwind ka blue-600
            WebkitMask: `conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box`,
            mask: `conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box`,
            WebkitMaskComposite: "source-out",
            maskComposite: "subtract",
            animation: "spinLoader 1s infinite linear",
          }}
        ></div>

        {/* Loading text */}
        <div className="text-center mt-6">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Loading<span className="text-blue-500">...</span>
          </p>
          <p className="text-sm text-gray-600 animate-pulse">
            Please wait a moment
          </p>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style>{`
        @keyframes spinLoader {
          to { transform: rotate(1turn) }
        }
      `}</style>
    </div>
  );
};

export default Loading;
