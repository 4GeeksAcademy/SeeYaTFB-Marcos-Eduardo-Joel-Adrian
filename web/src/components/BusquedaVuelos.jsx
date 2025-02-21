import React, { useState } from "react";
import Vuelos from "../pages/vuelos";
import ListaVuelos from "../pages/Listavuelos";
import Grid from "@mui/material/Grid";

const BusquedaVuelos = () => {
  const [filters, setFilters] = useState({});

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} md={6}>
        <Vuelos setFilters={setFilters} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ListaVuelos filters={filters} />
      </Grid>
    </Grid>
  );
};

export default BusquedaVuelos;
