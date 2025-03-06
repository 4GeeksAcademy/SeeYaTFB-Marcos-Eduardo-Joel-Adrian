import React, { useContext, useState } from "react";
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
import { UserContext } from "../context/User";
import { uploadPhoto } from "../services/api/config";

const RegisterPage = () => {
  const { register } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
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

    // Validación de campos obligatorios
    const requiredFields = ["username", "first_name", "email", "password", "country", "city", "address", "phone_number"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError("Por favor, completa todos los campos obligatorios.");
        setLoading(false);
        return;
      }
    }

    try {
      let photoUrl = null;
      if (formData.photo) {
        photoUrl = await uploadPhoto(formData.photo);
      }

      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.first_name,
        formData.last_name,
        formData.country,
        formData.city,
        formData.address,
        formData.phone_number,
        photoUrl
      );
    } catch (err) {
      setError(err.message || "Error al registrarse. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
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
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
            Crea tu cuenta y empieza a viajar ✈️🌍
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: "Usuario", name: "username" },
                { label: "Nombre", name: "first_name" },
                { label: "Apellidos", name: "last_name" },
                { label: "Correo", name: "email", type: "email" },
                { label: "Contraseña", name: "password", type: "password" },
                { label: "País", name: "country" },
                { label: "Ciudad", name: "city" },
                { label: "Dirección", name: "address" },
                { label: "Teléfono", name: "phone_number", type: "tel" },
              ].map((field, index) => (
                <Grid item xs={12} sm={field.name === "address" || field.name === "phone_number" ? 12 : 6} key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    required
                    onChange={handleChange}
                  />
                </Grid>
              ))}

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

export default RegisterPage;
