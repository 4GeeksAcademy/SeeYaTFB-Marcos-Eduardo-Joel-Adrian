import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, Box, Autocomplete, IconButton } from "@mui/material";
import { Search, SwapHoriz } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const airports = [
  { label: "Madrid (MAD)", code: "MAD" },
  { label: "Barcelona (BCN)", code: "BCN" },
  { label: "New York (JFK)", code: "JFK" },
];

export default function SeekerForFlights() {
  const [tripType, setTripType] = useState("round-trip");
  const [bags, setBags] = useState(0);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("economy");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 1000, mx: "auto", bgcolor: "#fff", p: 2, borderRadius: 3, boxShadow: 1 }}>

        {/* Header con opciones */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, px: 1 }}>
          <Select value={tripType} onChange={(e) => setTripType(e.target.value)} size="small" variant="standard">
            <MenuItem value="round-trip">Ida y vuelta</MenuItem>
            <MenuItem value="one-way">Solo ida</MenuItem>
          </Select>

          <Select value={bags} onChange={(e) => setBags(e.target.value)} size="small" variant="standard">
            {[0, 1, 2, 3].map((b) => (
              <MenuItem key={b} value={b}>{b} maleta{b !== 1 ? "s" : ""}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* Buscador principal */}
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f8f9fa", p: 1, borderRadius: 3 }}>
          
          {/* Origen */}
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => option.label}
            value={from}
            onChange={(event, newValue) => setFrom(newValue)}
            renderInput={(params) => <TextField {...params} label="Origen" variant="standard" />}
            sx={{ width: 200 }}
          />

          {/* Ícono de intercambio */}
          <IconButton size="small" onClick={() => { const temp = from; setFrom(to); setTo(temp); }}>
            <SwapHoriz />
          </IconButton>

          {/* Destino */}
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => option.label}
            value={to}
            onChange={(event, newValue) => setTo(newValue)}
            renderInput={(params) => <TextField {...params} label="Destino" variant="standard" />}
            sx={{ width: 200 }}
          />

          {/* Fecha de salida */}
          <DatePicker
            label="Salida"
            value={departureDate}
            onChange={(newDate) => setDepartureDate(newDate)}
            disablePast
            renderInput={(params) => <TextField {...params} variant="standard" sx={{ mx: 2, width: 130 }} />}
          />

          {/* Fecha de regreso */}
          {tripType === "round-trip" && (
            <DatePicker
              label="Regreso"
              value={returnDate}
              onChange={(newDate) => setReturnDate(newDate)}
              disablePast
              minDate={departureDate} // No permite elegir una fecha anterior a la de salida
              renderInput={(params) => <TextField {...params} variant="standard" sx={{ mx: 2, width: 130 }} />}
            />
          )}

          {/* Pasajeros y clase */}
          <Select value={passengers} onChange={(e) => setPassengers(e.target.value)} size="small" variant="standard">
            {[1, 2, 3, 4, 5].map((p) => (
              <MenuItem key={p} value={p}>{p} adulto{p > 1 ? "s" : ""}</MenuItem>
            ))}
          </Select>

          <Select value={classType} onChange={(e) => setClassType(e.target.value)} size="small" variant="standard">
            <MenuItem value="economy">Turista</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="first">Primera Clase</MenuItem>
          </Select>

          {/* Botón de búsqueda */}
          <Button variant="contained" color="warning" sx={{ ml: 2 }}>
            <Search />
          </Button>

        </Box>
      </Box>
    </LocalizationProvider>
  );
}
