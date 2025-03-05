import * as React from 'react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Badge, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import DeleteIcon from '@mui/icons-material/Delete';

import isEmpty from 'lodash/isEmpty';

import { UserContext } from '../context/User';
import { FavoritesContext } from '../context/Booking';

const pages = [
  { link: 'Hoteles', href: '/hotels' },
  { link: 'Vuelos', href: '/flights' },
  { link: 'Coches', href: '/cars' },
];

const NavBar = () => {
  const { favorites, deleteFavorite } = useContext(FavoritesContext);
  const { logout, user } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElFavorites, setAnchorElFavorites] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenFavorites = (event) => setAnchorElFavorites(event.currentTarget);
  const handleCloseFavorites = () => setAnchorElFavorites(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c387e' }}>
      <Container sx={{ minWidth: '100%' }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SeeYa!
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Typography component={Link} to={page.href} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {page.link}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.link} component={Link} to={page.href} sx={{ my: 2, color: 'white' }}>
                {page.link}
              </Button>
            ))}
          </Box>
          
          {!isEmpty(user) && (
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <IconButton color="inherit" onClick={handleOpenFavorites}>
                <Badge badgeContent={favorites.length}>
                  <CardTravelIcon />
                </Badge>
              </IconButton>

              <Menu anchorEl={anchorElFavorites} open={Boolean(anchorElFavorites)} onClose={handleCloseFavorites}>
                {!isEmpty(favorites) ? (
                  favorites.map((fav, index) => (
                    <MenuItem key={index}>
                      <Typography component={Link} to={fav.href} sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                        {fav.name}
                      </Typography>
                      <IconButton size="small" color="error" onClick={() => deleteFavorite(fav.external_id, fav.type)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem onClick={handleCloseFavorites}>No hay favoritos</MenuItem>
                )}
              </Menu>
            </Box>
          )}
          
          <Box sx={{ flexGrow: 0 }}>
            {!isEmpty(user) ? (
              <>
                <IconButton onClick={handleOpenUserMenu} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }} src={user.photo} />
                </IconButton>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">Perfil</MenuItem>
                  <MenuItem onClick={() => { logout(); handleCloseUserMenu(); }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" sx={{ backgroundColor: "#00b0ff" }} onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
