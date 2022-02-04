import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from 'features/frame/cart/index';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Collapse, Divider, IconButton, Paper } from '@mui/material';
import Choice from './Choice/Choice';
import { Add, Remove } from '@mui/icons-material';
import NumberOfDishesForm from './NumberOfDishesForm';

const schema = yup.object({
  dishId: yup.string().length(12).required(),
  name: yup.string().required(),
  count: yup.number().min(0).max(99).required(),
  price: yup.number().min(0).required(),
  choices: yup.array().of(
    yup.object({
      id: yup.string().length(12).required(),
      name: yup.string().required(),
      subs: yup.array().of(
        yup.object({
          id: yup.string().length(12).required(),
          name: yup.string().required(),
          price: yup.number().min(0).required(),
        }),
      ),
    }),
  ),
});

function Dish({ dish, cartItem, onClose }) {
  const dispatch = useDispatch();
  const defaultChoices = useMemo(() => {
    const defaultChoices = [];
    for (let i = 0; i < dish.choices.length; i++) {
      let subs = cartItem ? JSON.parse(JSON.stringify(cartItem.choices[i].subs)) : [];

      defaultChoices.push({ id: dish.choices[i].id, name: dish.choices[i].name, subs: subs });
    }
    return defaultChoices;
  }, [dish, cartItem]);

  const { handleSubmit, control, getValues, watch, reset, setValue, ...methods } = useForm({
    mode: 'onTouched',
    defaultValues: {
      dishId: dish.id,
      price: dish.price,
      name: dish.name,
      count: cartItem ? cartItem.count : 1,
      choices: defaultChoices,
    },
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const count = watch('count');
  const choices = watch('choices');

  const onSubmit = (data) => {
    let itemId = data.dishId;

    for (const choice of data.choices) {
      itemId += `-${choice.id}`;
      for (const sub of choice.subs) {
        itemId += `-${sub.id}`;
      }
    }

    if (cartItem) {
      dispatch(updateItem({ item: { itemId, ...data }, oldId: cartItem.itemId }));
      onClose();
    } else {
      dispatch(addItem({ itemId, ...data }));
      setOpen(false);
    }
  };

  const values = getValues();

  let currentPrice = values.price;
  for (const choice of values.choices) {
    for (const sub of choice.subs) {
      currentPrice += sub.price;
    }
  }

  return (
    <Paper variant="outlined">
      <FormProvider {...{ handleSubmit, control, getValues, watch, setValue, reset, ...methods }}>
        <Box sx={{ display: 'flex', p: 2, cursor: cartItem ? 'default' : 'pointer' }} onClick={() => setOpen(!open)}>
          <Box
            sx={{
              mt: '2px',
            }}
          >
            <IconButton
              sx={{
                '&:hover': {
                  background: 'none',
                },
                visibility: cartItem ? 'hidden' : 'visible',
              }}
              disableRipple
              aria-label="edit"
              size="small"
            >
              {!open ? <Add fontSize="small" /> : <Remove fontSize="small" />}
            </IconButton>
          </Box>
          <Box>
            <Box sx={{ typography: 'h6', fontWeight: 'fontWeightBold' }}> {dish.name}</Box>
            <Box sx={{ color: 'text.secondary', fontSize: 'body1.fontSize' }}> {dish.desc}</Box>
            <Box sx={{ pt: 2, fontWeight: 'fontWeightBold', color: 'primary.main' }}>
              {parseFloat(dish.price).toFixed(2)} €
            </Box>
          </Box>
        </Box>

        <Collapse
          in={cartItem ? true : open}
          onExited={() => {
            reset();
          }}
        >
          <Divider />
          <Box sx={{ display: 'flex', py: 2, px: { xs: 5, sm: 6 }, flexDirection: 'column' }}>
            {dish.choices.map((choice, index) => (
              <Choice key={index} choice={{ ...choice, nestIndex: index }} />
            ))}

            <Box sx={{ display: 'flex' }}>
              <NumberOfDishesForm name={'count'} />
              <Button variant="contained" onClick={handleSubmit(onSubmit)} fullWidth>
                {cartItem ? 'Aktualisieren ' : null}
                {parseFloat(values.count * currentPrice).toFixed(2)}€
              </Button>
            </Box>
          </Box>
        </Collapse>
      </FormProvider>
    </Paper>
  );
}

export default Dish;
