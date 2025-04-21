import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box, Tabs, Tab } from '@mui/material';
import PurchaseList from './PurchaseList';
import ErrorIcon from '@mui/icons-material/Error';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      try {
        const profileResponse = await fetch('http://localhost:3001/users/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUserData(profileData);
        } else {
          throw new Error('Error al cargar el perfil.');
        }

        const purchasesResponse = await fetch('http://localhost:3001/users/purchases', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (purchasesResponse.ok) {
          const purchasesData = await purchasesResponse.json();
          setPurchases(purchasesData);
        } else {
          throw new Error('Error al cargar las compras.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 2, borderRadius: 2 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Cargando tu perfil...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, p: 2 }}>
      <Card sx={{ width: '100%', textAlign: 'center',maxWidth: 800, p: 3, boxShadow: 6, borderRadius: 3, backgroundColor: '#FAFAFA'}}>
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              alignItems: 'center',
              color: '#3498db',
            }}
          >
            Perfil de Usuario
          </Typography>

          {error ? (
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFCDD2', p: 2, borderRadius: 2, mb: 2 }}>
              <ErrorIcon sx={{ color: '#D32F2F', mr: 2 }} />
              <Typography sx={{ color: '#D32F2F' }}>{error}</Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: '#3498db',
                  color: 'white',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  fontFamily: 'Arial, sans-serif', 
                  marginBottom: 2,
                  margin: '0 auto 16px',
                }}
              >
                {getInitial(userData.name)}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#3498db',
                  fontFamily: 'Courier New, monospace', 
                }}
              >
                Nombre:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                }}
              >
                <strong>{userData.name}</strong>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#3498db',
                  fontFamily: 'Courier New, monospace', 
                }}
              >
                Email:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                }}
              >
                <strong>{userData.email}</strong>
              </Typography>
            </>
          )}

          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            sx={{ mt: 3 }}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Mis Compras" />
          </Tabs>

          {selectedTab === 0 && <PurchaseList purchases={purchases} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
