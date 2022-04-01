import React from 'react';

import { Box, DialogContent, DialogTitle, Divider, Drawer, IconButton, useTheme } from '@mui/material';
import SimpleBar from 'simplebar-react';
import { Close } from '@mui/icons-material';

function ResponsiveDrawer({ open, setOpen, title, variant, children, ...props }) {
  const theme = useTheme();
  return (
    <Drawer
      sx={{ zIndex: variant === 'modal' ? (theme) => theme.zIndex.modal : null }}
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          height: theme.mixins.swipeableDrawer.height,
          borderRadius: (theme) => theme.mixins.swipeableDrawer.borderRadius,
          overflow: 'visible',
        },
      }}
      {...props}
    >
      <DialogTitle>
        {typeof title === 'string' ? <Box sx={{ typography: 'swiperTitle', textAlign: 'center' }}>{title}</Box> : title}

        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 0 }}>
        <SimpleBar style={{ height: '100%' }}>
          {variant && variant === 'modal' ? (
            <Box sx={{ px: 2, py: 3 }}>{children}</Box>
          ) : (
            <React.Fragment>
              <Box sx={{ px: 2, py: 1 }}>{children}</Box>
              <Box sx={{ mt: 'auto' }} />
              <Divider />
              <Box sx={{ mb: (theme) => `${theme.mixins.bottomNavigation.minHeight}px` }} />
            </React.Fragment>
          )}
        </SimpleBar>
      </DialogContent>
    </Drawer>
  );
}

export default ResponsiveDrawer;
