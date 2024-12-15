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

  const trackingId = "G-5FBWJX4Q9P";

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
    gtag("js", new Date());
    gtag("config", trackingId, {
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
