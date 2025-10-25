import React from 'react';
import Footer from '../Components/Footer.jsx';
// import Nav from '../Components/Nav.jsx';

const Contact = () => {
  return (
    <div className="fixed inset-0 bg-white overflow-auto">
      {/* Navigation would go here */}
      {/* <Nav /> */}

      {/* Main Content Area - Now scrollable on mobile */}
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16 pt-20 sm:pt-24 pb-32 sm:pb-40">
        
        {/* Container for Form and Image */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-32">
          
          {/* Form Container */}
          <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 z-10 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 sm:mb-8 md:mb-10">
              Contact Us
            </h1>

            <form className="space-y-4 sm:space-y-6">
              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your name..."
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                />
              </div>

              {/* Email Address Input */}
              <div>
                <label htmlFor="emailAddress" className="block text-gray-700 text-sm font-medium mb-2">
                  Email address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  placeholder="Enter your email..."
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message..."
                  rows="5"
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 text-black placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-2.5 sm:py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-50 transition-all duration-300 text-base sm:text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          
          {/* Image - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:flex items-center justify-center order-1 lg:order-2">
            <img 
              src="/trail.png" 
              alt="Contact Illustration" 
              className="w-64 h-64 xl:w-96 xl:h-96 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer - Positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;