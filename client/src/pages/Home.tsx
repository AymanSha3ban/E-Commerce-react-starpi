import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/api/products/products"
import type { IProduct } from "@/interfaces/IProduct"
import ProductCard from "@/components/ProductCard"
import Categories from "@/components/Categories"
import { ProductsSkeleton } from "@/components/Skeletons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2
} from "lucide-react"

export default function Home() {
  const { data: products, isLoading } = useQuery<IProduct[]>({
    queryKey: ["featured-products"],
    queryFn: () => getProducts(),
  })

  const featuredProducts = products?.slice(0, 8) || []

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="border-b border-border bg-card/30 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Text */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/5 px-3 py-1 text-xs">
                New Arrivals Available Now
              </Badge>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Quality items, directly to your door.
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
                Explore our selected inventory with simple checkout, transparent shipping fees, and cash on delivery support.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm gap-2">
                  <Link to="/products" className="flex items-center gap-2">
                    Browse All Products <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-sm">
                  <Link to="/about">About Our Store</Link>
                </Button>
              </div>

              {/* Real Value Props instead of fake numbers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" /> Express Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" /> Cash on Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" /> Easy 14-Day Returns
                </span>
              </div>
            </div>

            {/* Simple Graphic Showcase */}
            <div className="lg:col-span-5">
              <Card className="border-border bg-card/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-medium text-muted-foreground">Featured Highlight</span>
                  <Badge variant="secondary" className="text-xs">In Stock</Badge>
                </div>
                
                <div className="aspect-video rounded-lg bg-muted/60 border border-border flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/40" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">Curated Collection</h3>
                  <p className="text-xs text-muted-foreground">Updated daily with verified stock levels.</p>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Services Bar */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border bg-card/40">
            <CardContent className="p-4 flex items-center gap-3">
              <Truck className="w-5 h-5 text-teal-500 shrink-0" />
              <div>
                <h4 className="font-medium text-xs">Fast Shipping</h4>
                <p className="text-[11px] text-muted-foreground">Delivered within 2-4 business days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/40">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0" />
              <div>
                <h4 className="font-medium text-xs">Secure Payments</h4>
                <p className="text-[11px] text-muted-foreground">Card payment or Cash on Delivery</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/40">
            <CardContent className="p-4 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-teal-500 shrink-0" />
              <div>
                <h4 className="font-medium text-xs">Simple Returns</h4>
                <p className="text-[11px] text-muted-foreground">14-day replacement policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 max-w-7xl space-y-4">
        <div className="border-b border-border pb-3">
          <h2 className="text-xl font-bold">Categories</h2>
        </div>
        <Categories />
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 max-w-7xl space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-xl font-bold">Products</h2>
            <p className="text-xs text-muted-foreground">Explore available items</p>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-teal-400 gap-1 text-xs">
            <Link to="/products">
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductsSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.documentId} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}