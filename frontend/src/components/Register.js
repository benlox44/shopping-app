import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    const invalidExtensions = ['comm', 'con', 'cm', 'cmo','cll'];
    const domainExtension = email.split('.').pop().toLowerCase();
  
    return emailRegex.test(email) && !invalidExtensions.includes(domainExtension);
  }

  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        setCurrentPage('home');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Error al registrar usuario. Intenta nuevamente más tarde.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!validateEmail(email)) {
      setError('Correo electrónico no válido');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    register(name, email, password);
  };

  return (
    <Card style={{  padding: '24px', maxWidth: '350px', margin: 'auto', marginTop: '50px', borderRadius: '16px' }}>
      <CardContent>
        <Typography variant="h4"style={{ marginBottom: '24px'}} gutterBottom>Crea una cuenta</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Registrarse
          </Button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Typography>
            ¿Ya tienes una cuenta?{' '}
            <Button color="primary" onClick={() => setCurrentPage('login')}>Inicia Sesión</Button>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;