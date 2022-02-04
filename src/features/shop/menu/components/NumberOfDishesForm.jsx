import React from 'react';

import { Button, ButtonGroup } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

function NumberOfDishesForm({ name }) {
  const { control, getValues } = useFormContext();
  const { field: inputProps } = useController({ name, control });

  const count = getValues('count');
  return (
    <ButtonGroup sx={{ pr: 2 }} size="small" aria-label="small outlined button group">
      <Button
        onClick={() => {
          const value = count > 1 ? count - 1 : count;
          inputProps.onChange(value);
        }}
      >
        -
      </Button>
      <Button
        sx={{
          '&.Mui-disabled': {
            color: 'primary.main',
            borderColor: (theme) => theme.palette.primary.main + '88',
          },
        }}
        disabled
      >
        {inputProps.value}
      </Button>
      <Button
        onClick={() => {
          inputProps.onChange(count + 1);
        }}
      >
        +
      </Button>
    </ButtonGroup>
  );
}

export default NumberOfDishesForm;
