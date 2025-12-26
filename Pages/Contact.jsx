import React, { useRef } from "react";
import Footer from "../Components/Footer.jsx";
import ScrollToTopButton from "../Components/ScrollToTopButton.jsx";

const Contact = () => {
  const footerRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* MAIN CONTENT - CENTERED IN VIEWPORT */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-20">
        
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-32">
          
          {/* FORM */}
          <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl border border-gray-200">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
              Contact Us
            </h1>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Enter your message..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* IMAGE */}
          <div className="hidden lg:flex items-center">
            <img
              src="/trail.png"
              alt="Contact Illustration"
              className="w-64 h-64 xl:w-96 xl:h-96 object-contain"
            />
          </div>
        </div>
      </div>

      {/* FOOTER - AT BOTTOM */}
      <div ref={footerRef} className="mt-auto" id="contact-footer">
        <Footer />
      </div>

      {/* RETURN TO TOP */}
      <ScrollToTopButton footerRef={footerRef} />
    </div>
  );
};

export default Contact;