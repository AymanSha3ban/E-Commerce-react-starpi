import { useState } from "react"
import {
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  RefreshCw,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteOrder, getOrder, updateOrderStatus } from "@/api/orders/orders"
import type { IOrder } from "@/interfaces/IOrder"
import { Link } from "react-router-dom"

const getStatusBadge = (status?: string) => {
  const normalizedStatus = status?.toLowerCase() || "pending"

  switch (normalizedStatus) {
    case "completed":
    case "delivered":
      return (
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
          <CheckCircle2 className="w-3 h-3" /> Delivered
        </Badge>
      )
    case "shipped":
    case "processing":
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 gap-1">
          <Truck className="w-3 h-3" /> {normalizedStatus === "shipped" ? "Shipped" : "Processing"}
        </Badge>
      )
    case "cancelled":
    case "rejected":
      return (
        <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 gap-1">
          <XCircle className="w-3 h-3" /> Cancelled
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
          <Clock className="w-3 h-3" /> Pending
        </Badge>
      )
  }
}

export default function RecentOrders() {
  const queryClient = useQueryClient()
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all")

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrder(),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ documentId, status }: { documentId: string; status: string }) =>
      updateOrderStatus(documentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })

  const handleStatusChange = (documentId: string, status: string) => {
    if (documentId) {
      updateStatusMutation.mutate({ documentId, status })
    }
  }

  const handleDelete = (orderId: string) => {
    if (confirm("Are you sure you want to permanently delete this order?")) {
      deleteMutation.mutate(orderId)
    }
  }


  const filteredOrders = orders.filter((order: IOrder) => {
    if (selectedStatusFilter === "all") return true
    return order.orderStatus?.toLowerCase() === selectedStatusFilter.toLowerCase()
  })

  return (
    <div className="w-full space-y-6 text-foreground p-4 md:p-6 transition-colors duration-200">
      <div className="bg-card text-card-foreground border border-border rounded-2xl shadow-xs overflow-hidden backdrop-blur-xs">
        <div className="p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-600" /> Recent Orders
            </h3>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-full">
              {orders.length} Total
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  Filter: <span className="capitalize">{selectedStatusFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setSelectedStatusFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatusFilter("processing")}>Processing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatusFilter("shipped")}>Shipped</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatusFilter("delivered")}>Delivered</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold tracking-wider border-b border-border">
              <tr>
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Contact</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {isLoading &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))}

              {!isLoading && isError && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-destructive">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="w-8 h-8" />
                      <p className="font-semibold">Failed to load orders</p>
                      <p className="text-xs text-muted-foreground">
                        {error instanceof Error ? error.message : "Something went wrong"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShoppingBag className="w-10 h-10 text-muted" />
                      <p className="font-medium">No orders found</p>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading &&
                !isError &&
                filteredOrders.map((order: IOrder) => {
                  const orderId = order.documentId || String(order.id)
                  const formattedDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"

                  return (
                    <tr key={orderId} className="hover:bg-muted/40 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          #{order.documentId ? order.documentId.slice(0, 8) : order.id}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.order_items?.length || 0} items
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 font-bold flex items-center justify-center border border-teal-500/20 text-xs shrink-0">
                            {order.customerName ? order.customerName.charAt(0).toUpperCase() : "U"}
                          </div>
                          <span className="font-medium text-foreground">
                            {order.customerName || "Anonymous Customer"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-muted-foreground">
                        <div>{order.customerEmail || "No Email"}</div>
                        <div>{order.customerPhone || "No Phone"}</div>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(order.orderStatus)}</td>
                      <td className="py-4 px-6 font-bold text-foreground">
                        ${order.total ? order.total.toFixed(2) : "0.00"}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground text-xs font-medium">
                        {formattedDate}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                              <Link to={`/dashboard/orders/${orderId}`} className="cursor-pointer flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Details
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="cursor-pointer flex items-center gap-2">
                                <RefreshCw className="h-4 w-4" /> Update Status
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent className="w-36">
                                <DropdownMenuItem onClick={() => handleStatusChange(orderId, "pending")}>
                                  Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(orderId, "processing")}>
                                  Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(orderId, "shipped")}>
                                  Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(orderId, "delivered")}>
                                  Delivered
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(orderId, "cancelled")}>
                                  Cancelled
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleDelete(orderId)}
                              disabled={deleteMutation.isPending}
                              className="cursor-pointer text-rose-500 focus:text-rose-500 flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              {deleteMutation.isPending ? "Deleting..." : "Delete Order"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}