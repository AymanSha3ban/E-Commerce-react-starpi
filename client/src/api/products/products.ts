import type { IUploadedMedia } from "@/interfaces/IProduct";
import { PrivateAPI, PublicAPI } from "../BaseAPI";
import type { ProductFormData } from "@/Schema/addProduct";

export async function getProducts(categoryId?: string , search?: string ) {
  const url =
    (categoryId && search )?
        `/api/products?filters[categories][id][$eq]=${categoryId}&filters[title][$containsi]=${search}&populate=thumbnail`
    :
    categoryId ? 
        `/api/products?filters[categories][id][$eq]=${categoryId}&populate=thumbnail`
    :   
    search ?
        `/api/products?filters[title][$containsi]=${search}&populate=thumbnail`
    :
        `/api/products?populate=thumbnail`;

  const response = await PublicAPI.get(url);

  return response.data.data;
}

export async function getProductsByID(id : string){
    const response = await PublicAPI.get(`/api/products/${id}?populate=thumbnail`);
    return response.data.data;
}

export async function uploadProductImage(
  file: File
): Promise<IUploadedMedia> {
  const formData = new FormData();

  formData.append("files", file);

  const response = await PrivateAPI.post<IUploadedMedia[]>(
    "/api/upload",
    formData
  );

  const uploadedFile = response.data[0];

  if (!uploadedFile) {
    throw new Error("Image upload failed.");
  }

  return uploadedFile;
}

export async function addProducts(product: ProductFormData & { thumbnail: number }) {
  const response = await PrivateAPI.post("/api/products", {
    data: product,
  });

  return response.data.data;
}

export const deleteProduct = async (ProductId: string) => {
  const response = await PrivateAPI.delete(`/api/products/${ProductId}`);
  return response.data;
};

export const updateProduct = async ({
  documentId,
  productData,
}: {
  documentId: string;
  productData: ProductFormData & { thumbnail?: number };
}) => {
  const response = await PrivateAPI.put(
    `/api/products/${documentId}`,
    {
      data: productData,
    }
  );

  return response.data.data;
};