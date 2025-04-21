import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PurchaseList = ({ purchases }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderSelect = (order) => {
    setSelectedOrder(selectedOrder === order ? null : order);
  };

  return (
    <Box sx={{ mt: 3 }}>
      {purchases.length === 0 ? (
        <Typography>No tienes compras.</Typography>
      ) : (
        <List sx={{ padding: 0 }}>
          {purchases.map((order, idx) => (
            <ListItem
              key={idx}
              sx={{
                cursor: 'pointer',
                borderBottom: `1px solid #E0E0E0`,
                '&:hover': { backgroundColor: '#EEEEEE' },
                padding: 2,
                borderRadius: 2,
                mb: 1,
              }}
              onClick={() => handleOrderSelect(order)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="body1" sx={{ color: '#1976D2' }}>ID Compra: {order.order_id}</Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>${order.total_price.toFixed(2)}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {selectedOrder && (
        <Accordion sx={{ mt: 3, backgroundColor: '#F5F5F5' }} expanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Detalles: {selectedOrder.order_id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total: ${selectedOrder.total_price.toFixed(2)}</Typography>
            <List>
              {selectedOrder.courses.map((course, idx) => (
                <ListItem key={idx}>
                  <Typography>Curso ID: {course.course_id} - Precio: ${course.price}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default PurchaseList;
