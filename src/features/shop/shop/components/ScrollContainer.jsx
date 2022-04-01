import React from 'react';

import { Box, useTheme, useMediaQuery } from '@mui/material';
import SimpleBar from 'simplebar-react';

function ScrollContainer({ children }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  let delta = theme.mixins.toolbar.minHeight;
  delta = small ? delta + theme.mixins.bottomNavigation.minHeight : delta;
  delta = medium ? delta + theme.mixins.secondaryBar.minHeight : delta;

  return (
    <SimpleBar style={{ height: `calc(100vh - ${delta}px)` }}>
      <Box
        sx={{
          display: 'flex',

          flexDirection: 'column',
          flexGrow: 1,

          bgcolor: 'common.white',
        }}
      >
        {children}
      </Box>
    </SimpleBar>
  );
}

export default ScrollContainer;
