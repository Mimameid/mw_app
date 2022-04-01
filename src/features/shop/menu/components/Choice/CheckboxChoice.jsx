import React, { useState } from 'react';

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';

const getLabel = (choice) => {
  if (choice.minRequired === 0) {
    if (choice.maxAllowed > 0) {
      return 'Wähle bis zu ' + choice.maxAllowed + ' Optionen aus';
    } else {
      return 'Wähle bis zu ' + choice.subs.length + ' Optionen aus';
    }
  } else {
    if (choice.maxAllowed > 0) {
      return (
        'Wähle mindestens ' +
        choice.minRequired +
        ' und maximal ' +
        choice.maxAllowed +
        ` ${choice.maxAllowed > 1 ? 'Optionen' : 'Option'} aus`
      );
    } else {
      return (
        'Wähle mindestens ' +
        choice.minRequired +
        ' und maximal ' +
        choice.subs.length +
        ` ${choice.subs.length > 1 ? 'Optionen' : 'Option'} aus`
      );
    }
  }
};

const getCheckedStatus = (sub, fields) => {
  for (const selectedSub of fields) {
    if (sub.id === selectedSub.id) {
      return true;
    }
  }
  return false;
};

function CheckboxChoice({ choice }) {
  const { control } = useFormContext();
  const fieldArray = useFieldArray({ control, name: `choices[${choice.nestIndex}].subs`, keyName: 'key' });
  const [checked, setChecked] = useState(
    choice.subs.reduce((last, current) => {
      return { ...last, [current.id]: false };
    }, {}),
  );

  const handleChange = (event, value, sub) => {
    setChecked({ ...checked, [event.target.name]: value });
    if (value) {
      fieldArray.append({
        id: sub.id,
        name: sub.name,
        price: sub.price,
      });
    } else {
      for (let i = 0; i < fieldArray.fields.length; i++) {
        const current = fieldArray.fields[i];
        if (current.id === sub.id) {
          fieldArray.remove(i);
        }
      }
    }
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Box
        sx={{
          typography: 'subtitle1',
          fontWeight: 'fontWeightBold',
        }}
      >
        {choice.name}
      </Box>
      <FormControl
        sx={{
          width: 1,
          mb: 1,
        }}
        component="fieldset"
        variant="standard"
      >
        <Box
          sx={{
            typography: 'body1',
            mb: 0.5,
            color: 'grey.700',
          }}
        >
          {getLabel(choice)}
        </Box>
        <FormGroup>
          {choice.subs.map((sub, index) => {
            return (
              <Box
                key={sub.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  sx={{
                    pl: 0.5,
                  }}
                  control={
                    <Checkbox
                      sx={{ p: 0.75, color: 'grey.500' }}
                      checked={getCheckedStatus(sub, fieldArray.fields)}
                      name={sub.id}
                      onChange={(event, value) => {
                        handleChange(event, value, sub);
                      }}
                      // disableRipple
                    />
                  }
                  label={sub.name}
                />
                <Box sx={{ color: checked[sub.id] ? null : 'grey.600' }}>
                  {sub.price === 0 ? null : `+${parseFloat(sub.price).toFixed(2)} €`}
                </Box>
              </Box>
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default CheckboxChoice;
