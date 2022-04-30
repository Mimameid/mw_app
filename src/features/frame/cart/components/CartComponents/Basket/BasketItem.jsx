import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../..';
import { selectProduct } from 'features/shop/menu';

import { Box, Dialog, IconButton } from '@mui/material';
import Product from 'features/shop/menu/components/Product';
import { Delete, Edit } from '@mui/icons-material';

function BasketItem({ item }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProduct(state, item.productId));
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          {item.count}x {item.name}
        </Box>
        <Box>
          <IconButton
            onClick={() => {
              setEditOpen(true);
            }}
            size="small"
          >
            <Edit sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(removeItem(item.itemId));
            }}
          >
            <Delete sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mt: -0.6 }}>
        {item.choices.map(
          (choice, index) =>
            choice.subs.length > 0 && (
              <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', typography: 'caption', color: 'grey.500' }}>
                <Box sx={{ whiteSpace: 'nowrap' }}>{choice.name}:</Box>
                <Box sx={{ flex: 1, pl: 0.5 }}>
                  {choice.subs.map((sub, subIndex) => (
                    <Box sx={{ display: 'inline-block' }} key={subIndex}>
                      {subIndex === choice.subs.length - 1 ? sub.name : sub.name + ', '}
                    </Box>
                  ))}
                </Box>
              </Box>
            ),
        )}
      </Box>
      <Dialog
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
      >
        <Product
          product={product}
          cartItem={item}
          onClose={() => {
            setEditOpen(false);
          }}
        ></Product>
      </Dialog>
    </>
  );
}

export default BasketItem;
