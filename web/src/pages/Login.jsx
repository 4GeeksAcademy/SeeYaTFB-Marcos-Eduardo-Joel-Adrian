import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserContext } from "../context/User";

const Login = () => {
  const { login } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      setError(error.message || "Error al iniciar sesión.");
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
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: "white", mb: 8, textAlign: "center" }}
      >
        ¡Regístrate para empezar a viajar! ✈️🌍
      </Typography>

      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
            Inicia Sesión
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Correo electrónico"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={credentials.password}
              onChange={handleChange}
            />

            {error && (
              <Typography color="error" sx={{ mt: 1, mb: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2 }}>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
              Regístrate aquí
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
