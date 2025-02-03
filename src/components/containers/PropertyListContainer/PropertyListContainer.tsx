import { getPropertyResults } from "@/api/client";
import { Alert, Box, LinearProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { GENERIC_ERROR } from "@/consts";
import { PropertyResult as PropertyResultType } from "@/types";
import { PropertyResult } from "@/components/pure/PropertyResult/PropertyResult";

export const PropertyListContainer = () => {
  const [propertyList, setPropertyList] = useState<PropertyResultType[]>();
  const [error, setError] = useState<string | null>(null);
  // NOTE: Ideally this would be fetched dynamically
  const currentLocation = "Sydney";

  const fetchPropertyResults = useCallback(async () => {
    try {
      const response = await getPropertyResults();
      console.log(response);
      setPropertyList(response.results);
    } catch (e) {
      setError(GENERIC_ERROR);
    }
  }, []);

  useEffect(() => {
    fetchPropertyResults();
  }, []);

  if (!propertyList?.length) {
    return (
      <Box
        display="flex"
        maxHeight="500px"
        justifyContent="center"
        alignItems="center"
      >
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    <Box
      display="flex"
      maxHeight="500px"
      justifyContent="center"
      alignItems="center"
    >
      <Alert severity="error">{error}</Alert>
    </Box>;
  }

  return (
    <Box>
      <Typography my="20px" fontWeight="500">
        {propertyList.length}{" "}
        <span style={{ fontStyle: "italic", color: "#898989" }}>hotels in</span>{" "}
        {currentLocation}
      </Typography>
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
