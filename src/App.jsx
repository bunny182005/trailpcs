import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IEEEPCSPreloader from '../Components/IEEEPCSPreloader';
import Nav from '../Components/Nav.jsx';

import Home from '../Pages/Homepage.jsx';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <div className="min-h-screen">
        {isLoading ? (
          <IEEEPCSPreloader onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <Nav />

            {/* Only real routes */}
            <Routes>
              <Route path="/" element={<Home />} />
             
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
