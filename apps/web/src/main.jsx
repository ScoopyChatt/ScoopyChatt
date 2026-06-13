
import React from &rsquo;react&rsquo;;
import ReactDOM from &rsquo;react-dom/client&rsquo;;
import { HelmetProvider } from &rsquo;react-helmet-async&rsquo;;
import App from &rsquo;@/App&rsquo;;
import &rsquo;@/index.css&rsquo;;

ReactDOM.createRoot(document.getElementById(&rsquo;root&rsquo;)).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
