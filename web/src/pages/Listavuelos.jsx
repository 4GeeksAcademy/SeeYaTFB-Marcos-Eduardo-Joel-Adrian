import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LuggageIcon from "@mui/icons-material/Luggage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ListaVuelos = ({ filters }) => {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVuelos = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value !== "")
      ).toString();

      try {
        const response = await fetch(`http://localhost:5000/buscar_vuelos?${queryParams}`);
        const data = await response.json();
        setVuelos(data);
      } catch (error) {
        console.error("Error al obtener vuelos:", error);
      }
      setLoading(false);
    };

    fetchVuelos();
  }, [filters]);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h2" textAlign="center" gutterBottom>
              Resultados
            </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : vuelos.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="textSecondary">
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {vuelos.map((vuelo) => (
            <Grid item xs={12} sm={6} md={4} key={vuelo.id}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <FlightIcon color="primary" /> {vuelo.company}
                  </Typography>
                  <Typography>
                    <FlightTakeoffIcon color="success" /> {vuelo.origin_city} →{" "}
                    <FlightLandIcon color="error" /> {vuelo.destiny_city}
                  </Typography>
                  <Typography>🕒 {vuelo.time_departure} - {vuelo.time_arrival}</Typography>
                  <Typography>
                    <AttachMoneyIcon color="warning" /> {vuelo.cost} €
                  </Typography>
                  <Typography>
                    {vuelo.wifi ? <WifiIcon color="primary" /> : "🚫 WiFi"}
                    {vuelo.pets ? <PetsIcon color="success" /> : "🚫 Mascotas"}
                    {vuelo.baggage ? <LuggageIcon color="info" /> : "🚫 Equipaje"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" fullWidth>
                    Reservar ✈️
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

export default ListaVuelos;
