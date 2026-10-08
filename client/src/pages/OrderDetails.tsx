import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/api/orders/orders";
 import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  CreditCard,
  Building,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import OrderItemRow from "@/components/orderItemRow";


export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 md:col-span-2 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Button asChild variant="outline">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
  console.log(order)
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-6 text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link to="/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              Order #{order.documentId ? order.documentId.slice(0, 8) : order.id}
            </h1>
            <Badge
              variant="outline"
              className="capitalize bg-teal-500/10 text-teal-600 border-teal-500/30"
            >
              {order.orderStatus || "Pending"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 ml-12">
            <Calendar className="w-3.5 h-3.5" /> Placed on {formattedDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Order Items List */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-teal-600" /> Order Items ({order.order_items?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-border">
              {order.order_items && order.order_items.length > 0 ? (
                order.order_items.map((item: any, index: number) => (
                  <OrderItemRow key={item.id || item.documentId || index} item={item} />
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No order items found.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="border-border">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-600" /> Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${order.total?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping Fee</span>
                <span className="text-teal-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-teal-600">${order.total?.toFixed(2) || "0.00"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Customer Details */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" /> Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-600 font-bold flex items-center justify-center border border-teal-500/20 text-sm shrink-0">
                  {order.customerName ? order.customerName.charAt(0).toUpperCase() : "C"}
                </div>
                <div>
                  <p className="font-semibold">{order.customerName || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="truncate">{order.customerEmail || "No Email"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{order.customerPhone || "No Phone"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium capitalize">{order.city || "N/A"}</p>
                  <p className="text-muted-foreground">{order.shippingAddress || "No address provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}