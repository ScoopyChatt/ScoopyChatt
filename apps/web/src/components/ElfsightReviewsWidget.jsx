import React, { useEffect } from &rsquo;react&rsquo;;

const ElfsightReviewsWidget = () => {
  useEffect(() => {
    const scriptId = &rsquo;elfsight-platform-script&rsquo;;
    
    const initWidget = () => {
      if (window.ELFSight) {
        try {
          window.ELFSight.reload();
        } catch (err) {
          console.error(&rsquo;Error reloading Elfsight widget:&rsquo;, err);
        }
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement(&rsquo;script&rsquo;);
      script.id = scriptId;
      script.src = &rsquo;https://elfsightcdn.com/platform.js&rsquo;;
      script.async = true;
      
      script.onload = () => {
        initWidget();
      };
      
      script.onerror = (err) => {
        console.error(&rsquo;Failed to load Elfsight reviews script:&rsquo;, err);
      };
      
      document.body.appendChild(script);
    } else {
      // Script already exists, just try to re-initialize
      initWidget();
    }
  }, []);

  return (
    <div 
      className=&rdquo;elfsight-app-8240dd2e-e144-493a-add7-52c8fd1b05f7&rdquo; 
      data-elfsight-app-lazy 
    ></div>
  );
};

export default ElfsightReviewsWidget;