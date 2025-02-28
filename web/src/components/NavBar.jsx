import * as React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import isEmpty from 'lodash/isEmpty'; // 
import { UserContext } from '../context/User';

const pages = [
  { link: 'Hoteles', href: '/hoteles' },
  { link: 'Vuelos', href: '/vuelos' },
  { link: 'Coches', href: '/coches' },
  { link: 'Excursiones', href: '/excursiones' }
];

const NavBar = () => {
  const { logout, user } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c387e' }}>
      <Container sx={{ minWidth: '100%' }}>
        <Toolbar disableGutters>
          {/* Logo grande */}
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

          {/* Menú hamburguesa (Móvil) */}
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

          {/* Logo pequeño (Móvil) */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SeeYa!
          </Typography>

          {/* Menú de navegación */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.link} component={Link} to={page.href} sx={{ my: 2, color: 'white' }}>
                {page.link}
              </Button>
            ))}
          </Box>

          {/* Botón de Login/Logout */}
          <Box sx={{ flexGrow: 0 }}>
            {isEmpty(user) ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#00b0ff" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={(event) => {
                  event.preventDefault();
                  logout();
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
