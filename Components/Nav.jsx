import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu'; // Adjust path as needed

export default function Nav() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'about', label: 'ABOUT', path: '/about' },
    { id: 'team', label: 'TEAM', path: '/team' },
    { id: 'events', label: 'EVENTS', path: '/events' },
    { id: 'contact', label: 'CONTACT', path: '/contact' },
  ];

  // Menu items for StaggeredMenu component
  const menuItems = navItems.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label.toLowerCase()} page`,
    link: item.path
  }));

  // Add social items if you have any
  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com/yourhandle' },
    { label: 'LinkedIn', link: 'https://linkedin.com/company/yourcompany' },
    { label: 'Twitter', link: 'https://twitter.com/yourhandle' }
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile/tablet */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Clickable to go home */}
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <img 
                src="/logo.png" 
                alt="IEEEPCS Logo" 
                className="w-40 h-auto" 
              />
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-12">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isHovered = hoveredItem === item.id;

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="relative flex items-center gap-3 group"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Circle indicator */}
                    <div
                      className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                        (isActive || isHovered)
                          ? 'border-black scale-100 opacity-100'
                          : 'border-gray-300 scale-0 opacity-0'
                      } ${
                        isActive 
                          ? 'bg-black'
                          : 'bg-transparent'
                      }`}
                    />

                    {/* Text */}
                    <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-black' : 'text-gray-800 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Arrow icon */}
                    <div
                      className={`transition-all duration-300 ${
                        isHovered
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-2 opacity-0'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Navigation with Hamburger Menu - Visible on smaller screens */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={['#f3f4f6', '#e5e7eb']}
          logoUrl="/logo.png"
          accentColor="#000000"
          isFixed={true}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </>
  );
}