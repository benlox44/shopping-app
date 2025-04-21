import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const Logo = styled('img')({
  width: '70px',
  height: 'auto',
});

const Header = ({ currentPage, setCurrentPage, cart, isAuthenticated, logout }) => (
  <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
      <Logo src="/logo3.png" alt="Logo" />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', marginLeft: '50px' }}>
          CursosOnline
        </Typography>
        <Button color="inherit" onClick={() => setCurrentPage('home')}>Cursos</Button>
        <IconButton color="inherit" onClick={() => setCurrentPage('cart')}>
          <Badge badgeContent={cart ? cart.length : 0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => setCurrentPage('UpdateProfile')}>Actualizar perfil</Button>
            <Button color="inherit" onClick={() => setCurrentPage('Profile')}>Perfil</Button>
            <Button color="inherit" onClick={logout}>Cerrar Sesión</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => setCurrentPage('login')}>Iniciar Sesión</Button>
            <Button color="primary" variant="contained" onClick={() => setCurrentPage('register')}>Registrarse</Button>
          </>
        )}
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;