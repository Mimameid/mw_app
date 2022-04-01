import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import { Box } from '@mui/material';
import BasketItem from './BasketItem';

function Basket() {
  const cartItems = useSelector((state) => state.frame.cart.items);
  const shopName = useSelector((state) => state.shop.shop.name);

  return (
    <Box sx={{ py: 2, px: 1 }}>
      {cartItems.length ? (
        cartItems.map((item, index) => <BasketItem key={item.itemId} item={item} />)
      ) : (
        <Box sx={{ py: 3, px: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1 }}>
            <Image src="/empty_cart.svg" alt="me" width="120" height="100" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',

              pt: 1,

              typography: 'subtitle1',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Füge Speisen hinzu und bestelle
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',

              typography: 'body2',
              color: 'grey.500',
              textAlign: 'center',
            }}
          >
            Wähle deine Speisen aus unseren verschiedenen Angeboten
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Basket;
