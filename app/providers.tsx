'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 오래 유지되는 데이터 보다 자주 변경되는 데이터 비중이 높아 추후 최적화 문제 발생시 대응
      // staleTime: 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
      placeholderData: (prev: unknown) => prev,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
