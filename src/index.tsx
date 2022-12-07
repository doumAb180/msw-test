import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  ReactQueryDevtools,
} from '@tanstack/react-query-devtools';

import App from './App';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      networkMode: 'always',
      suspense: true,
    },
  }
});

(async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/worker');

    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>로딩 중....</div>}>
        <App />
      </React.Suspense>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
})();
