import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts, ProductsResponse } from "../services/products";

export const useProductsQuery = () =>
  useInfiniteQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => getProducts(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.products.length === 30 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  })