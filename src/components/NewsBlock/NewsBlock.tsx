import React, { useState } from 'react';
import { useNews } from '../../hooks/useNews';
import type { NewsBlockVariant } from '../../types/news';
import { NewsCard } from './NewsCard';
import { Pagination } from './Pagination';
import { NewsSkeleton } from './Skeleton';
import { EmptyState } from './EmptyState';
import styles from './NewsBlock.module.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsBlockProps {
  variant: NewsBlockVariant;
  title: string;
  perPage?: number;
}

export const NewsBlock: React.FC<NewsBlockProps> = ({ 
  variant, 
  title, 
  perPage = 3,
}) => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useNews(variant, page, perPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const displayDate = data?.minDatePublication 
    ? format(
        new Date(data.minDatePublication),
        variant === 'empty' ? 'EEEE, d MMMM' : 'LLLL, yyyy',
        { locale: ru }
      )
    : '';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.blockTitle}>{title}</h2>
          {displayDate && (
            <span className={styles.subtitle}>
              {displayDate.charAt(0).toUpperCase() + displayDate.slice(1)}
            </span>
          )}
        </div>
      </div>
      <div className={styles.divider} />

      <div className={styles.content}>
        {error ? (
          <div className={styles.error}>
            <p>Ошибка: {error}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: perPage }).map((_, i) => (
                    <NewsSkeleton key={i} />
                  ))}
                </motion.div>
              ) : data?.news.length ? (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {data.news.map((item, index) => (
                    <NewsCard 
                      key={item.id} 
                      item={item} 
                      variant={variant}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {!loading && !error && data && data.totalPages > 1 && (
        <div className={styles.footer}>
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            isLoading={loading}
          />
        </div>
      )}
    </div>
  );
};
