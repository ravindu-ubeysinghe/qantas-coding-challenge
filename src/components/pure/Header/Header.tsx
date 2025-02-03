import { Box } from "@mui/material";

export const Header = () => {
  return (
    <Box width="100%">
      <Box maxWidth="200px" position="relative">
        <img
          alt="Qantas Hotels"
          src="/assets/qantas-logo.png"
          height="100%"
          width="100%"
          style={{
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};
