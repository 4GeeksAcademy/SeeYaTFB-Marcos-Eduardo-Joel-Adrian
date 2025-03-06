import { useState, useEffect, useMemo,useContext } from "react";
import { Button, Card, CardContent, Input, Typography, CircularProgress, Alert, Chip } from "@mui/material";
import { Wifi, LocalParking, Spa, SportsGolf, SportsTennis, Star } from "@mui/icons-material";
import { baseUrl } from "../../services/api/config";
import { FavoritesContext } from "../../context/Booking";


const HotelesLista = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const {addToFavorites}= useContext(FavoritesContext)
 useEffect(() => {
    fetch(
      `${baseUrl}/hotels`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((response) => {
        setHotels(response);
      });
  },[]);

  const filteredHotels = useMemo(
    () => hotels.filter(hotel => hotel.name.toLowerCase().includes(search.toLowerCase())),
    [search, hotels]
  );

  

  return (
    
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="p-4 shadow-lg">
              <img src={hotel.photo} alt={hotel.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <CardContent>
                <Typography variant="h6">{hotel.name}</Typography>
                
                {/* Estrellas del hotel */}
                <div className="flex mb-2">
                  {Array.from({ length: hotel.stars }).map((_, index) => (
                    <Star key={index} color="primary" />
                  ))}
                </div>

                <Typography color="textSecondary">
                  {hotel.city}, {hotel.country}
                </Typography>
                
                <Typography color="textSecondary">
                  {hotel.address}, {hotel.check_in}, {hotel.check_out}
                </Typography>

                <Typography color="primary" fontWeight="bold">
                  ${hotel.cost} por noche
                </Typography>

                {/* Servicios del hotel */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {hotel.wifi && <Chip icon={<Wifi />} label="WiFi Gratis" color="success" />}
                  {hotel.parking && <Chip icon={<LocalParking />} label="Parking" color="primary" />}
                  {hotel.spa && <Chip icon={<Spa />} label="Spa" color="secondary" />}
                  {hotel.golf && <Chip icon={<SportsGolf />} label="Golf" color="warning" />}
                  {hotel.sports && <Chip icon={<SportsTennis />} label="Sport" color="error" />}
                </div>

                <Button 
                onClick={()=>
                  addToFavorites(hotel.id,hotel.name,"Hotel")
                }
                variant="contained" color="primary" className="mt-2">
                  Reservar
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="textSecondary">No se encontraron hoteles.</Typography>
        )}
      </div>
    
  );
};

export default HotelesLista;