import React from "react";
import {
  Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Radio, RadioGroup, Grid, Card, CardContent, InputAdornment, Rating
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";

const BuscadorCoches = ({ filters, setFilters }) => {
  if (!setFilters) {
    console.error("ERROR: setFilters no se pasó correctamente a BuscadorCoches.");
    return null;
  }

  const handleChange = (event) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleRatingChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, punctuation: newValue }));
  };

  const handleSearch = () => {
    console.log("Filtros aplicados:");
    setFilters(prev => { console.log(prev); return prev; });
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Buscar Coches
      </Typography>

      <Card sx={{ maxWidth: 600, mx: "auto", mt: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Empresa */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="company"
                label="Empresa"
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

            {/* Marca */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="brand"
                label="Marca"
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DirectionsCarIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Tipo de combustible */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Combustible</InputLabel>
                <Select name="fuel_type" value={filters.fuel_type || ""} onChange={handleChange}>
                  <MenuItem value="gasolina">Gasolina</MenuItem>
                  <MenuItem value="diesel">Diésel</MenuItem>
                  <MenuItem value="electrico">Eléctrico</MenuItem>
                  <MenuItem value="hibrido">Híbrido</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Precio máximo */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="cost"
                label="Precio Máximo (€)"
                type="number"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            {/* Automático */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography>
                  <CheckCircleOutlineIcon color="primary" /> Transmisión Automática
                </Typography>
                <RadioGroup row name="automatic" onChange={handleChange}>
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Recogida en aeropuerto */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography>
                  <FlightTakeoffIcon color="primary" /> Recogida en Aeropuerto
                </Typography>
                <RadioGroup row name="airport_take" onChange={handleChange}>
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Puntuación mínima (Estrellas) */}
            <Grid item xs={12}>
              <Typography component="legend">Puntuación mínima</Typography>
              <Rating
                name="punctuation"
                value={filters.punctuation || 0}
                onChange={handleRatingChange}
                precision={1}
              />
            </Grid>

            {/* Garantía */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography>
                  <VerifiedUserIcon color="primary" /> Garantía
                </Typography>
                <RadioGroup row name="guarantee" onChange={handleChange}>
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Seguro incluido */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography>
                  <SecurityIcon color="primary" /> Seguro incluido
                </Typography>
                <RadioGroup row name="insurance" onChange={handleChange}>
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Botón de búsqueda */}
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" sx={{ backgroundColor: "#2c387e", color: "white" }} onClick={handleSearch} size="large">
                Buscar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BuscadorCoches;
