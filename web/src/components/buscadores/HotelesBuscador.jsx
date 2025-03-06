import React from "react";
import {
  Box, Typography, TextField, Button, FormControl, FormControlLabel,
  Radio, RadioGroup, Grid, Card, CardContent, InputAdornment, Slider
} from "@mui/material";
import { Hotel, MeetingRoom, Business, Wifi, DirectionsCar, SportsSoccer } from "@mui/icons-material";

const HotelesBuscador = ({ filters, setFilters }) => {
  if (!setFilters) {
    console.error("ERROR: setFilters no se pasó correctamente a BuscadorHoteles.");
    return null;
  }

  const handleChange = (event, newValue) => {
    const { name, value } = event.target || {};

    if (name) {
      setFilters((prev) => ({ ...prev, [name]: value }));
    } else if (Array.isArray(newValue)) { 
      setFilters((prev) => ({ ...prev, cost_range: newValue }));
    }
  };

  return (
    <Box sx={{ width: "95%", p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: "95%", maxWidth: 800 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Buscar Hoteles
        </Typography>

        <Card sx={{ boxShadow: 3, p: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              {/* Fecha de llegada */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="arrival_day"
                  type="date"
                  label="Fecha de llegada"
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Hotel color="primary" /></InputAdornment>,
                  }}
                />
              </Grid>

              {/* Fecha de salida */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="departure_day"
                  type="date"
                  label="Fecha de salida"
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><MeetingRoom color="primary" /></InputAdornment>,
                  }}
                />
              </Grid>

              {/* Nombre del hotel */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="company"
                  label="Nombre del hotel"
                  variant="outlined"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Business color="primary" /></InputAdornment>,
                  }}
                />
              </Grid>

              {/* Rango de precio */}
              <Grid item xs={12}>
                <Typography>Precio: €{filters.cost_range?.[0] ?? 0} - €{filters.cost_range?.[1] ?? 400}</Typography>
                <Slider
                  value={filters.cost_range || [0, 400]}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={400}
                  step={50}
                  sx={{ mt: 2 }}
                />
              </Grid>

              {/* Filtros adicionales */}
              {[{
                label: "WiFi", name: "wifi", icon: <Wifi color="primary" />
              }, {
                label: "Parking", name: "parking", icon: <DirectionsCar color="primary" />
              }, {
                label: "Deportes", name: "sports", icon: <SportsSoccer color="primary" />
              }].map(({ label, name, icon }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <FormControl component="fieldset">
                    <Typography>{icon} {label}</Typography>
                    <RadioGroup row name={name} onChange={handleChange}>
                      <FormControlLabel value="true" control={<Radio />} label="Sí" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default HotelesBuscador;
