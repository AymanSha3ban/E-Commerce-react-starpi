import { addProducts, deleteProduct, getProducts, updateProduct, uploadProductImage, } from "@/api/products/products"
import { productSchema, type ProductFormData} from "@/Schema/addProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import type { IProduct } from "@/interfaces/IProduct";
import { ProductsSkeleton } from "./Skeletons";
import toast from "react-hot-toast";
import { useRef } from "react";


export default function MangeProducts() {

  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
      });

    const createProductMutation = useMutation({
      mutationFn: async ({
        productData,
        imageFile,
      }: {
        productData: ProductFormData;
        imageFile: File;
      }) => {
        const uploadedImage = await uploadProductImage(imageFile);

        return addProducts({
          ...productData,
          thumbnail: uploadedImage.id,
        });
      },

      onSuccess: async () => {
        toast.success("product added successfully") ;
        await queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        reset();
        setThumbnailFile(null);
        setImageError(null);
        setCreateError(null);
        setFileInputKey((key) => key + 1);
      },

      onError: (error) => {
        setCreateError(
          error instanceof Error ? error.message : "Failed to create product"
        );
      },
    });
    const deleteMutation = useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),
        onSuccess: () => {
          toast.success("product deleted successfully") ;
          queryClient.invalidateQueries({ queryKey: ["products"] })
        },
        onError: (error) => {
          toast.error("Failed to delete product : "+ error.message)
      },
    })

    const handleDeleteProduct = (productId: string) => {
        if (confirm("Are you sure you want to permanently delete this product?")) {
          deleteMutation.mutate(productId)
        }
      } 
      const updateMutation = useMutation({
          mutationFn: async ({
            documentId,
            productData,
            imageFile,
          }: {
            documentId: string;
            productData: ProductFormData;
            imageFile?: File;
          }) => {
            let updatedData: ProductFormData & {
              thumbnail?: number;
            } = { ...productData };

            if (imageFile) {
              const uploadedImage = await uploadProductImage(imageFile);
              updatedData.thumbnail = uploadedImage.id;
            }

            return updateProduct({ documentId, productData: updatedData });
          },

          onSuccess: async () => {
            toast.success("Product updated successfully!");
            await queryClient.invalidateQueries({
              queryKey: ["products"],
            });

            reset();
            setSelectedProduct(null);
            setThumbnailFile(null);
            setImageError(null);
            setFileInputKey((key) => key + 1);
          },

          onError: () => {
            toast.error("Failed to update product!");
          },
        });

    const onSubmit = (data: ProductFormData) => {
      setCreateError(null);

      if (selectedProduct) {
        updateMutation.mutate({
          documentId: selectedProduct.documentId,
          productData: data,
          imageFile: thumbnailFile ?? undefined,
        });
        return;
      }

      if (!thumbnailFile) {
        setImageError("Please select a product image");
        return;
      }

      setImageError(null);

      createProductMutation.mutate({
        productData: data,
        imageFile: thumbnailFile,
      });
    };

    const { data: products, isLoading, isError, error } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: () => getProducts(),
    });

    if (isLoading) {
        return (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6 m-6 mt-[30px] mb-[30px]">
            {Array.from({ length: 20 }, (_, indx) => (
              <ProductsSkeleton key={indx} />
            ))}
          </div>
        );
      }
    
      if (isError) {
        return (
          <div className="flex h-[50vh] items-center justify-center">
            <p className="text-red-400">Error: {(error as Error).message}</p>
          </div>
        );
      }

    
  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manage Products</h2>
          <p className="text-xs text-muted-foreground">Add, edit, and remove products from store</p>
        </div>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-4 bg-card border border-border rounded-2xl space-y-4 scroll-mt-24">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-600" /> {selectedProduct ? "Edit Product" : "Add New Product"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
                <Input
                    placeholder="Product Name"
                    {...register('title')}
                    className="text-xs rounded-xl"
                />
                {errors.title && (
                    <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
            </div>

            <div>
              <Input
                placeholder="Price ($)"
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="text-xs rounded-xl"
              />
              {errors.price && (
                  <p className="text-xs text-destructive">{errors.price.message}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="description"
                {...register('description')}
                className="text-xs rounded-xl"
              />
              {errors.description && (
                  <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Stock"
                {...register("stock", { valueAsNumber: true })}
                className="text-xs rounded-xl"
              />

              {errors.stock && (
                <p className="text-xs text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div>
              <Input
                key={fileInputKey}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setThumbnailFile(event.target.files?.[0] ?? null);
                  setImageError(null);
                }}
                className="text-xs rounded-xl"
              />

              {imageError && (
                <p className="text-xs text-destructive">{imageError}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            {selectedProduct ? updateMutation.isPending? 
              "Updating...": "Update Product" 
              : createProductMutation.isPending
                ? "Uploading..."
                : "Add Product"
            }
            </Button>
            {selectedProduct && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedProduct(null);
                  reset({
                    title: "",
                    description: "",
                    price: 0,
                    stock: 0,
                  });
                  setThumbnailFile(null);
                  setImageError(null);
                  setCreateError(null);
                  setFileInputKey((key) => key + 1);
                }}
                className="bg-red-800"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
        {createError && (
          <p className="text-sm text-destructive">{createError}</p>
        )}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-6">name</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">Stock</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products?.length === 0 ?
                <div className="flex h-[50vh] items-center justify-center">
                  <p className="text-xl">No products found</p>
                </div>
                :
                products?.map((product) => {
                    const imageUrl = product?.thumbnail?.url
                    ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
                    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";

                    return <tr key={product.id} className="hover:bg-muted/40 transition-colors">

                        <td className="py-4 px-6 font-medium whitespace-nowrap"><img src={imageUrl} alt={product.title} className="size-10 rounded-full"/></td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap">{product.title}</td>
                        <td className="py-4 px-6 text-muted-foreground whitespace-nowrap">{product.price.toFixed(2)}</td>
                        <td className="py-4 px-6 font-semibold whitespace-nowrap">${product.stock} pcs</td>
                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => {
                              setSelectedProduct(product);

                              reset({
                                title: product.title,
                                description: product.description,
                                price: product.price,
                                stock: product.stock,
                              });

                              setThumbnailFile(null);
                              setImageError(null);
                              formRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.documentId)}
                            className="h-8 w-8 text-rose-500 hover:text-rose-600"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}
