import { useState } from "react"
import {
  ShoppingBag,
  Users,
  Package,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RecentOrders from "@/components/RecentOrders"
import MangeProducts from "@/components/MangeProducts"


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "users">("orders")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)



  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)] bg-background text-foreground relative">
      {/* Overlay للموبايل عند فتح القائمة */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Responsive */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen md:h-[calc(100vh-4rem)] w-64 bg-card border-r border-border flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight">Admin Dashboard</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("orders")
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                activeTab === "orders"
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Manage Orders</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("products")
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                activeTab === "products"
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Manage Products</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-border flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-teal-500/10 text-teal-600 font-bold">AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold truncate">Admin User</span>
            <span className="text-xs text-muted-foreground truncate">admin@store.com</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative w-36 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 h-9 text-xs rounded-xl bg-muted/40 border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-teal-600 absolute top-2 right-2" />
            </Button>
          </div>
        </header>

        <main className="p-3 sm:p-4 md:p-6 flex-1 overflow-y-auto">
          {activeTab === "orders" && <RecentOrders />}
          {activeTab === "products" && <MangeProducts/>}
        </main>
      </div>
    </div>
  )
}