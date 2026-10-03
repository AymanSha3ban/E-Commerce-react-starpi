import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Truck , Building2, Lock } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { CheckoutSchema, type CheckoutFormData } from "@/Schema/CheckoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
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

  const selectedPayment = watch("paymentMethod");

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Submitted Checkout Data:", data);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <Badge variant="outline" className="gap-1 border-teal-500/30 text-teal-500 p-2">
          <Lock className="w-3 h-3" /> Secure Checkout
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
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

                {/* Phone Number with IMask */}
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

          {/* Payment Method */}
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
                  {/* Card Number with IMask */}
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
                    {/* Expiry Date with IMask */}
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

                    {/* CVC Input */}
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

        {/* Order Summary */}
        <OrderSummary isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}