import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useCartState } from "@/Store/CartStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337"

export default function OrderSummary({ isSubmitting,}: { isSubmitting: boolean;}) {
  const orders = useCartState((state) => state.orders);

  const subtotal = orders.reduce(
    (sum, order) => sum + order.product.price * order.quantity,
    0
  );

  const total = subtotal;
  const getImageUrl = (url?: string) => {
    if (!url) return null
    if (url.startsWith("http://") || url.startsWith("https://")) return url
    return `${API_URL}${url}`
  }

  return (
    <div className="lg:col-span-5 space-y-6">
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Products */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {orders.map((order) => {
              const itemTotal =
                order.product.price * order.quantity;
                const imgPath = order.product?.thumbnail?.url
                const imageUrl = getImageUrl(imgPath)
              return (
                <div
                  key={order.product.documentId}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0 border">
                      <img
                        src={imageUrl && imageUrl !== "null" ? imageUrl : ""}
                        alt={order.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-medium line-clamp-1">
                        {order.product.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Qty: {order.quantity} × $
                        {order.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ${itemTotal.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-teal-500 font-medium">
                Free
              </span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg pt-1">
              <span>Total</span>

              <span className="text-teal-500">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 font-semibold"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
            <ShieldCheck className="w-4 h-4 text-teal-500" />

            <span>30-Day Money Back Guarantee</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}