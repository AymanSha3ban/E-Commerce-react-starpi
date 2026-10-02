
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Truck, ShieldCheck, Building2, Lock } from "lucide-react";


export default function CheckoutPage() {
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <Badge variant="outline" className="gap-1 border-teal-500/30 text-teal-500">
            <Lock className="w-3 h-3" /> Secure Checkout
            </Badge>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                    <Input name="firstName" required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input name="lastName" required placeholder="Doe" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" name="email" required placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input type="tel" name="phone" required placeholder="+20 100 000 0000" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Street Address</label>
                    <Input name="address" required placeholder="123 Main Street" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input name="city" required placeholder="Cairo" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input name="postalCode" placeholder="11511" />
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
                    <div className="p-4 border rounded-lg cursor-pointer flex items-center justify-between border-teal-500 bg-teal-500/5 ring-1 ring-teal-500">
                    <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <div>
                        <p className="font-semibold text-sm">Credit / Debit Card</p>
                        <p className="text-xs text-muted-foreground">Visa, MasterCard, Meeza</p>
                        </div>
                    </div>
                    </div>

                    <div className="p-4 border rounded-lg cursor-pointer flex items-center justify-between border-border hover:border-muted-foreground/50">
                    <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <div>
                        <p className="font-semibold text-sm">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-muted/40 space-y-4 border">
                    <div className="space-y-2">
                    <label className="text-xs font-medium">Card Number</label>
                    <Input placeholder="4000 0000 0000 0000" maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Expiry Date</label>
                        <Input placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">CVC / CWW</label>
                        <Input placeholder="123" maxLength={3} />
                    </div>
                    </div>
                </div>
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
                    <div className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0 border">
                        <img src="" alt="product" className="w-full h-full object-cover" />
                        </div>
                        <div>
                        <p className="font-medium line-clamp-1">Product Name</p>
                        <p className="text-xs text-muted-foreground">Qty: 1 × $100</p>
                        </div>
                    </div>
                    <p className="font-semibold">$100.00</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">$100.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-teal-500 font-medium">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg pt-1">
                    <span>Total</span>
                    <span className="text-teal-500">$100.00</span>
                    </div>
                </div>
                </CardContent>

                <CardFooter className="flex-col gap-3">
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white size-lg py-6 font-semibold">
                    Place Order
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