import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PurchaseFailure = () => {
  useEffect(() => {
    document.querySelector('header').style.display = 'none';
    return () => {
      document.querySelector('header').style.display = 'block';
    };
  }, []);

  const goToCourses = () => {
    window.location.href = 'http://localhost:3000';
  };

  return (
    <Card style={{ padding: '20px', margin: '20px auto', maxWidth: '600px', textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h4" color="error" gutterBottom>
          Compra Fallida
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Lo sentimos, ocurrió un error durante el proceso de compra. Por favor, inténtalo nuevamente más tarde.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={goToCourses}
          style={{ marginTop: '20px' }}
        >
          Volver a Cursos
        </Button>
      </CardContent>
    </Card>
  );
};

export default PurchaseFailure;
