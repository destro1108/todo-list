import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-14 px-4 py-2 flex flex-row items-center bg-gray-700 text-gray-200">
      <p className="w-full px-4 flex flex-row font-semibold">
        <span>Made with</span>&nbsp;&nbsp;
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </span>
        &nbsp;&nbsp;by&nbsp;&nbsp;
        <a href="">D3STR0</a>
      </p>
      <p className="px-8 text-xl font-semibold">
        <a href="">GitHub</a>
      </p>
    </footer>
  );
};

export default Footer;
