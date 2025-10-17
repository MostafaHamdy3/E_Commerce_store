import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getCategoryProducts, ProductsResponse } from "../services/products";

const useCategoryProductsQuery = (category: string) =>
  useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", "category", category],
    queryFn: ({ pageParam = 0 }) => getCategoryProducts(category, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.products.length === 30 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });

export const useLaptopsQuery = () => useCategoryProductsQuery("laptops");
