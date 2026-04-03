import { useState, useEffect, useMemo } from "react";
import { fetchReviews } from "../lib/api/reviews";
import { mapReviewToUI, type ReviewUIModel } from "../lib/api/mappers";
import {
  formatReviewsListError,
  shouldTreatPublicListAsEmpty,
} from "../lib/api/reviewsLoad";

export type ReviewStats = {
  count: number;
  avg: number;
  serviceCount: number;
  /** 0-100 from average rating, or null if no reviews */
  satisfactionPct: number | null;
};

export function usePublicReviews() {
  const [reviews, setReviews] = useState<ReviewUIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        const raw = await fetchReviews();
        if (!cancelled) setReviews(raw.map(mapReviewToUI));
      } catch (e) {
        if (!cancelled) {
          setReviews([]);
          if (shouldTreatPublicListAsEmpty(e)) {
            setError(null);
          } else {
            setError(formatReviewsListError(e));
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo<ReviewStats>(() => {
    const n = reviews.length;
    if (n === 0) {
      return {
        count: 0,
        avg: 0,
        serviceCount: 0,
        satisfactionPct: null,
      };
    }
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / n;
    const serviceCount = new Set(reviews.map((r) => r.service)).size;
    const satisfactionPct = Math.round((avg / 5) * 100);
    return { count: n, avg, serviceCount, satisfactionPct };
  }, [reviews]);

  return { reviews, loading, error, stats };
}
