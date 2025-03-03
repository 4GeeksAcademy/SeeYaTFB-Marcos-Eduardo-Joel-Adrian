import React, { useState } from "react";  
import ListaVuelos from "../components/listas/Listavuelos";
import Grid from "@mui/material/Grid";
import BuscadorVuelos from "../components/buscadores/BuscadorVuelos";

export const PaginaVuelos = () => {
  const [filters, setFilters] = useState({  
    origin_city: "",
    destiny_city: "",
    company: "",
    time_departure_min: "",
    time_departure_max: "",
    time_arrival_min: "",
    time_arrival_max: "",
    wifi: "",
    pets: "",
    baggage: "",
    cost_range: "",
  });

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} md={6}>
        <BuscadorVuelos filters={filters} setFilters={setFilters} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ListaVuelos filters={filters} />
      </Grid>
    </Grid>
  );
};
