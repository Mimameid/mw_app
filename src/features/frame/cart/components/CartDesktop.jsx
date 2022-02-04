import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsCartOpen } from 'features/frame/frame/actions';
import { selectCartSumTotal } from 'features/frame/cart';

import { Box, Button, Divider, Drawer, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import CartItem from './CartItem';
import ServiceTypeToggle from './ServiceTypeToggle';

function CartDesktop() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.frame.frame.isCartOpen);
  const cartItems = useSelector((state) => state.frame.cart.items);
  const cartTotal = useSelector(selectCartSumTotal);
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer
      sx={{ zIndex: 1000 }}
      variant={large ? 'permanent' : 'temporary'}
      anchor={'right'}
      open={isCartOpen}
      onClose={() => dispatch(toggleIsCartOpen())}
      PaperProps={{
        sx: {
          width: (theme) => theme.mixins.cartDesktop.minWidth,
          position: large ? 'relative' : 'fixed',
        },
      }}
    >
      <Toolbar />
      <Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            p: 2,
            mt: !large ? theme.mixins.secondaryBar.minHeight + 'px' : 0,

            typography: 'subtitle1',
            color: 'grey.600',
          }}
        >
          Warenkorb
        </Box>
        <Divider />
        <Box sx={{ py: 2, px: 1 }}>
          {cartItems.length ? (
            cartItems.map((item, index) => <CartItem key={item.itemId} item={item} />)
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                p: 2,

                typography: 'subtitle1',
                color: 'grey.500',
              }}
            >
              Fügen Sie Speisen aus dem Menü hinzu.
            </Box>
          )}
        </Box>
        <Divider sx={{ mx: 2 }} />
        <Stack spacing={0.5} sx={{ py: 2, px: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>Zwischensumme</Box>
            <Box>{parseFloat(cartTotal).toFixed(2)} €</Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>Liefergebühren</Box>
            <Box>Zwischensumme</Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>Gesamt</Box>
            <Box>Zwischensumme</Box>
          </Box>
        </Stack>
        <ServiceTypeToggle />
        <Button
          sx={{
            mx: 1,
          }}
          variant="contained"
        >
          Bestellen
        </Button>
      </Stack>
    </Drawer>
  );
}

export default CartDesktop;
