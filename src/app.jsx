import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from 'src/theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Router from 'src/routes/sections';
import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import loadWidget from './utils/chatBox';

export default function App() {
  const queryClient = new QueryClient();
  useScrollToTop();

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const trackingId = 'G-5FBWJX4Q9P';

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const rfParam = queryParams.get('rf');
    if (rfParam) {
      localStorage.setItem('rf', rfParam);
    }
    
    const entry_url = queryParams.get('entry_url');
    const tag = queryParams.get('tag');
    const utm_medium = queryParams.get('utm_medium');
    const utm_term = queryParams.get('utm_term');
    const utm_campaign = queryParams.get('utm_campaign');
    const utm_content = queryParams.get('utm_content');
    const utm_source = queryParams.get('utm_source');
    
    if (entry_url) localStorage.setItem('entry_url', entry_url);
    if (tag) localStorage.setItem('tag', tag);
    if (utm_medium) localStorage.setItem('utm_medium', utm_medium);
    if (utm_term) localStorage.setItem('utm_term', utm_term);
    if (utm_campaign) localStorage.setItem('utm_campaign', utm_campaign);
    if (utm_content) localStorage.setItem('utm_content', utm_content);
    if (utm_source) localStorage.setItem('utm_source', utm_source);
  }, []);

  useEffect(() => {
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(...args);
    }
    gtag('js', new Date());
    gtag('config', trackingId, {
      page_path: window.location.pathname,
    });
  }, [trackingId]);

  useEffect(() => {
    loadWidget();
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
