import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useContext, } from 'react';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router';


const Homepage = () => {
    const {user}=useContext(UserContext)
    const navigate=useNavigate()

    return (
        <><Container sx={{ bgcolor: '#2196f3', maxWidth: '100% !important', padding: 5 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <img src="/img/logosolo.png" alt="logo" style={{ width: '70%' }} />
                </Grid>

                <Grid item xs={6} sx={{ textAlign: "left", color: 'white' }}>
                    <h2 style={{ fontSize: "3rem", fontWeight: "bold" }}>Bienvenido {user.username || "a Seeya!"}</h2>
                    <h4 style={{ fontSize: "2.3rem", fontWeight: "bold" }}>
                        ¡Aquí encontrarás todo lo necesario para tus vacaciones sin levantarte de la SeeYa!
                    </h4>
                </Grid>
            </Grid>
        </Container>
        <Container sx={{ bgcolor: 'white', maxWidth: '100% !important', padding: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <Box sx={{ bgcolor: '#E0E0E0', padding: 3, textAlign: 'center', borderRadius: 2 }}>
                            <h3>Vuelos</h3>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ bgcolor: '#E0E0E0', padding: 3, textAlign: 'center', borderRadius: 2 }}>
                            <h3>Hoteles</h3>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ bgcolor: '#E0E0E0', padding: 3, textAlign: 'center', borderRadius: 2 }}>
                            <h3>Desplazamientos</h3>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ bgcolor: '#E0E0E0', padding: 3, textAlign: 'center', borderRadius: 2 }}>
                            <h3>Excursiones</h3>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        
        <Container sx={{ bgcolor: '#2196f3', maxWidth: '100% !important', padding: 5 }}>
            <h4 style={{ fontSize: "2.3rem", fontWeight: "bold", color: "white", textAlign: "center" }}>
                ¡Regístrate y comienza tu aventura!
            </h4>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                <Button 
                    onClick={()=>navigate("/login")}
                    variant="contained" 
                    sx={{
                        backgroundColor: "white",
                        color: "#00568D",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        '&:hover': {
                            backgroundColor: "#e0e0e0",
                        }
                    }}
                >
                    ¡Únete ahora!
                </Button>
            </Box>
        </Container>
        
        
        </>

    );
}

export default Homepage;

