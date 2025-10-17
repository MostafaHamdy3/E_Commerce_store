import Axios from "./axiosConfig";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isDeleted?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const DEFAULT_LIMIT = 30;

export const getProducts = async (pageParam = 0): Promise<ProductsResponse> => {
  const skip = pageParam * DEFAULT_LIMIT;
  const resp = await Axios.get<ProductsResponse>(`/products?limit=${DEFAULT_LIMIT}&skip=${skip}`);
  return resp.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  try {
    const resp = await Axios.delete(`/products/${id}`);
    return { ...resp.data, isDeleted: true };
  } catch (error) {
    console.log("deleteProduct ERROR ===>", error);
    throw error;
  }
};

export const getCategoryProducts = async (
  category: string,
  pageParam = 0
): Promise<ProductsResponse> => {
  const skip = pageParam * DEFAULT_LIMIT;
  const resp = await Axios.get<ProductsResponse>(
    `/products/category/${category}?limit=${DEFAULT_LIMIT}&skip=${skip}`
  );
  return resp.data;
};
