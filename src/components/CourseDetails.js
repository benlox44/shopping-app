import React from 'react';
import { Card, CardContent, Typography, Button, Box, Snackbar, Alert } from '@mui/material';

const CourseDetails = ({ selectedCourse, addToCart, setCurrentPage, ownedCourses }) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // Verificar si el curso ya está en posesión del usuario
  const isOwned = ownedCourses.includes(selectedCourse.id);

  const handleAddToCart = async () => {
    try {
      await addToCart(selectedCourse);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('El curso ya está en tu posesión');
        setOpen(true);
      } else {
        setErrorMessage('Hubo un problema al añadir el curso al carrito');
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ padding: '16px', marginBottom: '16px', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{selectedCourse.title}</Typography>
        <Typography variant="body1" gutterBottom><strong>Categoría:</strong> {selectedCourse.category}</Typography>
        <Typography variant="h6" color="textSecondary"><strong>Precio:</strong> ${selectedCourse.price}</Typography>
        <Box dangerouslySetInnerHTML={{ __html: selectedCourse.description }} sx={{ marginTop: '16px', marginBottom: '16px' }} />
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        {isOwned ? (
          <Button variant="contained" color="success" disabled>
            Curso en posesión
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Añadir al carrito
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={() => setCurrentPage('home')}>
          Volver a cursos
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CourseDetails;
