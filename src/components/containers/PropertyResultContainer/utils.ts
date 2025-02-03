import { SortDirection } from "@/components/pure/SortDropdown/SortDropdown";
import { PropertyResult } from "@/types";

export const sortPropertyResults = (
  propertyResults: PropertyResult[],
  sortDirection: SortDirection
) => {
  if (!propertyResults?.length) return propertyResults;
  const propertyResultsCopy = [...propertyResults];
  propertyResultsCopy.sort((a, b) =>
    sortDirection === "ascending"
      ? a.offer.displayPrice.amount - b.offer.displayPrice.amount
      : sortDirection === "descending"
      ? b.offer.displayPrice.amount - a.offer.displayPrice.amount
      : 0
  );

  return propertyResultsCopy;
};
