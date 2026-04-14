import React from 'react';
import styles from './EmptyState.module.css';

export const EmptyState: React.FC = () => {
  return (
    <div className={styles.emptyState}>
      <img 
        src="/empty-state.png" 
        alt="Новых новостей нет" 
        className={styles.illustration} 
      />
      <h3 className={styles.title}>Новых новостей нет</h3>
    </div>
  );
};
