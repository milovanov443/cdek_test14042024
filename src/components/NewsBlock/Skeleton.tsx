import React from 'react';
import styles from './Skeleton.module.css';

export const NewsSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.footer}>
          <div className={styles.date} />
          <div className={styles.stats} />
        </div>
      </div>
    </div>
  );
};
