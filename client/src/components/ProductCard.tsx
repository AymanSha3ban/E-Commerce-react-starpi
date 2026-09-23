import { Link } from "react-router-dom";
import type { IProduct } from "@/interfaces/IProduct";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function ProductCard({ product }: { product: IProduct }) {
  const imageUrl = product?.thumbnail?.url
    ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  return (
    <Card className="group overflow-hidden bg-card pt-6 border border-border rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-teal-500 hover:bg-muted/50">
      <img
        src={imageUrl}
        alt={product?.title || "Product image"}
        className="h-[180px] w-[180px] mx-auto rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <CardContent className="flex flex-col gap-2 p-4">
        <CardTitle className="text-center text-lg font-semibold line-clamp-1">
          {product?.title || "Product Name"}
        </CardTitle>

        <CardDescription className="text-center text-sm text-muted-foreground line-clamp-2">
          {product?.description || "High quality product built for modern needs and everyday comfort."}
        </CardDescription>

        <div className="mt-2 text-center text-xl font-bold text-teal-600 dark:text-teal-400">
          ${product?.price ?? 0}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        >
          <Link to={`/products/${product?.documentId || ""}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}