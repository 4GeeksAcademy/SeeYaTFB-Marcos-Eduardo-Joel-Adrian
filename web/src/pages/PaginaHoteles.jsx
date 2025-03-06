import React, { useState } from "react";  
import Grid from "@mui/material/Grid";
import HotelesBuscador from "../components/buscadores/HotelesBuscador";
import HotelesLista from "../components/listas/HotelesLista";

export const PaginaHoteles = () => {
  const [filters, setFilters] = useState({  
    company: "",
    wifi: "",
    parking: "",
    sports: "",
    cost_range: [0, 400],
  });

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: 3 }}>
      <Grid item xs={12} md={4}>
        <HotelesBuscador filters={filters} setFilters={setFilters} />
      </Grid>

      <Grid item xs={12} md={8}>
        <HotelesLista filters={filters} />
      </Grid>
    </Grid>
  );
};
