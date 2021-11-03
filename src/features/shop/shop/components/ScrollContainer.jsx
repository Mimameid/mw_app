import React from 'react';

import { Box, useTheme, useMediaQuery } from '@mui/material';

function ScrollContainer({ children }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  let delta = theme.mixins.toolbar.minHeight;
  delta = small ? delta + theme.mixins.bottomNavigation.minHeight : delta;
  delta = medium ? delta + theme.mixins.secondaryBar.minHeight : delta;

  return (
    <Box
      sx={{
        display: 'flex',
        height: (theme) => `calc(100vh - ${delta}px)`,
        flexDirection: 'column',
        flexGrow: 1,

        bgcolor: 'common.white',
      }}
    >
      {children}
    </Box>
  );
}

export default ScrollContainer;
