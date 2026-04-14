import React from 'react';
import { motion } from 'framer-motion';
import { IconThumbUp, IconEye } from '@tabler/icons-react';
import type { NewsItem, NewsBlockVariant } from '../../types/news';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  item: NewsItem;
  variant: NewsBlockVariant;
  index: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, variant, index }) => {
  const isBusiness = variant === 'business';
  const isFirst = index === 0;
  const showImage = !isBusiness || (isBusiness && isFirst);
  
  let imageUrl = '';
  if (item.cover?.images?.length) {
    const img = item.cover.images[0];
    imageUrl = isBusiness && isFirst
      ? img.hd || img.l || img.m 
      : img.m || img.s || img.l;
    
    if (imageUrl && imageUrl.startsWith('/')) {
      // Относительные пути проксируем через тот же origin,
      // чтобы не ловить mixed-content на проде.
      imageUrl = imageUrl;
    }
  }

  const isTop = item.rubrics.some(r => r.slug === 'top');

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + 'K';
    }
    return count.toString();
  };

  if (isBusiness) {
    return (
      <motion.div
        className={clsx(styles.businessCard, isFirst && styles.hero)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {isFirst && imageUrl && (
          <div className={styles.heroImageContainer}>
            <img 
              src={imageUrl} 
              alt={item.title} 
              className={styles.heroImage} 
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.businessContent}>
          {isFirst && isTop && (
            <span className={styles.topBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.75l3.09 6.26L22 8.98l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.85l-5-4.87 6.91-.97L12 1.75z" />
              </svg>
              Топ новость
            </span>
          )}
          <h3 className={clsx(styles.newsTitle, styles.businessTitle)}>{item.title}</h3>
          <div className={styles.businessMeta}>
            <div className={styles.hashtags}>
              {item.rubrics.map(r => <span key={r.id}>#{r.slug}</span>)}
            </div>
            <span className={styles.dot}>·</span>
            <span className={styles.date}>{format(new Date(item.publishedAt), 'd MMMM yyyy', { locale: ru })}</span>
            <span className={styles.dot}>·</span>
            <div className={styles.metric}>
              <IconThumbUp size={15} stroke={1.5} /> {formatCount(item.likeCount)}
            </div>
            <span className={styles.dot}>·</span>
            <div className={styles.metric}>
              <IconEye size={15} stroke={1.5} /> {formatCount(item.viewCount)}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default layout (Company variant)
  return (
    <motion.div
      className={styles.newsItem}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className={clsx(styles.imageContainer, !showImage && styles.hiddenImage)}>
        {showImage && imageUrl && (
          <img 
            src={imageUrl} 
            alt={item.title} 
            className={styles.thumbnail}
            loading="lazy"
          />
        )}
      </div>
      
      <div className={styles.info}>
        <div className={styles.topRow}>
          <span className={styles.publishedDate}>
            {format(new Date(item.publishedAt), 'd MMMM HH:mm', { locale: ru })}
          </span>
        </div>
        
        <h3 className={styles.newsTitle}>{item.title}</h3>
        
        <div className={styles.labelsRow}>
          <div className={styles.tags}>
            {item.rubrics.map(rubric => (
              <span key={rubric.id} className={styles.tag}>
                {rubric.name}
              </span>
            ))}
          </div>
          
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <IconThumbUp size={18} stroke={1.5} />
              <span>{item.likeCount}</span>
            </div>
            <div className={styles.metric}>
              <IconEye size={18} stroke={1.5} />
              <span>{item.viewCount}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
