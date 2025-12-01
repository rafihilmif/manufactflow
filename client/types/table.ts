export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

export interface Product {
  name: string;
  sales: BigInteger;
  revenue: string;
  trend: "up" | "down";
  change: string;
}
