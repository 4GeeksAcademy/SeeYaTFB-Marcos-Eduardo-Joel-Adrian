import React, { useState,useContext } from "react";
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
import { useNavigate } from "react-router";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {login}=useContext(UserContext)
  const navigate = useNavigate()
  
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
  
    const result = await login(credentials.email, credentials.password);
  
    if (result.success) {
      alert("Inicio de sesión exitoso");
      navigate("/");
    } else {
      setError(result.message);
    }
  
    setLoading(false);
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

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Correo electrónico"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              required
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
              onChange={handleChange}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Ingresar"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
