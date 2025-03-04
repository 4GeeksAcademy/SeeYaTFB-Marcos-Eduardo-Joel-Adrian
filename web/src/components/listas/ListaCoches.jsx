import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress, Rating
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import { baseUrl } from "../../services/api/config";

const ListaCoches = ({ filters }) => {
  const [coches, setCoches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoches = async () => {
      setLoading(true);
      try {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
        );

        const queryParams = new URLSearchParams(cleanFilters).toString();
        console.log("URL de la petición:", `${baseUrl}/cars?${queryParams}`);

        const response = await fetch(`${baseUrl}/cars?${queryParams}`);
        const data = await response.json();

        setCoches(data);
      } catch (error) {
        console.error("Error al obtener coches:", error);
        setCoches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoches();
  }, [filters]);

  return (
    <Box sx={{ width: "100%", paddingTop: "24px" }}>
      <Typography variant="h2" textAlign="center" gutterBottom>
        Resultados de coches
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : coches.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="textSecondary">
          No se encontraron coches que coincidan con los filtros.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {coches.map((coche) => (
            <Grid item xs={12} sm={6} md={4} key={coche.id}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <BusinessIcon color="primary" /> {coche.company || "Empresa desconocida"}
                  </Typography>
                  <Typography>
                    <DirectionsCarIcon color="success" /> {coche.brand} - {coche.model}
                  </Typography>
                  <Typography>
                    <LocalGasStationIcon color="info" /> {coche.fuel_type}
                  </Typography>
                  <Typography>
                    <AttachMoneyIcon color="warning" /> {coche.cost} € / día
                  </Typography>
                  <Typography>
                    <Rating name="read-only" value={coche.punctuation} readOnly />
                  </Typography>
                  <Typography>
                    {coche.guarantee && <VerifiedUserIcon color="primary" />} Garantía incluida
                  </Typography>
                  <Typography>
                    {coche.insurance && <SecurityIcon color="primary" />} Seguro incluido
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#2c387e", color: "white" }}
                    fullWidth
                  >
                    Reservar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ListaCoches;
