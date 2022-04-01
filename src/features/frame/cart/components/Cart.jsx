import React from 'react';

import ResponsiveDrawer from 'common/components/ResponsiveDrawer';
import ServiceTypeToggle from './CartComponents/Summary/ServiceTypeToggle';

function Cart({ open, setOpen }) {
  return (
    <ResponsiveDrawer open={open} setOpen={setOpen} title="Warenkorb">
      <div>asdasdasd</div>
      <div>asdasdasd</div>
      <div>asdasdasd</div>
      <div>asdasdasd</div>
      <ServiceTypeToggle />
    </ResponsiveDrawer>
  );
}

export default Cart;
