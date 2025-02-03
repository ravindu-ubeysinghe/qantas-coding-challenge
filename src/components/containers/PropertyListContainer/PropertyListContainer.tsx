import { getPropertyResults } from "@/api/client";
import { Alert, Box, LinearProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { GENERIC_ERROR } from "@/consts";
import { PropertyResult } from "@/types";

export const PropertyListContainer = () => {
  const [propertyList, setPropertyList] = useState<PropertyResult[]>();
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
      <Typography>
        {propertyList.length} in {currentLocation}
      </Typography>
      {propertyList.map(({ id, property, offer }) => (
        // Property component
        <Box key={id} display="grid" gridAutoColumns="200px 1fr">
          <img
            src={property.previewImage.url}
            height="100%"
            width="100%"
            style={{ objectFit: "contain" }}
          />
          <Box>
            <Typography variant="h3">{property.title}</Typography>
            <Typography>{property.address.join(", ")}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
