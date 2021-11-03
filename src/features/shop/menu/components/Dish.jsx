import React, { useState } from 'react';

import { Box, Button, ButtonGroup, Collapse, Divider, IconButton, Paper } from '@mui/material';
import Choice from './Choice/Choice';
import { Add, Remove } from '@mui/icons-material';

function Dish({ dish }) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);

  return (
    <Paper variant="outlined">
      <Box sx={{ display: 'flex', p: 2, cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <Box>
          <IconButton
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: 'none',
              },
            }}
            disableRipple
            aria-label="edit"
            size="small"
          >
            {!open ? <Add fontSize="small" /> : <Remove fontSize="small" />}
          </IconButton>
        </Box>
        <Box>
          <Box sx={{ fontSize: 'subtitle1.fontSize', fontWeight: 'fontWeightBold' }}> {dish.name}</Box>
          <Box sx={{ color: 'text.secondary', fontSize: 'body2.fontSize' }}> {dish.desc}</Box>
          <Box sx={{ pt: 2, fontWeight: 'fontWeightBold', color: 'primary.main' }}>
            {parseFloat(dish.price).toFixed(2)} €
          </Box>
        </Box>
      </Box>

      <Collapse in={open}>
        <Divider />
        <Box sx={{ display: 'flex', py: 4, px: 6, flexDirection: 'column' }}>
          {dish.choices.map((choice, index) => (
            <Choice key={index} choice={choice} />
          ))}

          <Box sx={{ display: 'flex' }}>
            <ButtonGroup sx={{ pr: 2 }} size="small" aria-label="small outlined button group">
              <Button
                size="small"
                onClick={() =>
                  setCount((count) => {
                    return count > 1 ? count - 1 : count;
                  })
                }
              >
                -
              </Button>
              <Button size="small">{count}</Button>
              <Button
                size="small"
                onClick={() =>
                  setCount((count) => {
                    return count + 1;
                  })
                }
              >
                +
              </Button>
            </ButtonGroup>
            <Button variant="contained" fullWidth>
              {parseFloat(count * dish.price).toFixed(2)} €
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default Dish;
