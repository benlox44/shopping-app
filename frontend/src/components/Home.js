import React, { useState, useMemo } from 'react';
import CourseCard from './CourseCard';
import { Typography, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Grid, Box, Button, Container, TextField } from '@mui/material';
import '../styles/Home.css';
import ChatBot from './chat';

const Home = ({ courses, addToCart, setSelectedCourse, setCurrentPage, filter, setFilter, filteredCourses, ownedCourses }) => {
  const [currentPage, setCurrentPageState] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const coursesPerPage = 9;

  const filteredAndSortedCourses = useMemo(() => {
    let result = filteredCourses;

    // Busqueda
    result = result.filter(course =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Categoría
    if (filter.category && filter.category !== 'all') {
      result = result.filter(course => course.category === filter.category);
    }

    // Ordenar
    if (filter.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filter.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filter.sort === 'alpha') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [filteredCourses, filter, searchTerm]);


  const displayedCourses = filteredAndSortedCourses.slice(
    currentPage * coursesPerPage,
    (currentPage + 1) * coursesPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * coursesPerPage < filteredAndSortedCourses.length) {
      setCurrentPageState(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPageState(prev => prev - 1);
    }
  };

  const handleToggleShowOwned = () => {
    setFilter(prev => ({ ...prev, showOwned: !prev.showOwned }));
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/creativa.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '60px 0',
          marginBottom: '40px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Tu viaje educativo comienza aquí
        </Typography>
        <Typography variant="h6">
          Descubre una amplia gama de cursos para impulsar tu carrera y creatividad
        </Typography>
      </Box>

      <Box sx={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">Cursos Disponibles</Typography>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
              label="Categoría"
            >
              <MenuItem value="all">Todas las categorías</MenuItem>
              <MenuItem value="Programación">Programación</MenuItem>
              <MenuItem value="Diseño">Diseño</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Fotografía">Fotografía</MenuItem>
              <MenuItem value="Gastronomía">Gastronomía</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small">
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={filter.sort}
              onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
              label="Ordenar por"
            >
              <MenuItem value="default">Por defecto</MenuItem>
              <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
              <MenuItem value="alpha">Alfabéticamente</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ marginBottom: '24px' }}>
        <TextField
          label="Buscar curso"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={filter.showOwned}
            onChange={handleToggleShowOwned}
          />
        }
        label="Mostrar solo en posesión"
      />

      <Grid container spacing={3} sx={{ marginTop: '24px' }}>
        {displayedCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard
              course={course}
              addToCart={addToCart}
              setSelectedCourse={setSelectedCourse}
              setCurrentPage={setCurrentPage}
              ownedCourses={ownedCourses}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
          variant="outlined"
          sx={{ marginRight: '8px' }}
        >
          Anterior
        </Button>
        <Button
          onClick={nextPage}
          disabled={(currentPage + 1) * coursesPerPage >= filteredAndSortedCourses.length}
          variant="contained"
        >
          Siguiente
        </Button>
      </Box>

      <ChatBot />
    </Container>
  );
};

export default Home;
