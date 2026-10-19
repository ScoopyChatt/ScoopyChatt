import React, { useEffect } from 'react';
import { loadElfsight } from '@/utils/thirdParty.js';

const ElfsightReviewsWidget = () => {
  useEffect(() => loadElfsight({
    onLoad: () => {
      if (window.ELFSight) {
        try {
          window.ELFSight.reload();
        } catch (err) {
          console.error('Error reloading Elfsight widget:', err);
        }
      }
    },
    onError: (err) => console.error('Failed to load Elfsight reviews script:', err),
  }), []);

  return (
    <div 
      className="elfsight-app-8240dd2e-e144-493a-add7-52c8fd1b05f7" 
      data-elfsight-app-lazy 
    ></div>
  );
};

export default ElfsightReviewsWidget;