import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const CourseCard = ({ course, addToCart, setSelectedCourse, setCurrentPage, ownedCourses }) => {
  const isOwned = ownedCourses.includes(course.id);

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3,
      },
    }}>
      <CardMedia
        component="img"
        height="200"
        image={course.imageUrl}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Categoría: {course.category}
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 'auto' }}>
          Precio: ${course.price}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        {isOwned ? (
          <Button variant="contained" color="success" fullWidth disabled>
            Curso en posesión
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => addToCart(course)}
            sx={{ mb: 1 }}
          >
            Añadir al carrito
          </Button>
        )}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => { setSelectedCourse(course); setCurrentPage('details'); }}
        >
          Ver detalles
        </Button>
      </Box>
    </Card>
  );
};

export default CourseCard;