import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

type QueryProviderProps = {
  children: React.ReactNode;
  dehydratedState?: any;
};

export const QueryProvider = ({
  children,
  dehydratedState,
}: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  </QueryClientProvider>
);

export { queryClient };
