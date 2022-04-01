import React from 'react';
import { useSelector } from 'react-redux';

import { Alert, Slide } from '@mui/material';

function SnackInfo() {
  const { name, isOpen, isLocal, isOrderAllowed, shop } = useSelector((state) => ({
    name: state.shop.shop.name,
    isOpen: state.shop.shop.isOpen,
    isOrderAllowed: state.shop.shop.isDelivery || state.shop.shop.isPickup,
    isLocal: state.shop.shop.isLocal,
    shop: state.shop.shop,
  }));

  console.log(shop);
  return (
    <Slide in={!isOpen || !isOrderAllowed} direction="up">
      <Alert
        sx={{
          position: 'fixed',
          width: (theme) => ({
            xs: `calc(100% - 54px)`,
            sm: `calc(100% - 80px)`,
            md: `calc(100% - ${theme.mixins.cartDesktop.minWidth}px - 80px)`,
          }),
          bottom: (theme) => ({ xs: theme.mixins.bottomNavigation.minHeight + 12, sm: 24 }),
          left: (theme) => ({ xs: 12, sm: 24 }),
          mx: 2,
          borderRadius: 0.5,
        }}
        aria-describedby="status-snackbar"
        elevation={6}
        severity={'info'}
      >
        {!isOpen
          ? `${name} bietet aktuell keinen Service.`
          : `Wir bieten aktuell keine Online Bestellung. Du kannst dir hier aber Informationen zu uns anschauen.`}
      </Alert>
    </Slide>
  );
}

export default SnackInfo;
