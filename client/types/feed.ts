import { LucideIcon } from "lucide-react";

export interface Feed {
  id: number;
  icon: LucideIcon;
  type: string;
  modul: string;
  title: string;
  desc: string;
  time: string;
  color: string;
  bgColor: string;
}
