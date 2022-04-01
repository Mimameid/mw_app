import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartSumTotal } from 'features/frame/cart';

import { Box, Divider, Stack } from '@mui/material';
import ServiceTypeToggle from './ServiceTypeToggle';
import OrderButton from './OrderButton';

function Summary() {
  const serviceType = useSelector((state) => state.frame.cart.serviceType);
  const cartTotal = useSelector(selectCartSumTotal);
  const locationConditions = useSelector((state) => state.shop.shop.locationConditions);
  const cartItems = useSelector((state) => state.frame.cart.items);

  return (
    <Stack spacing={2} sx={{ py: 2, px: 1 }}>
      <Stack spacing={0.5}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>Zwischensumme</Box>
          <Box>{parseFloat(cartTotal).toFixed(2)} €</Box>
        </Box>
        {serviceType === 'delivery' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>Liefergebühren</Box>
            {locationConditions ? (
              <Box>{parseFloat(locationConditions.deliveryFee).toFixed(2)} €</Box>
            ) : (
              <Box
                sx={{
                  alignSelf: 'end',
                  pl: 1,
                  typography: 'caption',
                  fontStyle: 'italic',
                  color: 'action.active',
                }}
              >
                abhängig vom Lieferort
              </Box>
            )}
          </Box>
        ) : null}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>Gesamt</Box>
          <Box>
            {/* {parseFloat(serviceType === 'delivery' ? cartTotal + locationConditions.deliveryFee : cartTotal).toFixed(
                2,
              )} */}
            €
          </Box>
        </Box>
      </Stack>
      <Stack spacing={1} sx={{ alignSelf: 'bottom' }}>
        <ServiceTypeToggle />
        <OrderButton
          shoppingCartEmpty={!cartItems.length}
          deliveryFee={locationConditions}
          cartTotal={cartTotal}
          serviceType={serviceType}
        />
      </Stack>
    </Stack>
  );
}

export default Summary;
