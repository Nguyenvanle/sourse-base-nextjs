import { ENDPOINTS } from "~/constants";

import { Product } from "~/types";

import { apiClient } from "~/libs";

const productService = {
  getProduct: () => apiClient.get<Product[]>(ENDPOINTS.products),

  createProduct: (productData: Partial<Product>) =>
    apiClient.post<Product>(ENDPOINTS.products, productData),

  updateProduct: (id: string, productData: Partial<Product>) =>
    apiClient.put<Product>(`${ENDPOINTS.products}/${id}`, productData),
};

export { productService };
