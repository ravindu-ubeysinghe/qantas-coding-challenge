import { Price } from "@/types";

export const formatPrice = ({ amount, currency }: Price) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
