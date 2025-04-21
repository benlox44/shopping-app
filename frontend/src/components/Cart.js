import React from 'react';
import { Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

const Cart = ({ cart, removeFromCart, loadingCart, setCurrentPage }) => {
  if (loadingCart) {
    return <CircularProgress />;
  }

  if (!cart || cart.length === 0) {
    return (
      <Box sx={{ margin: '40px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Tu carrito está vacío</Typography>
        <img
          src="/carrito-vacio.png"
          alt="Carrito vacío"
          style={{ maxWidth: '300px', marginBottom: '20px' }}
        />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Parece que aún no has agregado nada a tu carrito.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage('home')}
        >
          Ver cursos
        </Button>
      </Box>
    )
  }

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión o registrarte para continuar con la compra.');
      return;
    }

    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

      const response = await fetch("http://localhost:3003/purchase/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          totalAmount,
          courses: cart,
        }),
      });

      const data = await response.json();
      if (data.url && data.token) {
        window.location.href = `${data.url}?token_ws=${data.token}`;
      }
    } catch (error) {
      console.error("Error iniciando transacción:", error);
    }
  };  

  return (
    <Box sx={{ margin: '40px' }}>
      <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
      {cart.map(item => (
        <Card key={item.id} sx={{ marginBottom: '16px', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body1" color="textSecondary">Precio: ${item.price}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => removeFromCart(item.id)}
              sx={{ marginTop: '8px' }}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h6" sx={{ marginTop: '16px' }}>
        Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}> {}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ transition: 'background-color 0.3s' }}
        >
          Continuar con la compra
        </Button>
      </Box>
    </Box>
  );
};
export default Cart;
