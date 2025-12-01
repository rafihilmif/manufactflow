import { Order, Product } from "@/types/table";

export const recentOrder: Order[] = [
  {
    id: "#3512",
    customer: "Rore Smith",
    product: "Iphone 17 Promax",
    amount: "$2,999",
    status: "completed",
    date: "2025-01-15",
  },
  {
    id: "#3610",
    customer: "Kirm Napoli",
    product: "MacBook Pro 16",
    amount: "$5,000",
    status: "pending",
    date: "2025-02-17",
  },
  {
    id: "#3781",
    customer: "Pau Lo",
    product: "AirPods Pro",
    amount: "$500",
    status: "cancelled",
    date: "2025-03-01",
  },
  {
    id: "#3921",
    customer: "Yuw Sain",
    product: "Air Tag",
    amount: "$100",
    status: "completed",
    date: "2025-05-01",
  },
];

export const topProduct: Product[] = [
  {
    name: "MacBook Pro 16",
    sales: 1490,
    revenue: "$2,291,021",
    trend: "up",
    change: "+19%",
  },
  {
    name: "Iphone 17 Promax",
    sales: 1000,
    revenue: "$199,212",
    trend: "down",
    change: "-5%",
  },
  {
    name: "Airpods Pro",
    sales: 5201,
    revenue: "$9,102,214",
    trend: "up",
    change: "+20%",
  },
  {
    name: "Air Tag",
    sales: 19002,
    revenue: "$25,910,125",
    trend: "up",
    change: "+65%",
  },
  {
    name: "Airpods Pro",
    sales: 5201,
    revenue: "$9,102,214",
    trend: "up",
    change: "+20%",
  },
  {
    name: "Air Tag",
    sales: 19002,
    revenue: "$25,910,125",
    trend: "up",
    change: "+65%",
  },
  {
    name: "Air Tag",
    sales: 19002,
    revenue: "$25,910,125",
    trend: "up",
    change: "+65%",
  },
];
