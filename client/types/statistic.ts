import { LucideIcon } from "lucide-react";
export interface Statistic {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
}
