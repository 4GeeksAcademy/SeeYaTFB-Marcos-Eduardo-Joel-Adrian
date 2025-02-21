import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
  CircularProgress,
  Grid,
  Input,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country: "",
    city: "",
    address: "",
    phone_number: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      alert("Registro exitoso! ✅✈️");
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" sx={{marginTop: 4, marginBottom: 4}}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
            Crea tu cuenta y empieza a viajar
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Usuario" name="user_name" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nombre" name="first_name" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Apellidos" name="last_name" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Correo" type="email" name="email" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Contraseña" type="password" name="password" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="País" name="country" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Ciudad" name="city" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Dirección" name="address" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Teléfono" name="phone_number" type="tel" required onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Foto de Perfil:</Typography>
                <Input type="file" accept="image/*" onChange={handlePhotoChange} fullWidth />
              </Grid>
            </Grid>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Registrarse"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
