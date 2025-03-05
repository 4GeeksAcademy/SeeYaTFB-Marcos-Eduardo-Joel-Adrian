import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{backgroundColor: '#2c387e', color: "white", py: 3 }}>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", px: 2 }}
      >
        {/* LOGO */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <img src="/img/logosolo.png" alt="Tu Logo" style={{ height: 48 }} />
        </Box>

        {/* Enlaces de marcas */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, color: "#b0bec5" }}>
          {[
            { name: "Booking.com", url: "https://www.booking.com/" },
            { name: "Expedia", url: "https://www.expedia.com/" },
            { name: "Kayak", url: "https://www.kayak.com/" },
            { name: "Skyscanner", url: "https://www.skyscanner.com/" },
            { name: "Rentalcars", url: "https://www.rentalcars.com/" },
            { name: "Airbnb", url: "https://www.airbnb.com/" }
          ].map((link) => (
            <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" sx={{ color: "#b0bec5", textDecoration: "none", fontSize: 14, "&:hover": { color: "white" } }}>
              {link.name}
            </Link>
          ))}
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: { xs: 2, md: 0 }, color: "#b0bec5" }}>
          &copy; {year} SeeYa. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
