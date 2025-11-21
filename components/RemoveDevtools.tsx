'use client';

import { useEffect } from 'react';

export default function RemoveDevtools() {
  useEffect(() => {
    const removeDevtools = () => {
      // Remove by ID
      const byId = document.getElementById('devtools-indicator');
      if (byId) byId.remove();

      // Remove by class
      const byClass = document.querySelectorAll('.devtools-indicator, [class*="devtools-indicator"]');
      byClass.forEach(el => el.remove());

      // Remove Next.js dev indicator
      const nextDev = document.querySelector('[data-nextjs-toast], [id*="__next"], [class*="__next-dev-overlay"]');
      if (nextDev) nextDev.remove();

      // Remove any element with devtools in id or class
      const allElements = document.querySelectorAll('[id*="devtools"], [class*="devtools"]');
      allElements.forEach(el => {
        if (el.id?.includes('devtools') || el.className?.toString().includes('devtools')) {
          el.remove();
        }
      });
    };

    // Run immediately
    removeDevtools();

    // Run after a short delay
    setTimeout(removeDevtools, 100);
    setTimeout(removeDevtools, 500);
    setTimeout(removeDevtools, 1000);

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      removeDevtools();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}


