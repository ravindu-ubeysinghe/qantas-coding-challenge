"use client";

import { PropertyListContainer } from "@/components/containers/PropertyListContainer/PropertyListContainer";
import { Header } from "@/components/pure/Header/Header";
import { Container } from "@mui/material";

export default function Page() {
  return (
    <Container maxWidth="xl" sx={{ my: "20px" }}>
      <Header />
      <PropertyListContainer />
    </Container>
  );
}
