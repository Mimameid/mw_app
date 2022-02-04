import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsCartOpen } from '../actions';
import { selectItemsCount } from 'features/frame/cart';

import { AppBar, Badge, Box, Button, Paper, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Autocomplete from 'features/frame/location/components/Autocomplete';
import { ShoppingCart } from '@mui/icons-material';

function MyAppBar() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.shop.shop.name);
  const itemsCounts = useSelector(selectItemsCount);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <AppBar sx={{ bgcolor: 'common.white', color: 'text.primary' }} position="fixed" elevation={medium ? 0 : 2}>
        <Toolbar>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ px: 1, flex: '1 1 0px', maxWidth: 264 }}>
              {!medium ? (
                <Autocomplete
                  sx={{ outline: 'none' }}
                  variant="outlined"
                  size="small"
                  placeholder="Lieferadresse eingeben..."
                  fullWidth
                />
              ) : null}
            </Box>
            <Box
              sx={{
                px: 1,
                flex: '1 1 0px',
                // typography: { xs: 'h5', sm: 'h4' },
                fontSize: { xs: 24, sm: 30 },
                fontWeight: '600',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: '1 1 0px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                px: 1,
                maxWidth: 264,
              }}
            >
              {!small && medium ? (
                <Button
                  sx={{ color: 'grey.500', '&:hover': { bgcolor: 'action.focus' } }}
                  variant="text"
                  onClick={() => dispatch(toggleIsCartOpen())}
                  startIcon={
                    <Badge badgeContent={itemsCounts} color="primary">
                      <ShoppingCart />
                    </Badge>
                  }
                >
                  ({itemsCounts > 0 ? '10,00 €' : '0,00 €'})
                </Button>
              ) : null}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {medium ? (
        <React.Fragment>
          <Paper sx={{ width: '100%', zIndex: (theme) => theme.zIndex.appBar - 1 }} elevation={4} square>
            <Autocomplete variant="outlined" size="small" placeholder="Lieferadresse eingeben..." fullWidth />
          </Paper>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default MyAppBar;
