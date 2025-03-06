import { useState, useEffect, useMemo, useContext } from "react";
import {
  Button, Card, CardContent, Typography, CircularProgress, Chip, TextField, Box, Grid
} from "@mui/material";
import { Wifi, LocalParking, Spa, SportsGolf, SportsTennis, Star } from "@mui/icons-material";
import { baseUrl } from "../../services/api/config";
import { FavoritesContext } from "../../context/Booking";
import { UserContext } from "../../context/User";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";

const HotelesLista = ({ filters }) => { 
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const {addToFavorites} = useContext(FavoritesContext)
  useEffect(() => {
    fetch(`${baseUrl}/hotels`)
      .then((res) => res.json())
      .then((response) => {
        setHotels(response);
      })
      .catch((error) => console.error("Error al obtener hoteles:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesName = hotel.name.toLowerCase().includes(filters.company.toLowerCase());
      const matchesPrice = hotel.cost >= filters.cost_range[0] && hotel.cost <= filters.cost_range[1];
      const matchesWifi = filters.wifi ? hotel.wifi === (filters.wifi === "true") : true;
      const matchesParking = filters.parking ? hotel.parking === (filters.parking === "true") : true;
      const matchesSports = filters.sports ? hotel.sports === (filters.sports === "true") : true;

      return matchesName && matchesPrice && matchesWifi && matchesParking && matchesSports;
    });
  }, [filters, hotels]);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
  
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h2" textAlign="center" gutterBottom>
        Resultados de hoteles
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                <Card sx={{ 
                  p: 2, boxShadow: 3, transition: "0.3s", 
                  "&:hover": { boxShadow: 6 }
                }}>
                  <img src={hotel.photo} alt={hotel.name} style={{
                    width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px"
                  }} />
                  
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">{hotel.name}</Typography>

                    <Box sx={{ display: "flex", mb: 1 }}>
                      {Array.from({ length: hotel.stars }).map((_, index) => (
                        <Star key={index} color="primary" />
                      ))}
                    </Box>

                    <Typography variant="subtitle1" color="textSecondary">
                      {hotel.city}, {hotel.country}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {hotel.address}, Check-in: {hotel.check_in}, Check-out: {hotel.check_out}
                    </Typography>

                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ${hotel.cost} por noche
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                      {hotel.wifi && <Chip icon={<Wifi />} label="WiFi Gratis" color="success" />}
                      {hotel.parking && <Chip icon={<LocalParking />} label="Parking" color="primary" />}
                      {hotel.spa && <Chip icon={<Spa />} label="Spa" color="secondary" />}
                      {hotel.golf && <Chip icon={<SportsGolf />} label="Golf" color="warning" />}
                      {hotel.sports && <Chip icon={<SportsTennis />} label="Deportes" color="error" />}
                    </Box>

                    <Button onClick={() => {
                      if (isEmpty(user)) {
                        alert("Debes iniciar sesión para reservar un hotel."); 
                        navigate("/login");
                      } else {
                        addToFavorites(hotel.id, hotel.name, "Hotel");
                      }
                    }}variant="contained" color="primary" sx={{ marginTop: 2, width: "100%" }}>
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography textAlign="center" color="textSecondary" sx={{ width: "100%" }}>
              No se encontraron hoteles con los filtros aplicados.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default HotelesLista;
