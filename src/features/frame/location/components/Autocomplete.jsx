import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { queryPredictions } from '../actions';
import { STATUS_CODE } from 'common/constants';

import { useController, useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Box, ClickAwayListener, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import AutocompleteDropdown from './AutocompleteDropdown';
import { Close, Room } from '@mui/icons-material';

const schema = Joi.object({
  address: Joi.string().required(),
});

function Autocomplete(props) {
  const dispatch = useDispatch();
  const { location, statusCode } = useSelector((state) => ({
    location: state.frame.location,
    statusCode: state.frame.location.statusCode,
  }));
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  // leverage rhf
  const { control, setValue } = useForm({
    mode: 'onTouched',
    defaultValues: { address: '' },
    resolver: joiResolver(schema),
  });
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name: 'address',
    control,
  });

  useEffect(() => {
    if (location.address) {
      setValue('address', location.address);
    }
    setSelected(false);
  }, [selected, location.address, setValue]);

  const onChange = (event) => {
    inputProps.onChange(event);
    dispatch(queryPredictions(event.target.value));
  };

  const onBlur = (e) => {
    onSubmit();
  };

  const onSubmit = (data) => {
    setSelected(true);
    setOpen(false);
  };

  const pending = statusCode === STATUS_CODE.REQUEST;
  return (
    <ClickAwayListener onClickAway={onBlur} mouseEvent="onMouseDown">
      <Box ref={containerRef} style={{ position: 'relative' }}>
        <TextField
          inputRef={ref}
          inputProps={{ spellCheck: 'false', style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }}
          autoComplete="off"
          {...inputProps}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={() => {
            setOpen(true);
          }}
          error={!!error}
          helperText={error ? error.message : null}
          {...props}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{ p: 0.5 }}
                  color="inherit"
                  onClick={
                    !pending
                      ? () => {
                          queryPosition(setLocationSelected);
                        }
                      : null
                  }
                  disabled={pending}
                  disableRipple={pending}
                >
                  {!pending ? <Room /> : <CircularProgress size={24} color="secondary" />}
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              bgcolor: 'divider',
              borderRadius: { xs: 0, md: 1 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            },
          }}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton
          //         aria-label="toggle password visibility"
          //         // onClick={handleClickShowPassword}
          //         // onMouseDown={handleMouseDownPassword}s

          //         edge="end"
          //       >
          //         <Close />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
        <AutocompleteDropdown open={open} onSelect={onSubmit} />
      </Box>
    </ClickAwayListener>
  );
}

export default Autocomplete;
