import { useState } from "react"
import {
  ShoppingBag,
  Users,
  Package,
  Trash2,
  ShieldCheck,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import RecentOrders from "@/components/RecentOrders"
import MangeProducts from "@/components/MangeProducts"

interface IProduct {
  id: string
  name: string
  price: number
  category: string
  stock: number
}

interface IUser {
  id: string
  name: string
  email: string
  role: "Customer" | "Admin"
  joinedDate: string
  totalOrders: number
  totalSpent: number
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "users">("orders")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const [users, setUsers] = useState<IUser[]>([
    {
      id: "usr_1",
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      role: "Customer",
      joinedDate: "2026-02-15",
      totalOrders: 5,
      totalSpent: 450.0,
    },
    {
      id: "usr_2",
      name: "Sara Mohamed",
      email: "sara@example.com",
      role: "Admin",
      joinedDate: "2026-01-10",
      totalOrders: 12,
      totalSpent: 1200.5,
    },
  ])

  

  const handleToggleAdmin = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return { ...u, role: u.role === "Admin" ? "Customer" : "Admin" }
        }
        return u
      })
    )
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user account?")) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

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

            <button
              onClick={() => {
                setActiveTab("users")
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                activeTab === "users"
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
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

          {activeTab === "products" && (
            <MangeProducts/>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Manage Users</h2>
                <p className="text-xs text-muted-foreground">View registered users, grant admin roles, or remove accounts</p>
              </div>

              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                      <tr>
                        <th className="py-3.5 px-6">User</th>
                        <th className="py-3.5 px-6">Role</th>
                        <th className="py-3.5 px-6">Joined Date</th>
                        <th className="py-3.5 px-6">Total Orders</th>
                        <th className="py-3.5 px-6">Total Spent</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/40 transition-colors">
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-teal-500/10 text-teal-600 text-xs font-bold">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-foreground">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <Badge
                              variant="outline"
                              className={
                                user.role === "Admin"
                                  ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                                  : "bg-muted text-muted-foreground border-border"
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-xs text-muted-foreground whitespace-nowrap">{user.joinedDate}</td>
                          <td className="py-4 px-6 font-semibold whitespace-nowrap">{user.totalOrders}</td>
                          <td className="py-4 px-6 font-bold text-foreground whitespace-nowrap">${user.totalSpent.toFixed(2)}</td>
                          <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleAdmin(user.id)}
                              className="text-xs h-8 gap-1.5"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                              {user.role === "Admin" ? "Remove Admin" : "Make Admin"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteUser(user.id)}
                              className="h-8 w-8 text-rose-500 hover:text-rose-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}