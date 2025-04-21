import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Box, TextField } from '@mui/material';

const ResetPassword = ({ setCurrentPage }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const queryParams = new URLSearchParams(location.search); // Obtener URL actual
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token inválido o no proporcionado.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        alert('Contraseña restablecida con éxito');
        navigate('/');
        setCurrentPage('home');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Hubo un error al restablecer la contraseña');
      }
    } catch (error) {
      setErrorMessage('Hubo un error al intentar restablecer la contraseña');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: '16px',
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '24px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Recuperar Contraseña
          </Typography>
          {errorMessage && (
            <Typography color="error" sx={{ marginBottom: '16px' }}>
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              type="password"
              label="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#DBB186',
                padding: '10px 16px',
                width: '100%',
              }}
              type="submit"
            >
              Restablecer contraseña
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
