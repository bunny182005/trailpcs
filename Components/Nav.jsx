import React, { useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';

export default function Nav() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [menuKey, setMenuKey] = useState(0);

 const scrollTo = (id) => {
  // MEMORY → CENTER ALIGN
  if (id === 'memories') {
    const el = document.querySelector('[data-memories-center]');
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const elementCenter = rect.top + scrollTop + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    window.scrollTo({
      top: elementCenter - viewportCenter,
      behavior: 'smooth',
    });

    return;
  }

  // CONTACT → FOOTER
  if (id === 'contact') {
    const footer = document.getElementById('contact-footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    return;
  }

  // DEFAULT
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};



  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'team', label: 'TEAM' },
    { id: 'events', label: 'EVENTS' },
    { id: 'memories', label: 'MEMORIES' },
    { id: 'contact', label: 'CONTACT' },
  ];

  /* ---------------------------------------------
     SCROLL SPY (auto-activate on scroll)
  --------------------------------------------- */
  useEffect(() => {
    const sections = navItems
      .map(item => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with highest intersection ratio
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-20% 0px -20% 0px', // Focus on middle of viewport
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const handleMobileNav = (e) => {
    const { id } = e.detail || {};
    if (!id) return;

    // Close staggered menu
    setMenuKey(prev => prev + 1);
    setActiveSection(id);

    // Wait for menu close animation
    setTimeout(() => {
      scrollTo(id);
    }, 400);
  };

  window.addEventListener('nav-item-click', handleMobileNav);

  return () => {
    window.removeEventListener('nav-item-click', handleMobileNav);
  };
}, []);


  /* ---------------------------------------------
     MOBILE MENU ITEM CLICK HANDLER
  --------------------------------------------- */
  useEffect(() => {
    const handleMenuItemClick = (e) => {
      const target = e.target.closest('.sm-panel-item');

      if (target) {
        const href = target.getAttribute('href');

        if (href && href.startsWith('#')) {
          e.preventDefault();
          e.stopPropagation();

          const id = href.substring(1);

          setActiveSection(id);
          setMenuKey(prev => prev + 1);

          setTimeout(() => {
            scrollTo(id);
          }, 400);
        }
      }
    };

    document.addEventListener('click', handleMenuItemClick, true);

    return () => {
      document.removeEventListener('click', handleMenuItemClick, true);
    };
  }, []);

  const menuItems = navItems.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label}`,
    link: `#${item.id}`,
  }));

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com/yourhandle' },
    { label: 'LinkedIn', link: 'https://linkedin.com/company/yourcompany' },
    { label: 'Twitter', link: 'https://twitter.com/yourhandle' },
  ];

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <div
              onClick={() => {
                setActiveSection('home');
                scrollTo('home');
              }}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img src="/logo.png" alt="logo" className="w-40 h-auto" />
            </div>

            {/* NAV ITEMS */}
            <div className="flex items-center gap-12">
              {navItems.map(item => {
                const isHovered = hoveredItem === item.id;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      scrollTo(item.id);
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative flex items-center gap-3 group"
                  >
                    {/* BLACK DOT - Only shows when active (not hovered) */}
                    <div
                      className={`w-3 h-3 rounded-full bg-black transition-all duration-300 ${
                        isActive && !isHovered
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0'
                      }`}
                    />

                    {/* WHITE DOT - Only shows on hover */}
                    <div
                      className={`w-3 h-3 rounded-full border-2 border-white bg-transparent transition-all duration-300 absolute left-0 ${
                        isHovered
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0'
                      }`}
                    />

                    {/* TEXT */}
                    <span
                      className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-black' : 'text-gray-800'
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* ARROW - Only shows on hover */}
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
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      <div className="lg:hidden">
        <StaggeredMenu
          key={menuKey}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen
          colors={['#f3f4f6', '#e5e7eb']}
          logoUrl="/logo.png"
          accentColor="#000"
          isFixed
          onLogoClick={() => {
            setActiveSection('home');
            setMenuKey(prev => prev + 1);
            setTimeout(() => scrollTo('home'), 400);
          }}
        />
      </div>
    </>
  );
}