import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const links = [
    { label: 'Home',         href: '#home' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'About',        href: '#about' },
    { label: 'FAQs',         href: '#faqs' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (isLanding) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      /* Navigate to landing page then scroll */
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">

        {/* Logo → always goes to landing page */}
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <div className="navbar__logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M8 12H16M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="navbar__logo-text">
            Psoriasis<span className="navbar__logo-accent">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="navbar__auth">
          <Link to="/login"    className="navbar__login"    id="navbar-login-btn">Login</Link>
          <Link to="/register" className="navbar__register" id="navbar-register-btn">Register</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <div className="navbar__mobile-auth">
          <Link to="/login"    className="navbar__login"    onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="navbar__register" onClick={() => setMenuOpen(false)}>Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
