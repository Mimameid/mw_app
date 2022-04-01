import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsCartOpen } from 'features/frame/frame/actions';
import Image from 'next/image';

import { Box, Divider, Drawer, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Summary from './CartComponents/Summary/Summary';
import Basket from './CartComponents/Basket/Basket';
import SimpleBar from 'simplebar-react';

function CartDesktop() {
  const dispatch = useDispatch();

  const { shopName, isLocal, isOpen, isOrderAllowed } = useSelector((state) => ({
    shopName: state.shop.shop.name,
    isOpen: state.shop.shop.isOpen,
    isLocal: state.shop.shop.isLocal,
    isOrderAllowed: state.shop.shop.isDelivery || state.shop.shop.isPickup,
  }));
  const isCartOpen = useSelector((state) => state.frame.frame.isCartOpen);

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

      <Stack sx={{ flex: 1 }}>
        <Box>
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
        </Box>
        {!isOpen ? (
          <Box sx={{ flex: 1, py: 5, px: 1, mt: !large ? theme.mixins.secondaryBar.minHeight + 'px' : 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1 }}>
              <Image src="/lost.svg" alt="me" width="120" height="100" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',

                pt: 1,

                typography: 'subtitle1',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Shop ist aktuell nicht erreichbar
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',

                typography: 'body2',
                color: 'grey.500',
                textAlign: 'center',
              }}
            >
              {shopName} bietet aktuell keinen Service
            </Box>
          </Box>
        ) : isOrderAllowed ? (
          <>
            <SimpleBar style={{ flex: `1 1 0`, overflowY: 'auto', height: 0 }}>
              <Basket />
            </SimpleBar>
            <Box>
              <Divider sx={{ mx: 2 }} />
              <Summary />
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, py: 5, px: 1, mt: !large ? theme.mixins.secondaryBar.minHeight + 'px' : 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1 }}>
              <Image src="/eating_together.svg" alt="me" width="120" height="100" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',

                pt: 1,

                typography: 'subtitle1',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Komm vorbei
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',

                typography: 'body2',
                color: 'grey.500',
                textAlign: 'center',
              }}
            >
              Wir bieten aktuell keine Online Bestellung. Aber hey, komm doch einfach vorbei und wähle aus unseren
              verschiedenen Angeboten
            </Box>
          </Box>
        )}
      </Stack>
    </Drawer>
  );
}

export default CartDesktop;
