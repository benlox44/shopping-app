import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PurchaseSuccess = () => {
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
        <Typography variant="h4" color="primary" gutterBottom>
          Compra Exitosa
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          ¡Felicidades! Tu compra se ha realizado exitosamente. Los detalles de tu compra han sido enviados a tu correo electrónico.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={goToCourses}
          style={{ marginTop: '20px' }}
        >
          Volver a Cursos
        </Button>
      </CardContent>
    </Card>
  );
};

export default PurchaseSuccess;
