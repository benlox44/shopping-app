import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            email: data.email,
            password: '',
            confirmPassword: '',
          });
        } else {
          setError('Error al cargar el perfil del usuario. Intenta nuevamente más tarde.');
        }
      } catch (error) {
        setError('Error al cargar el perfil del usuario. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const invalidExtensions = ['comm', 'con', 'cm', 'cmo', 'cll'];
    const domainExtension = email.split('.').pop().toLowerCase();

    return emailRegex.test(email) && !invalidExtensions.includes(domainExtension);
  };

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users/updateProfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          newEmail: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert('Perfil actualizado con éxito');
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          setError('El correo ya está en uso. Por favor, intenta con otro.');
        } else {
          setError(errorData.message);
        }
      }
    } catch (error) {
      setError('Error al actualizar perfil. Intenta nuevamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && !validateEmail(formData.email)) {
      setError('Correo electrónico no válido.');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    updateProfile();
  };

  if (loading) {
    return <Typography>Cargando perfil...</Typography>;
  }

  return (
    <Card style={{ padding: '24px', maxWidth: '350px', margin: 'auto', marginTop: '50px', borderRadius: '16px' }}>
      <CardContent>
        <Typography variant="h4" style={{ marginBottom: '24px'}} gutterBottom>Editar Perfil</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField label="Nombre" type="text" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Correo electrónico" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <TextField label="Nueva Contraseña (opcional)" type="password" name="password" value={formData.password} onChange={handleChange} />
          <TextField label="Confirmar Contraseña" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          <Button variant="contained" color="primary" type="submit">Actualizar Perfil</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfile;
