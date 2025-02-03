import { getPropertyResults } from "@/api/client";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { GENERIC_ERROR } from "@/consts";
import { PropertyResult as PropertyResultType } from "@/types";
import { PropertyResult } from "@/components/pure/PropertyResult/PropertyResult";
import {
  SortDirection,
  SortDropdown,
} from "@/components/pure/SortDropdown/SortDropdown";
import { sortPropertyResults } from "./utils";

export const PropertyResultContainer = () => {
  const [propertyList, setPropertyList] = useState<PropertyResultType[]>();
  const [error, setError] = useState<string | null>(null);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("descending");
  // NOTE: Ideally this would be fetched dynamically
  const currentLocation = "Sydney";

  const fetchPropertyResults = useCallback(async () => {
    try {
      const response = await getPropertyResults();
      setPropertyList(sortPropertyResults(response.results, sortDirection));
    } catch (e) {
      setError(GENERIC_ERROR);
    }
  }, []);

  useEffect(() => {
    fetchPropertyResults();
  }, []);

  useEffect(() => {
    propertyList &&
      setPropertyList(sortPropertyResults(propertyList, sortDirection));
  }, [setPropertyList, sortPropertyResults, sortDirection]);

  if (error) {
    <Box
      display="flex"
      width="100%"
      height="500px"
      justifyContent="center"
      alignItems="center"
    >
      <Alert severity="error">{error}</Alert>
    </Box>;
  }

  if (!propertyList?.length) {
    return (
      <Box
        display="flex"
        width="100%"
        height="500px"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display={{ xs: "block", md: "flex" }}
        justifyContent="space-between"
        mb="10px"
      >
        <Typography my="10px" fontWeight="500">
          {propertyList.length}{" "}
          <span style={{ fontStyle: "italic", color: "#898989" }}>
            hotels in
          </span>{" "}
          {currentLocation}
        </Typography>
        <SortDropdown
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </Box>
      <Box display="grid" rowGap="20px">
        {propertyList.map(
          ({
            id,
            property: { previewImage, title, address, rating },
            offer: {
              name,
              promotion,
              displayPrice,
              savings,
              cancellationOption: { cancellationType },
            },
          }) => (
            <PropertyResult
              key={id}
              id={id}
              title={title}
              image={{
                alt: previewImage.caption,
                src: previewImage.url,
              }}
              address={address.join(", ")}
              offerName={name}
              promotionTitle={promotion.title}
              displayPrice={displayPrice}
              savings={savings}
              rating={rating}
              isFreeCancellationEligible={
                cancellationType === "FREE_CANCELLATION"
              }
            />
          )
        )}
      </Box>
    </Box>
  );
};
