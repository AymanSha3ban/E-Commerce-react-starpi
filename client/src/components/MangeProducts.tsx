import { addProducts, getProducts } from "@/api/products/products"
import { productSchema, type ProductFormData} from "@/Schema/addProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import type { IProduct } from "@/interfaces/IProduct";
import { ProductsSkeleton } from "./Skeletons";


export default function MangeProducts() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
      });

    const {mutate , isPending} = useMutation({
        mutationFn : addProducts
    })

    const onSubmit = (data:ProductFormData ) => {
        const productData = {
          title: data.title,
          description: data.description,
          price : Number(data.price),
          thumbnail : {
            url : data.thumbnail.url
          } 
        };
        mutate(productData);
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
      
      if (products?.length === 0) {
        return (
          <div className="flex h-[50vh] items-center justify-center">
            <p className="text-xl">No products found</p>
          </div>
        );
      }

    
  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manage Products</h2>
          <p className="text-xs text-muted-foreground">Add, edit, and remove products from store</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-card border border-border rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-600" /> Add New Product
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

            <Input
              placeholder="Price ($)"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="text-xs rounded-xl"
            />
            {errors.price && (
                <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
            <Input
              placeholder="description"
              {...register('description')}
              className="text-xs rounded-xl"
            />
            {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
            <Input
              placeholder="Product Image URL"
              {...register("thumbnail.url")}
              className="text-xs rounded-xl"
            />
            {errors.thumbnail && (
                <p className="text-xs text-destructive">{errors.thumbnail.message}</p>
            )}
          </div>
          <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" /> {isSubmitting || isPending ?'Adding...' :'Add Product'}
          </Button>
        </form>
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Price</th>
                  <th className="py-3.5 px-6">Stock</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products?.map((product) => {
                    const imageUrl = product?.thumbnail?.url
                    ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
                    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";

                    return <tr key={product.id} className="hover:bg-muted/40 transition-colors">

                        <td className="py-4 px-6 font-medium whitespace-nowrap"><img src={imageUrl} alt={product.title} className="size-10 rounded-full"/></td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap">{product.title}</td>
                        <td className="py-4 px-6 text-muted-foreground whitespace-nowrap">{product.description}</td>
                        <td className="py-4 px-6 font-semibold whitespace-nowrap">${product.price.toFixed(2)}</td>
                        <td className="py-4 px-6 whitespace-nowrap">{product.stock} pcs</td>
                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() => handleDeleteProduct(product.id)}
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
