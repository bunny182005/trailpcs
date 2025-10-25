import React from 'react';
import Shuffle from './Shuffle'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

const Placeit = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/events');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Shuffle
          text="PlaceIt"
          tag="h1"
          className="text-[20vw] font-bold mb-8"
          scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          shuffleTimes={2}
          duration={3}
          // Add this prop to disable the hover effect
          triggerOnHover={false}
        />

        <p className="text-xl mb-8">"Place-It" is a premier event that bridges the gap between students and leading figures in the EdTech industry. It's centered around insightful discussions and features a dynamic Ideathon, challenging participants to bring innovative educational ideas to life. This event provides a vital opportunity for attendees to learn from experts, connect with pioneers, and play an active role in shaping the future of education technology.</p>
        <button
          onClick={handleBack}
          className="px-8 py-3 bg-gray-800 text-white rounded-full text-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default Placeit;
