import React from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default React.memo(SearchBar);
