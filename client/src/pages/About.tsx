import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShieldCheck, Truck, ArrowRight } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-12">
      
      {/* Intro */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">About The Store</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          We built this store to offer a straightforward shopping experience. No hidden fees, clear item availability, and reliable order tracking.
        </p>
      </section>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-5 space-y-2">
            <Package className="w-5 h-5 text-teal-500" />
            <h3 className="font-semibold text-sm">Verified Products</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every product listed in our inventory is checked for quality before being dispatched.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-5 space-y-2">
            <Truck className="w-5 h-5 text-teal-500" />
            <h3 className="font-semibold text-sm">Clear Shipping</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Orders are processed within 24 hours. Track your shipping status directly from your dashboard.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-teal-500" />
            <h3 className="font-semibold text-sm">Secure Checkout</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Support for online payments and cash on delivery to match your preferred choice.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Tech / Store note */}
      <section className="p-6 rounded-xl border border-border bg-card/40 space-y-3">
        <h2 className="text-lg font-semibold">How It Works</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Browse items by category, add them to your cart, and enter your delivery details. You can manage your orders and check their real-time progress anytime through our customer account system.
        </p>
        <div className="pt-2">
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white gap-2 text-xs">
            <Link to="/products" className="flex items-center gap-1.5">
              Start Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  )
}