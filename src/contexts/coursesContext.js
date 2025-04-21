import React, { createContext, useState, useEffect } from 'react';

export const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [ownedCourses, setOwnedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3002/courses');
        if (!response.ok) {
          throw new Error('Error al obtener los cursos');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
        alert('Hubo un problema al cargar los cursos. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, ownedCourses, setOwnedCourses, loading }}>
      {children}
    </CoursesContext.Provider>
  );
};
