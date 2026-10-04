import { useState } from "react";
import { CardFooter, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Truck, Building2, Lock, ShieldCheck } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { CheckoutSchema, type CheckoutFormData } from "@/Schema/Checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";

import { addOrder } from "@/api/orders/orders";
import { useMutation } from "@tanstack/react-query";
import { Separator } from "@radix-ui/react-separator";
import { useCartState } from "@/Store/CartStore";
import type { IOrderInput } from "@/interfaces/IOrder";
import OrderSuccess from "@/components/OrderSuccess";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      paymentMethod: "CARD",
    },
  });

  const orders = useCartState((state) => state.orders);
  const removeAllOrder = useCartState((state) => state.removeAllOrder);

  const { mutate, isPending } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error) => {
      console.log("Failed to create order", error);
    },
  });

  const selectedPayment = watch("paymentMethod");

  const subtotal = orders.reduce(
    (sum, order) => sum + order.product.price * order.quantity,
    0
  );

  const total = subtotal;

  const getImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${API_URL}${url}`;
  };

  const onSubmit = (data: CheckoutFormData) => {
    const orderData: IOrderInput = {
      customerName: `${data.firstName} ${data.lastName}`,
      customerEmail: data.email,
      customerPhone: data.phone,
      shippingAddress: data.address,
      city: data.city,
      total: total,
      orderStatus: "pending",
      order_items: orders.map((order) => ({
        product: order.product.documentId,
        quantity: order.quantity,
        unitPrice: order.product.price,
      })),
    };
    mutate(orderData);
  };

  const handleSuccessComplete = () => {
    removeAllOrder();
    setIsSuccess(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl relative">
      {isSuccess && (
        <OrderSuccess
          redirectDelay={4000}
          onComplete={handleSuccessComplete}
        />
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <Badge variant="outline" className="gap-1 border-teal-500/30 text-teal-500 p-2">
          <Lock className="w-3 h-3" /> Secure Checkout
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Truck className="w-5 h-5 text-teal-500" />
              <CardTitle>1. Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input {...register("firstName")} placeholder="John" />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input {...register("lastName")} placeholder="Doe" />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input {...register("email")} type="email" placeholder="john@example.com" />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <IMaskInput
                        mask="000 000 000 00"
                        value={value || ""}
                        unmask={false}
                        onAccept={(val: string) => onChange(val)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        placeholder="010 000 000 00"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Street Address</label>
                <Input {...register("address")} placeholder="123 Main Street" />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input {...register("city")} placeholder="Cairo" />
                  {errors.city && (
                    <p className="text-xs text-destructive">{errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Postal Code</label>
                  <Input {...register("postalCode")} placeholder="11511" />
                  {errors.postalCode && (
                    <p className="text-xs text-destructive">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <CreditCard className="w-5 h-5 text-teal-500" />
              <CardTitle>2. Payment Method</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                    selectedPayment === "CARD"
                      ? "border-teal-500 bg-teal-500/5 ring-1 ring-teal-500"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register("paymentMethod")}
                          value="CARD"
                          className="accent-teal-500"
                        />
                        <span className="font-semibold text-sm">Credit / Debit Card</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Visa, MasterCard, Meeza
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                    selectedPayment === "CASH"
                      ? "border-teal-500 bg-teal-500/5 ring-1 ring-teal-500"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register("paymentMethod")}
                          value="CASH"
                          className="accent-teal-500"
                        />
                        <span className="font-semibold text-sm">Cash on Delivery</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {errors.paymentMethod && (
                <p className="text-xs text-destructive">{errors.paymentMethod.message}</p>
              )}

              {selectedPayment === "CARD" && (
                <div className="mt-4 p-4 rounded-lg bg-muted/40 space-y-4 border animate-in fade-in-50 duration-200">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Card Number</label>
                    <Controller
                      name="cardNumber"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <IMaskInput
                          mask="0000 0000 0000 0000"
                          value={value || ""}
                          unmask={false}
                          onAccept={(val: string) => onChange(val)}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          placeholder="4000 0000 0000 0000"
                        />
                      )}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-destructive">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Expiry Date</label>
                      <Controller
                        name="expiryDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <IMaskInput
                            mask="00/00"
                            value={value || ""}
                            unmask={false}
                            onAccept={(val: string) => onChange(val)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            placeholder="MM/YY"
                          />
                        )}
                      />
                      {errors.expiryDate && (
                        <p className="text-xs text-destructive">{errors.expiryDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium">CVC / CVV</label>
                      <Controller
                        name="cvc"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <IMaskInput
                            mask="0000"
                            value={value || ""}
                            unmask={false}
                            onAccept={(val: string) => onChange(val)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            placeholder="123"
                          />
                        )}
                      />
                      {errors.cvc && (
                        <p className="text-xs text-destructive">{errors.cvc.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {orders.map((order) => {
                  const itemTotal = order.product.price * order.quantity;
                  const imgPath = order.product?.thumbnail?.url;
                  const imageUrl = getImageUrl(imgPath);
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
                            Qty: {order.quantity} × ${order.product.price.toFixed(2)}
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

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-teal-500 font-medium">Free</span>
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
                disabled={isPending}
                size="lg"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 font-semibold"
              >
                {isSubmitting || isPending ? "Processing..." : "Place Order"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <ShieldCheck className="w-4 h-4 text-teal-500" />
                <span>30-Day Money Back Guarantee</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}