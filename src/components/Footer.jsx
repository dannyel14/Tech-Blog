import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} My Blog</p>
    </footer>
  );
};

export default Footer;
