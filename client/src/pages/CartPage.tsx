import { useCartState, type orderType } from "@/Store/CartStore"
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337"

export default function CartPage() {
  const orders = useCartState((state) => state.orders)
  const increase = useCartState((state) => state.increaseQuantity)
  const decrease = useCartState((state) => state.decreaseQuantity)
  const removeOrder = useCartState((state) => state.removeOrder)
  const removeAllOrder = useCartState((state) => state.removeAllOrder)

  const subtotal = orders.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0)
  const totalItems = orders.reduce((acc, item) => acc + item.quantity, 0)

  const getImageUrl = (url?: string) => {
    if (!url) return null
    if (url.startsWith("http://") || url.startsWith("https://")) return url
    return `${API_URL}${url}`
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <Card className="p-12 flex flex-col items-center justify-center space-y-4 border-dashed">
          <div className="p-4 rounded-full bg-muted">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-sm">
            Looks like you haven't added anything to your cart yet. Explore our products and start shopping!
          </p>
          <Button className="mt-4 gap-2">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
            You have <Badge variant="secondary" className="font-semibold">{totalItems}</Badge> {totalItems === 1 ? "item" : "items"} in your cart
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 self-start md:self-auto gap-2"
          onClick={removeAllOrder}
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {orders.map((order: orderType) => {
            const itemTotal = (order.product?.price || 0) * order.quantity
            const imgPath = order.product?.thumbnail?.url
            const imageUrl = getImageUrl(imgPath)

            return (
              <Card key={order.product?.id || order.product?.title} className="overflow-hidden transition-all hover:shadow-sm">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="w-full h-48 sm:w-28 sm:h-28 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden border">
                      {imageUrl ? (
                      <img 
                          src={imageUrl} 
                          alt={order.product.title} 
                          className="w-full h-full object-cover" 
                      />
                      ) : (
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                      )}
                  </div>
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h3 className="font-semibold text-base leading-snug line-clamp-1">
                      {order.product?.title || "Product Title"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ${order.product?.price?.toFixed(2) || "0.00"} each
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center justify-between sm:items-end w-full sm:w-auto gap-4 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2 border rounded-md p-1 bg-background">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-sm"
                        onClick={() => decrease(order)}
                        disabled={order.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {order.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-sm"
                        onClick={() => increase(order)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-base sm:text-lg">
                        ${itemTotal.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeOrder(order)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button className="w-full text-base py-5" size="lg">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}