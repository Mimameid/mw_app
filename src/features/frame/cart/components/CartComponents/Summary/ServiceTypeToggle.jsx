import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setServiceType } from '../../../index';

import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

function ServiceTypeToggle() {
  const dispatch = useDispatch();
  const serviceType = useSelector((state) => state.frame.cart.serviceType);
  const shop = useSelector((state) => state.shop.shop);

  useEffect(() => {
    dispatch(setServiceType(shop.isDelivery ? 'delivery' : 'pickup'));
  }, [dispatch, shop.isDelivery]);
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
            dispatch(setServiceType(value));
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
          disabled={!shop.isDelivery}
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
          disabled={!shop.isPickup}
          value="pickup"
        >
          Abholung
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default ServiceTypeToggle;
