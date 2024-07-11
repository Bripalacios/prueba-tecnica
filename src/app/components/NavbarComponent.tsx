'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '../zustand/store';
import styles from '../styles/NavbarComponent.module.css';

export const NavbarComponent: React.FC = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const router = useRouter();
  const setSearchTerm = useStore((state) => state.setSearchTerm);

  const handleMenuClick = () => {
    setShowSubmenu(!showSubmenu);
  }

  const handleFavoriteClick = () => {
    router.push('/FavoritePage'); 
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className={styles.navbar}>
      <div onClick={handleMenuClick} className={styles.menuIcon}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.title}></div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Buscar..." className={styles.searchInput} onChange={handleSearchChange} />
        <div className={styles.searchIcon}>&#128269;</div>
      </div>
      {showSubmenu && (
        <div className={styles.submenu}>
          <div onClick={handleFavoriteClick} className={styles.submenuItem}>Favoritos</div>
        </div>
      )}
    </div>
  );
}