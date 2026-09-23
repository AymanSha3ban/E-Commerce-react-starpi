import { getCategories } from "@/api/categories/category";
import { CategoriesSkeleton } from "@/components/Skeletons";
import type { ICategory } from "@/interfaces/ICategory";

import { useQuery } from "@tanstack/react-query";

import {
  Link as RouterLink,
  useSearchParams,
} from "react-router-dom";

export default function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 p-6 m-6 mt-[30px] mb-[30px]">
        {Array.from(
          { length: 20 },
          (_, indx) => (
            <CategoriesSkeleton key={indx} />
          )
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-400">
          Error: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-3 flex-wrap px-3 md:px-6 py-5 mb-6 border-b border-border">
      {/* ALL */}
      <RouterLink
        to="/products"
        className={`px-4 md:px-6 py-2.5 rounded-full font-semibold text-sm md:text-base border transition-all duration-250 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 ${
          !activeCategory
            ? "bg-teal-500 text-white border-teal-500"
            : "bg-transparent text-muted-foreground border-border hover:bg-teal-500 hover:text-white hover:border-teal-500"
        }`}
      >
        ALL
      </RouterLink>

      {/* Categories */}
      {categories?.map((category: ICategory) => {
        const isActive = activeCategory === String(category.id);

        return (
          <RouterLink
            key={category.id}
            to={`/products?category=${category.id}`}
            className={`px-4 md:px-6 py-2.5 rounded-full font-semibold text-sm md:text-base tracking-wide border transition-all duration-250 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 ${
              isActive
                ? "bg-teal-500 text-white border-teal-500"
                : "bg-transparent text-muted-foreground border-border hover:bg-teal-500 hover:text-white hover:border-teal-500"
            }`}
          >
            {category.title.toUpperCase()}
          </RouterLink>
        );
      })}
    </div>
  );
}