import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const RequestPasswordReset = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch('http://localhost:3001/users/requestPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Se ha enviado un enlace a tu correo para restablecer tu contraseña.');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Error al enviar la solicitud. Intenta nuevamente más tarde.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    requestPasswordReset(email);
  };

  return (
    <Card style={{ padding: '24px', maxWidth: '400px', margin: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginTop: '50px', borderRadius: '16px' }}>
      <CardContent>
        <Typography variant="h4" style={{ marginBottom: '24px' }}>
          ¿Olvidó su contraseña?
          </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="success">{successMessage}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
          <Button variant="contained" style={{ backgroundColor: '#DBB186', color: '#fff' }} type="submit">
            Enviar solicitud
          </Button>
        </form>
        <Typography style={{ marginTop: '16px' }}>
          ¿Recibiste el enlace?{' '}
          <Button color="primary" onClick={() => setCurrentPage('login')}>Inicia sesión</Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RequestPasswordReset;