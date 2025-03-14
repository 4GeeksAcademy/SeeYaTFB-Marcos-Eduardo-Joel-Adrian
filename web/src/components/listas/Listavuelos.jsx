import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LuggageIcon from "@mui/icons-material/Luggage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import { UserContext } from "../../context/User";
import { baseUrl } from "../../services/api/config";
import { FavoritesContext } from "../../context/Booking"; 

const ListaVuelos = ({ filters }) => {
  const [vuelos, setVuelos] = useState([]);

  const [companies, setCompanies] = useState({});
  const {addToFavorites}=useContext(FavoritesContext)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVuelos = async () => {
      setLoading(true);
      try {
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
        );

        const queryParams = new URLSearchParams(cleanFilters).toString();
        console.log("URL de la petición:", `${baseUrl}/flights?${queryParams}`);

        const response = await fetch(`${baseUrl}/flights?${queryParams}`);
        let data = await response.json();

        const convertirAHoras = (hora) => {
          if (!hora) return null;
          const [h, m] = hora.split(":").map(Number);
          return h * 60 + (m || 0);
        };

        data = data.filter((vuelo) => {
          return Object.entries(cleanFilters).every(([key, value]) => {
            if (key === "cost_range") {
              const [min, max] = value.split("-").map(Number);
              return vuelo.cost >= min && vuelo.cost <= max;
            }

            if (key === "time_departure_min")
              return convertirAHoras(vuelo.time_departure) >= convertirAHoras(value);
            if (key === "time_departure_max")
              return convertirAHoras(vuelo.time_departure) <= convertirAHoras(value);
            if (key === "time_arrival_min")
              return convertirAHoras(vuelo.time_arrival) >= convertirAHoras(value);
            if (key === "time_arrival_max")
              return convertirAHoras(vuelo.time_arrival) <= convertirAHoras(value);

            return vuelo[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
          });
        });

        setVuelos(data);
      } catch (error) {
        console.error("Error al obtener vuelos:", error);
        setVuelos([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${baseUrl}/companies`);
        const data = await response.json();
        const companiesMap = data.reduce((acc, company) => {
          acc[company.id] = company.name;
          return acc;
        }, {});
        setCompanies(companiesMap);
      } catch (error) {
        console.error("Error al obtener compañías:", error);
      }
    };
  
    fetchCompanies();
    fetchVuelos();
  }, [filters]);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  return (
    <Box sx={{ width: "95%", paddingTop: "24px" }}>
      <Typography variant="h2" textAlign="center" gutterBottom>
        Resultados
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : vuelos.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="textSecondary">
          No se encontraron vuelos que coincidan con los filtros.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {vuelos.map((vuelo) => (
            <Grid item xs={12} sm={6} md={4} key={vuelo.id}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                <img src={vuelo.photo || "No Photo"} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
                  <Typography variant="h6" gutterBottom>
                    <FlightIcon color="primary" /> {companies[vuelo.company_id]  || "Aerolínea desconocida"}
                  </Typography>
                  <Typography>
                    <FlightTakeoffIcon color="success" /> {vuelo.origin_city} <br></br>
                    <FlightLandIcon color="error" /> {vuelo.destiny_city}
                  </Typography>
                  <Typography>
                    {vuelo.time_departure}h - {vuelo.time_arrival}h
                  </Typography>
                  <Typography>
                    <AttachMoneyIcon color="warning" /> {vuelo.cost} €
                  </Typography>
                  <Typography>
                    {vuelo.wifi && <WifiIcon color="primary" />}
                    {vuelo.pets && <PetsIcon color="success" />}
                    {vuelo.baggage && <LuggageIcon color="info" />}
                  </Typography>
                </CardContent>
                <CardActions>


                  <Button onClick={() => {
                      if (isEmpty(user)) {
                        alert("Debes iniciar sesión para reservar un vuelo."); 
                        navigate("/login");
                      } else {
                        addToFavorites(vuelo.id, vuelo.name, "Flight");
                      }
                    }} variant="contained" color="primary" fullWidth>
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

export default ListaVuelos;