'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

// Generate or get session ID
const getSessionId = () => {
  if (typeof window === 'undefined') return null;
  let sessionId = sessionStorage.getItem('sara-session-id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    sessionStorage.setItem('sara-session-id', sessionId);
  }
  return sessionId;
};

export const useVisitorTracking = () => {
  const pathname = usePathname();
  const lastPath = useRef(null);

  useEffect(() => {
    // Only track if path changed (avoid duplicate tracking)
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    // Don't track admin pages
    if (pathname?.startsWith('/admin')) return;

    const trackVisit = async () => {
      try {
        await axios.post(`${API}/track`, {
          page_url: pathname,
          referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
          session_id: getSessionId()
        });
      } catch (error) {
        // Silent fail - don't break the app if tracking fails
        console.debug('Tracking failed:', error);
      }
    };

    // Small delay to ensure page has loaded
    const timeoutId = setTimeout(trackVisit, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
};

export default useVisitorTracking;
