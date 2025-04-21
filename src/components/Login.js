import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import '../styles/Login.css';

const Login = ({ setCurrentPage, fetchCart }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [courseImages, setCourseImages] = useState([]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        setCurrentPage('home');
        await fetchCart(token);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setErrorMessage('Error al intentar iniciar sesión. Intenta nuevamente más tarde.');
    }
  };

  const fetchCourseImages = async () => {
    try {
      const response = await fetch('http://localhost:3002/courses'); 
      if (response.ok) {
        const courses = await response.json();
        const images = courses.map(course => course.imageUrl); 
        setCourseImages(images);
      }
    } catch (error) {
      console.error('Error al obtener las imágenes de los cursos:', error);
    }
  };

  useEffect(() => {
    fetchCourseImages();
  }, []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '500px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}>
        <div className="image-container">
          {[...courseImages, ...courseImages].map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Curso ${index}`} className="course-image" />
          ))}
        </div>
        <div className="image-container reverse">
          {[...courseImages, ...courseImages].map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Curso ${index}`} className="course-image" />
          ))}
        </div>
      </div>
      <Card style={{ padding: '24px', maxWidth: '400px', margin: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginTop: '50px', borderRadius: '16px' }}>
        <CardContent>
          <Typography variant="h4" style={{ marginBottom: '24px' }}>Iniciar Sesión</Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <form onSubmit={(e) => { e.preventDefault(); login(e.target.email.value, e.target.password.value); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField label="Email" type="email" name="email" required />
            <TextField label="Contraseña" type="password" name="password" required />
            <div className="forgot">
              <a href="#" onClick={() => setCurrentPage('requestPasswordReset')}>Recuperar contraseña</a>
            </div>
            <Button variant="contained" style={{ backgroundColor: '#DBB186', color: '#fff' }}  type="submit">
              Iniciar Sesión
            </Button>
          </form>
          <Typography style={{ marginTop: '16px' }}>
            ¿No tienes una cuenta?{' '}
            <Button color="primary" onClick={() => setCurrentPage('register')}>Regístrate</Button>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;