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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserContext } from "../context/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const { login } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(error.message);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && (
              <Typography color="error" sx={{ mt: 1, mb: 2 }}>
                {errorMessage}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
            >
              Ingresar
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
