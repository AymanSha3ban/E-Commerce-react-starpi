import { getProductsByID } from "@/api/products/products";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "./Skeletons";
import { LuArrowLeft, LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useCartState } from "@/Store/CartStore";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const addOrder = useCartState(state => state.addOrder) ;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductsByID(String(id)),
  });

  const addToCartHandeler = () => {
    if (!product) return;
    
    console.log("Added Product:", product.title, "With Quantity:", quantity);
    addOrder({ product, quantity });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          Error: Product not found
        </p>
      </div>
    );
  }

  const imageUrl = product?.thumbnail?.url
    ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Button
        variant="secondary"
        className="mb-6 rounded-lg hover:-translate-x-1 transition-transform"
        onClick={() => navigate(-1)}
      >
        <LuArrowLeft className="mr-2 h-4 w-4" /> Go Back
      </Button>

      <Card className="overflow-hidden p-4 md:p-8 border-border rounded-2xl shadow-md bg-card">
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10">
          {/* Image Section */}
          <div className="flex flex-1 items-center justify-center bg-muted/50 rounded-xl p-4 md:p-8 min-h-[280px] md:min-h-[400px]">
            <img
              src={imageUrl}
              alt={product?.title || "Product Image"}
              className="max-h-[400px] w-full object-contain rounded-xl transition-transform duration-300 hover:scale-105"
              onError={(event) => {
                const target = event.currentTarget as HTMLImageElement;
                target.src =
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";
              }}
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-1 flex-col justify-center gap-5">
            <div>
              <Badge variant="secondary" className="mb-2 text-teal-600 bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400">
                Product Details
              </Badge>

              <h1 className="text-2xl md:text-3xl font-bold">
                {product?.title}
              </h1>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {product?.description ||
                "No description available for this product."}
            </p>

            <div className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400">
              ${product?.price ? product.price.toFixed(2) : "0.00"}
            </div>

            <div className="h-px bg-border w-full" />

            {/* Stock and Quantity */}
            <div className="flex justify-between items-center w-full flex-wrap gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Availability
                </p>
                <p
                  className={`text-base font-semibold ${
                    product?.stock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product?.stock
                    ? `${product.stock} items in stock`
                    : "Out of stock"}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  <LuMinus className="h-4 w-4" />
                </Button>
                <span className="font-semibold px-2 text-sm w-6 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={Boolean(product?.stock && quantity >= product.stock)}
                >
                  <LuPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-all active:scale-95"
              disabled={!product?.stock}
              onClick={addToCartHandeler}
            >
              <LuShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}