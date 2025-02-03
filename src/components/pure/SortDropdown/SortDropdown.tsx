import { Box, Typography } from "@mui/material";

export type SortDirection = "ascending" | "descending";

type SortDropdownProps = {
  sortDirection: SortDirection;
  setSortDirection: (sortDirection: SortDirection) => void;
};

export const SortDropdown = ({
  sortDirection = "descending",
  setSortDirection,
}: SortDropdownProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography mr="5px" fontWeight="700">
        Sort by
      </Typography>
      <select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value as SortDirection)}
        aria-label="Sorting method"
      >
        <option value="descending">Price (high-low)</option>
        <option value="ascending">Price (low-high)</option>
      </select>
    </Box>
  );
};
