import React from 'react';
import Link from 'next/link';
import { useAuthenticate } from 'common/hooks/useAuthenticate';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import MyAppBar from './MyAppBar';
import CartDesktop from 'features/frame/cart/components/CartDesktop';
import MyBottomNavigation from './MyBottomNavigation';

function Frame({ children }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const large = useMediaQuery(theme.breakpoints.up('md'));
  // const { loggedIn, loading } = useAuthenticate();
  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <MyAppBar />
          <Box>{children}</Box>
        </Box>
        {small ? <MyBottomNavigation /> : <CartDesktop />}
      </Box>
    </React.Fragment>
  );
}

export default Frame;
