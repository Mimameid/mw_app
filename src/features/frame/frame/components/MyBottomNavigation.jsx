import React, { useState } from 'react';

import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Cart from 'features/frame/cart/components/Cart';
import Orders from 'features/frame/orders/components/Orders';
import Profile from 'features/user/user/components/Profile';

import { AccountCircle, ListAlt, ShoppingCart } from '@mui/icons-material';

function MyBottomNavigation() {
  const [value, setValue] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleToggleOrders = () => {
    setCartOpen(false);
    setProfileOpen(false);
    setOrdersOpen(!ordersOpen);

    if (ordersOpen) {
      setValue(-1);
    } else {
      setValue(0);
    }
  };

  const handleToggleCart = () => {
    setOrdersOpen(false);
    setProfileOpen(false);
    setCartOpen(!cartOpen);

    if (cartOpen) {
      setValue(-1);
    } else {
      setValue(1);
    }
  };

  const handleToggleProfile = () => {
    setOrdersOpen(false);
    setCartOpen(false);
    setProfileOpen(!profileOpen);
    console.log(profileOpen);
    if (profileOpen) {
      setValue(-1);
    } else {
      setValue(2);
    }
  };

  return (
    <React.Fragment>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1250 }}
        elevation={ordersOpen || cartOpen || profileOpen ? 0 : 3}
      >
        <BottomNavigation
          sx={{ height: (theme) => theme.mixins.bottomNavigation.minHeight }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            switch (newValue) {
              case 0: {
                handleToggleOrders();
                break;
              }
              case 1: {
                handleToggleCart();
                break;
              }
              case 2: {
                handleToggleProfile();
                break;
              }
            }
          }}
        >
          <BottomNavigationAction sx={{ maxWidth: 'none' }} label="Bestellungen" icon={<ListAlt />} />
          <BottomNavigationAction sx={{ maxWidth: 'none' }} label={<Box>Warenkorb</Box>} icon={<ShoppingCart />} />
          <BottomNavigationAction sx={{ maxWidth: 'none' }} label="Profil" icon={<AccountCircle />} />
        </BottomNavigation>
      </Paper>
      <Orders open={ordersOpen} setOpen={handleToggleOrders} />
      <Cart open={cartOpen} setOpen={handleToggleCart} />
      <Profile open={profileOpen} setOpen={handleToggleProfile} />
    </React.Fragment>
  );
}

export default MyBottomNavigation;
