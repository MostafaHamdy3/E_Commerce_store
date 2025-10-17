import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct, ProductsResponse } from "../services/products";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedProduct) => {
      queryClient.setQueryData<InfiniteData<ProductsResponse>>(["products"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            products: page.products.map((product) =>
              product.id === deletedProduct.id
                ? { ...product, isDeleted: true }
                : product
            ).filter((product) => !product.isDeleted),
            total: Math.max(0, page.total - 1),
          })),
        };
      });
    },
    onError: (error) => {
      console.log("useDeleteProduct ERROR ===>", error);
    },
  });
};
