import React from 'react';

import { Button } from '@mui/material';

function OrderButton({ shoppingCartEmpty, locationConditions, cartTotal, serviceType }) {
  let status = { enabled: true, text: 'Bezahlen' };

  if (shoppingCartEmpty) {
    status = { enabled: false, text: 'Ihr Einkaufswagen ist leer' };
  } else if (serviceType === 'delivery') {
    if (!locationConditions) {
      status = { enabled: false, text: 'Bitte geben Sie eine Lieferadresse ein' };
    } else if (locationConditions.minimumOrderValue <= cartTotal) {
      status = { enabled: false, text: 'Sie haben den Mindestbestellwert noch nicht erreicht' };
    }
  }

  return (
    <Button
      sx={{
        boxShadow: (theme) => theme.shadows[2],
        minHeight: '82px',
        mx: 1,
      }}
      variant="contained"
      size="large"
      disabled={!status.enabled}
      disableElevation={false}
    >
      {status.text}
    </Button>
  );
}

export default OrderButton;
