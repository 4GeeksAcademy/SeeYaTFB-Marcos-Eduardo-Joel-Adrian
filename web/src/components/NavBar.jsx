import * as React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Badge,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import DeleteIcon from "@mui/icons-material/Delete";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import isEmpty from "lodash/isEmpty";

import { UserContext } from "../context/User";
import { FavoritesContext } from "../context/Booking";

const pages = [
  { link: "Hoteles", href: "/hotels" },
  { link: "Vuelos", href: "/flights" },
  { link: "Coches", href: "/cars" },
];

const NavBar = () => {
  const { favorites = [], deleteFavorite } = useContext(FavoritesContext);
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleOpenMenu = (menu) => (event) =>
    setMenuAnchor({ menu, anchor: event.currentTarget });
  const handleCloseMenu = () => setMenuAnchor(null);

  const isAuthenticated = !isEmpty(user);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c387e" }}>
      <Container sx={{ minWidth: "100%" }}>
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SeeYa!
          </Typography>

          {/* Menú Hamburguesa (Responsive) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenMenu("nav")} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor?.menu === "nav" ? menuAnchor.anchor : null}
              open={menuAnchor?.menu === "nav"}
              onClose={handleCloseMenu}
            >
              {pages.map(({ link, href }) => (
                <MenuItem key={link} onClick={handleCloseMenu}>
                  <Typography component={Link} to={href} sx={{ textDecoration: "none", color: "inherit" }}>
                    {link}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Links del Navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ link, href }) => (
              <Button key={link} component={Link} to={href} sx={{ my: 2, color: "white" }}>
                {link}
              </Button>
            ))}
          </Box>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <IconButton color="inherit" onClick={handleOpenMenu("favorites")}>
                <Badge
                  badgeContent={favorites.length}
                  color="secondary"
                  sx={{ "& .MuiBadge-badge": { fontSize: "0.75rem", minWidth: "18px", height: "18px" } }}
                >
                  <CardTravelIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={menuAnchor?.menu === "favorites" ? menuAnchor.anchor : null}
                open={menuAnchor?.menu === "favorites"}
                onClose={handleCloseMenu}
                sx={{ mt: 1 }}
                PaperProps={{ sx: { borderRadius: 2, boxShadow: 3, minWidth: 250, p: 1 } }}
              >
                {!isEmpty(favorites) ? (
                  favorites.map((fav, index) => (
                    <MenuItem key={index} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <Typography component={Link} to={fav.href} sx={{ textDecoration: "none", color: "text.primary", fontWeight: 600 }}>
                          {fav.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.85rem", color: "gray" }}>
                          {fav.type}
                        </Typography>
                      </Box>
                      <IconButton size="small" color="error" onClick={() => deleteFavorite(fav.external_id, fav.type)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem sx={{ textAlign: "center", justifyContent: "center", py: 2 }}>No hay favoritos</MenuItem>
                )}
              </Menu>
            </Box>
          )}

          {/* Usuario */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleOpenMenu("user")} size="small">
                  <Avatar sx={{ width: 36, height: 36, border: "2px solid white" }} src={user.photo} />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor?.menu === "user" ? menuAnchor.anchor : null}
                  open={menuAnchor?.menu === "user"}
                  onClose={handleCloseMenu}
                  sx={{ mt: 1 }}
                  PaperProps={{ sx: { borderRadius: 2, boxShadow: 3, minWidth: 150, p: 1 } }}
                >
                  <MenuItem onClick={()=>{ navigate("/profile"); handleCloseMenu()}}>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={() => { logout(); handleCloseMenu(); }} sx={{ color: "error.main" }}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" onClick={() => navigate("/login")} sx={{ backgroundColor: "#00b0ff", color: "white", fontWeight: 500, borderRadius: 2, px: 3 }}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
