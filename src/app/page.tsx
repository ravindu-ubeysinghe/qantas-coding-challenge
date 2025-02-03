"use client";

import { PropertyResultContainer } from "@/components/containers/PropertyResultContainer/PropertyResultContainer";
import { Header } from "@/components/pure/Header/Header";
import { Container } from "@mui/material";

export default function Page() {
  return (
    <Container maxWidth="xl" sx={{ my: "20px" }}>
      <Header />
      <PropertyResultContainer />
    </Container>
  );
}
