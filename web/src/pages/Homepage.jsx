import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const vuelosImages = [
  "https://res.cloudinary.com/duargmvav/image/upload/v1741204931/v5b4jvz6txlobq99tqvh.jpg",
  "https://res.cloudinary.com/duargmvav/image/upload/v1741204878/jlriou7zbsu4gstk4ijg.webp",
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205021/na0bjafguheyivksn9os.jpg",
];

const hotelesImages = [
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205066/azug5ad5kux4dwhazrid.jpg",
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205130/wzzyjlpjo0l2pmplzebh.jpg",
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205160/vrywnykwb54guak5q3my.jpg",
];

const cochesImages = [
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205229/kfbh6odp9gliein1egim.webp",
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205264/kizg30vdndo3ezfgkopv.jpg",
  "https://res.cloudinary.com/duargmvav/image/upload/v1741205288/u8skwzgrpc726f7nlubo.jpg",
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Carrusel = ({ images, title, link }) => (
  <Box sx={{ maxWidth: 800, mx: "auto", mb: 5 }}>
    <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "10px" }}>{title}</h2>
    <Slider {...settings}>
      {images.map((image, index) => (
        <Box key={index} sx={{ textAlign: "center" }}>
          <Link to={link} style={{ textDecoration: "none" }}>
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              style={{
                width: "100%",
                maxHeight: "400px",
                borderRadius: "8px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </Link>
        </Box>
      ))}
    </Slider>
  </Box>
);

const Homepage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Sección de bienvenida */}
      <Container sx={{ bgcolor: "#2196f3", maxWidth: "100% !important", padding: 5 }}>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <img src="/img/logosolo.png" alt="logo" style={{ width: "70%" }} />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left", color: "white" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: "bold" }}>
              Bienvenido {user.username || "a Seeya!"}
            </h2>
            <h4 style={{ fontSize: "2.3rem", fontWeight: "bold" }}>
              ¡Aquí encontrarás todo lo necesario para tus vacaciones sin levantarte de la SeeYa!
            </h4>
          </Grid>
        </Grid>
      </Container>

      {/* Sección de carruseles */}
      <Container sx={{ bgcolor: "white", maxWidth: "100% !important", padding: 5 }}>
        <Carrusel images={vuelosImages} title="Vuelos" link="/flights" />
        <Carrusel images={hotelesImages} title="Hoteles" link="/hotels" />
        <Carrusel images={cochesImages} title="Coches" link="/cars" />
      </Container>

      {/* Sección de registro */}
      <Container sx={{ bgcolor: "#2196f3", maxWidth: "100% !important", padding: 5 }}>
        <h4 style={{ fontSize: "2.3rem", fontWeight: "bold", color: "white", textAlign: "center" }}>
          ¡Regístrate y comienza tu aventura!
        </h4>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#00568D",
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            ¡Únete ahora!
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
