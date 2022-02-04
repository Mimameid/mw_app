import React, { useState } from 'react';

import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';

function ServiceTypeToggle() {
  const [serviceType, setServiceType] = useState('delivery');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <ToggleButtonGroup
        sx={{
          boxShadow: (theme) => theme.shadows[1],
        }}
        color="primary"
        value={serviceType}
        exclusive
        onChange={(event, value) => {
          if (value) {
            setServiceType(value);
          }
        }}
        size="small"
      >
        <ToggleButton
          sx={{
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
          value="delivery"
        >
          Lieferung
        </ToggleButton>

        <ToggleButton
          sx={{
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
          value="pickup"
        >
          Abholung
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default ServiceTypeToggle;
