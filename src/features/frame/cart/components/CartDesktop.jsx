import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsCartOpen } from 'features/frame/frame/actions';

import { Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';

function CartDesktop() {
  const dispatch = useDispatch();
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
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
      <div>sdfsdf</div>
    </Drawer>
  );
}

export default CartDesktop;
