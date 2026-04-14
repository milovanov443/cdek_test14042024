import { useState, useEffect } from 'react';
import type { NewsResponse, NewsBlockVariant } from '../types/news';

const API_BASE = '/api/v1/news/feed/company';
const CACHE_KEY_PREFIX = 'cdek_news_cache_';

export const useNews = (variant: NewsBlockVariant, page: number, perPage: number = 3) => {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const endpoint = variant === 'empty' ? 'empty' : 'short';
    const url = `${API_BASE}/${endpoint}?perPage=${perPage}&page=${page}`;
    const cacheKey = `${CACHE_KEY_PREFIX}${variant}_${page}_${perPage}`;

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simple memory/storage caching (bonus requirement)
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          setData(parsed);
          setLoading(false);
          
          // Background update to keep data fresh, but with signal
          try {
            const response = await fetch(url, { signal: controller.signal });
            if (response.ok) {
              const result = await response.json();
              setData(result);
              localStorage.setItem(cacheKey, JSON.stringify(result));
            }
          } catch (e) {
            if (e instanceof Error && e.name === 'AbortError') return;
            // Background errors are ignored to keep stale data
          }
          return;
        }

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Не удалось загрузить новости');
        }

        const result = await response.json();
        setData(result);
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Что-то пошло не так');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      controller.abort();
    };
  }, [variant, page, perPage]);

  return { data, loading, error };
};
