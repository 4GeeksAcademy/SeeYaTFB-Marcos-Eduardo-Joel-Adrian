import React, { useState } from "react";  
import Grid from "@mui/material/Grid";
import ListaCoches from "../components/listas/ListaCoches";
import BuscadorCoches from "../components/buscadores/BuscadorCoches";

export const PaginaCoches = () => {
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
        <BuscadorCoches filters={filters} setFilters={setFilters} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ListaCoches filters={filters} />
      </Grid>
    </Grid>
  );
};
