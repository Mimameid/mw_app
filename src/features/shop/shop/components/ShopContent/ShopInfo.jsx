import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { cuisineLabelToField } from 'common/constants';

import { Box, Button, Chip, Paper, Stack } from '@mui/material';
import MoreInfo from './MoreInfo/MoreInfo';
import { AccessTime, RestaurantMenu, ShoppingBag, DeliveryDining, Lens } from '@mui/icons-material';

function checkIfOpen(openingHours) {}

function ShopInfo({ shop }) {
  const locationConditions = useSelector((state) => state.shop.shop.locationConditions);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);

  console.log(locationConditions);

  if (shop) {
    return (
      <Paper
        sx={{ position: 'relative', mt: -8, mx: { xs: 0, sm: 5 }, p: 4, borderRadius: { xs: 0, sm: 2 } }}
        elevation={2}
      >
        <Stack sx={{ typography: 'body1' }} spacing={0.8}>
          <Box sx={{ position: 'relative', display: 'flex' }}>
            <AccessTime fontSize="small" />
            <Lens
              sx={{
                position: 'absolute',
                top: '6px',
                left: '-12px',
                color: shop.isOpen ? 'success.light' : 'error.main',
                fontSize: 10,
              }}
            />

            {shop.currentDayOpeningHours.length ? (
              <Box sx={{ pl: 1, pt: 0.4, display: 'flex', flexDirection: 'column' }}>
                {shop.currentDayOpeningHours.map((range, index) => (
                  <Box key={index}>
                    {range.start} - {range.end}
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ pl: 1, alignSelf: 'end' }}>Geschlossen</Box>
            )}
          </Box>

          <Box sx={{ display: 'flex' }}>
            <ShoppingBag fontSize="small" />

            <Box sx={{ display: 'flex', pl: 1, alignSelf: 'end' }}>
              <Box sx={{ alignSelf: 'end' }}>
                {locationConditions
                  ? locationConditions.minOrderValue
                  : `${shop.minOrderValue.min}€ - ${shop.minOrderValue.max}€`}
              </Box>
              <Box
                sx={{
                  alignSelf: 'end',
                  pl: 1,
                  typography: 'caption',
                  fontStyle: 'italic',
                  color: 'action.active',
                }}
              >
                abhängig vom Lieferort
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <DeliveryDining fontSize="small" />
            <Box sx={{ display: 'flex', pl: 1, alignSelf: 'end' }}>
              <Box sx={{ alignSelf: 'end' }}>
                {locationConditions
                  ? locationConditions.deliveryFee
                  : `${shop.deliveryFee.min}€ - ${shop.deliveryFee.max}€`}
              </Box>
              <Box
                sx={{
                  alignSelf: 'end',
                  pl: 1,
                  typography: 'caption',
                  fontStyle: 'italic',
                  color: 'action.active',
                }}
              >
                abhängig vom Lieferort
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <RestaurantMenu fontSize="small" />
            <Box sx={{ pl: 1, alignSelf: 'end' }}> {shop.cuisineTypes.join(', ')} </Box>{' '}
          </Box>
          <Box sx={{ display: 'flex' }}>
            {shop.cuisineLabels.map((label, index) => (
              <Chip
                key={index}
                sx={{
                  margin: '2px 2px 0 2px',
                  color: `food_tags.${cuisineLabelToField[label]}.main`,
                  backgroundColor: `food_tags.${cuisineLabelToField[label]}.light`,
                }}
                label={label}
                size="small"
              />
            ))}
          </Box>
        </Stack>
        <Box sx={{ position: 'absolute', top: 28, right: 32 }}>
          <Button sx={{ whiteSpace: 'nowrap' }} variant="outlined" size="small" onClick={() => setMoreInfoOpen(true)}>
            Mehr Info
          </Button>
        </Box>
        <MoreInfo shop={shop} open={moreInfoOpen} setOpen={() => setMoreInfoOpen(false)} />
      </Paper>
    );
  }
  return null;
}

export default ShopInfo;
