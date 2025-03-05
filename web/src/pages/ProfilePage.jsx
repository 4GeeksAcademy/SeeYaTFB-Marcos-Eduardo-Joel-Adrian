import React, { useContext, useState, useEffect } from "react";
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
import { UserContext } from "../context/User";
import PersonIcon from "@mui/icons-material/Person";
import { uploadPhoto } from "../services/api/config";

const ProfilePage = () => {
  const { user, editUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [first_name, setFirstName] = useState(user?.first_name || "");
  const [last_name, setLastName] = useState(user?.last_name || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone_number, setPhoneNumber] = useState(user?.phone_number || "");
  const [photo, setPhoto] = useState(null);

  // Sincronizar el estado cuando `user` cambia
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setCountry(user.country || "");
      setCity(user.city || "");
      setAddress(user.address || "");
      setPhoneNumber(user.phone_number || "");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    setLoading(true);
    setError("");
    uploadPhoto(photo).then((data)=>{
      editUser(username, email, first_name, last_name, country, city, address, phone_number, data);
     })
    
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
      <Container maxWidth="sm" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
            Editar perfil
          </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Usuario"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={first_name}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="País"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  type="tel"
                  value={phone_number}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Foto de Perfil:</Typography>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  fullWidth
                />
              </Grid>
            </Grid>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={()=>handleSubmit()}
            >
              {loading ? <CircularProgress size={24} /> : "Actualizar Perfil"}
            </Button>
         
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
