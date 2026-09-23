import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/api/products/products";
import { useQuery } from "@tanstack/react-query";
import { ProductsSkeleton } from "@/components/Skeletons";
import Categories from "@/components/Categories";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");

  const { data: products, isLoading, isError, error } = useQuery<IProduct[]>({
    queryKey: ["products", categoryId, search],
    queryFn: () => getProducts(categoryId ?? undefined, search ?? undefined),
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
    <>
      <Categories />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6 m-6">
        {products?.map((product: IProduct) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>
    </>
  );
}