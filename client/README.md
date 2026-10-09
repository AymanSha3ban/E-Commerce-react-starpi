# 🛒 Full-Stack E-Commerce Platform

A modern, responsive, and performance-optimized Full-Stack E-Commerce web application built with **React (TypeScript)**, **Tailwind CSS**, and **Strapi CMS (Node.js/PostgreSQL)**. 

Designed with a sleek dark-themed UI, full mobile responsiveness, and end-to-end shopping workflow—from product exploration and cart management to a secure checkout experience.

---

## 🚀 Tech Stack

### **Frontend**
* **Framework:** React + Vite (TypeScript)
* **Styling:** Tailwind CSS + Shadcn UI
* **Icons:** Lucide React
* **State Management:** Zustand (Cart & Auth Store)
* **Data Fetching:** TanStack React Query
* **Validation & Forms:** React Hook Form + Zod + IMask (Input masking)
* **Routing:** React Router DOM

### **Backend**
* **Headless CMS:** Strapi v5 (Node.js)
* **Database:** PostgreSQL
* **Image Hosting / Storage:** Cloudinary
* **API Architecture:** REST API

---

## ✨ Key Features

* 📱 **Fully Responsive Layout:** Mobile-first approach optimized across desktop, tablet, and mobile screens.
* 🛍️ **Product Catalog & Filtering:** Search and filter products dynamically by category.
* 🛒 **Cart Management:** Persistent local state management with quantity adjustments, stock availability warnings, and subtotal calculation.
* 💳 **Multi-Step Checkout:** Integrated form validation with masked inputs (Phone, Credit Card, Expiry, CVV) supporting Cash on Delivery (COD) and Card payments.
* 🔐 **Authentication:** Secure Register/Login system integrated with Strapi JWT authentication.
* ⚡ **Admin Dashboard:** Manage products, inventory stock, and recent customer orders in real-time.

---

## ⚡ Performance & Load Benchmark

The backend API was load-tested using `autocannon` to evaluate server throughput, concurrency handling, and request latency under heavy traffic.

### **Benchmark Summary**
* **Concurrent Connections:** `100 Simultaneous Connections`
* **Success Rate:** `100% (0 errors / 0 timeouts)`
* **Average Throughput:** `203+ Requests / Second (Req/Sec)`
* **Average Latency:** `~483 ms`
* **Capacity:** Capable of seamlessly serving **2,000+ active browsing users** concurrently without performance degradation.

---

## 🛠️ Getting Started

### **Prerequisites**
* Node.js (v18.x or higher)
* npm or yarn

### **1. Backend Setup (Strapi)**
```bash
cd server
npm install
npm run develop