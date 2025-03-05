import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Slider
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BusinessIcon from "@mui/icons-material/Business";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function HotelesBuscador() {
  const [filters, setFilters] = useState({
    origin_city: "",
    destiny_city: "",
    company: "",
    wifi: "",
    pets: "",
    parking: "",
    sports: "",
    cost_range: [0, 5000]
  });

  const handleChange = (event, newValue) => {
    if (Array.isArray(newValue)) {
      setFilters({ ...filters, cost_range: newValue });
    } else {
      setFilters({ ...filters, [event.target.name]: event.target.value });
    }
  };

  const handleSearch = () => {
    console.log("Filtros aplicados:", filters);
  };

  return (
    <Grid container sx={{ height: "100vh" }} justifyContent="flex-start" alignItems="center">
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 600, ml: "10%" }}>
          <Typography variant="h2" textAlign="center" gutterBottom>
            Buscar Hoteles
          </Typography>

          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="arrival_day"
                    label="Día de llegada"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HotelIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="destiny_city"
                    label="Día de salida"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MeetingRoomIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="company"
                    label="Compañía"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Rango de precio</Typography>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography>€{filters.cost_range[0]}</Typography>
                    <Typography>€{filters.cost_range[1]}</Typography>
                  </Box>
                  <Slider
                    value={filters.cost_range}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5000}
                    step={50}
                    sx={{ color: "primary.main", mt: 2 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography>
                      <WifiIcon color="primary" /> WiFi
                    </Typography>
                    <RadioGroup row name="wifi" onChange={handleChange}>
                      <FormControlLabel value="true" control={<Radio />} label="Sí" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography>
                      <PetsIcon color="primary" /> Mascotas
                    </Typography>
                    <RadioGroup row name="pets" onChange={handleChange}>
                      <FormControlLabel value="true" control={<Radio />} label="Sí" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography>
                      <DirectionsCarIcon color="primary" /> Parking
                    </Typography>
                    <RadioGroup row name="parking" onChange={handleChange}>
                      <FormControlLabel value="true" control={<Radio />} label="Sí" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography>
                      <SportsSoccerIcon color="primary" /> Deportes
                    </Typography>
                    <RadioGroup row name="sports" onChange={handleChange}>
                      <FormControlLabel value="true" control={<Radio />} label="Sí" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Button variant="contained" color="primary" onClick={handleSearch} size="large">
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
