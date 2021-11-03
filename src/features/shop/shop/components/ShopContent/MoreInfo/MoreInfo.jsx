import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import ResponsiveDialog from 'common/components/ResponsiveDialog';
import ResponsiveDrawer from 'common/components/ResponsiveDrawer';
import MoreInfoContent from './MoreInfoContent';

function MoreInfo({ shop, open, setOpen }) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  return match ? (
    <ResponsiveDialog variant="modal" open={open} setOpen={setOpen} title={shop.name}>
      <MoreInfoContent shop={shop} />
    </ResponsiveDialog>
  ) : (
    <ResponsiveDrawer variant="modal" open={open} setOpen={setOpen} title={shop.name}>
      <MoreInfoContent shop={shop} />
    </ResponsiveDrawer>
  );
}

export default MoreInfo;
