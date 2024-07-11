import React from 'react';
import styles from '../styles/NavbarComponent.module.css';

export const NavbarComponent: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.menuIcon}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.title}></div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Buscar..." className={styles.searchInput} />
        <div className={styles.searchIcon}>&#128269;</div>
      </div>
    </div>
  );
}