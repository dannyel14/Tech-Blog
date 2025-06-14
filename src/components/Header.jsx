import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="SoundTech Blog" />
          </Link>
        </div>

        <div className={styles.controls}>
          <h1>DE-TECHS BLOG</h1>
          
          <div
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.show : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {isAdmin ? (
            <>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
