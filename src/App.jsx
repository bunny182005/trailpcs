import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IEEEPCSPreloader from '../Components/IEEEPCSPreloader'; 
import Nav from '../Components/Nav.jsx';
import Home from '../Pages/Homepage.jsx';
import Aboutus from '../Pages/Aboutus.jsx';
import Team from '../Pages/Team.jsx';
import Events from '../Pages/Events.jsx';
import Contact from '../Pages/Contact.jsx';
import Placeit from '../Components/placeit';
import SOTY from '../Components/SOTY';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <div className="min-w-screen min-h-screen relative">
        {isLoading ? (
          <IEEEPCSPreloader onComplete={handlePreloaderComplete} />
        ) : (
          <>
            {/* Navigation Bar (visible on all pages) */}
            <Nav />

            {/* Page container */}
            <div className="pt-24 min-h-screen animate-fadeIn bg-white">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/team" element={<Team />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/placeit" element={<Placeit />} />
                <Route path="/events/soty" element={<SOTY />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.8s ease-in-out;
          }

          .animate-fadeOut {
            animation: fadeOut 0.8s ease-in-out forwards;
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;