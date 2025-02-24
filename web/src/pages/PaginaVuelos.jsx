import React, { useState } from "react";
import BuscadorVuelos from "../components/BuscadorVuelos";
import ListaVuelos from "../components/Listavuelos";
import Grid from "@mui/material/Grid";

export const PaginaVuelos = () => {
  const [filters, setFilters] = useState({});

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} md={6}>
        <BuscadorVuelos setFilters={setFilters} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ListaVuelos filters={filters} />
      </Grid>
    </Grid>
  );
};


