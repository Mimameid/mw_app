import React from 'react';
import { useSelector } from 'react-redux';
import { weekdays } from 'common/constants';

import { Box, Link, Stack } from '@mui/material';

function MoreInfoContent({ shop }) {
  const locationConditions = useSelector((state) => state.shop.shop.locationConditions);

  const [street, city] = shop.location.formattedAddress.split(',');
  return (
    <Box sx={{ typography: 'body1' }}>
      <Stack spacing={3}>
        <Box> {shop.descLong}</Box>

        <Box>
          <Box sx={{ typography: 'h5' }}>Adresse</Box>
          <Box sx={{ pt: 1, lineHeight: '1.44' }}>
            <Box>{street}</Box>
            <Box>{city}</Box>
            <Link
              href={`http://google.com/maps/?q=${shop.location.formattedAddress}`}
              el="noopener noreferrer"
              target="_blank"
              variant="swiperDetails"
              underline="none"
            >
              Siehe Karte
            </Link>
          </Box>
        </Box>
        <Box>
          <Box sx={{ typography: 'h5' }}>Öffnungszeiten</Box>
          <Stack sx={{ pt: 1 }} spacing={0.5}>
            {Object.entries(shop.openingHours).map(([key, value], index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>{weekdays[key]}</Box>
                <Stack>
                  {value.length ? (
                    value.map((range, rangeIndex) => (
                      <Box key={rangeIndex} sx={{ display: 'flex', typography: 'swiperDetails' }}>
                        <Box>
                          {range.start} - {range.end}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ pl: 2, typography: 'swiperDetails' }}>Geschlossen</Box>
                  )}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box>
          <Box sx={{ typography: 'h5' }}>Bestellinformationen</Box>{' '}
          <Stack sx={{ pt: 1 }} spacing={0.5}>
            {shop.isDelivery ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>Liefergebühren</Box>
                  <Box sx={{ display: 'flex', typography: 'swiperDetails' }}>
                    {locationConditions ? (
                      <Box>{locationConditions.deliveryFee}</Box>
                    ) : shop.deliveryFee.max === 0 ? (
                      <Box>Kostenlos</Box>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: 'inline-block',
                            pr: 1,
                            pt: '1px',
                            typography: 'caption',
                            fontStyle: 'italic',
                            color: 'action.active',
                          }}
                        >
                          abhängig vom Lieferort
                        </Box>
                        <Box>
                          {shop.deliveryFee.min}€ - {shop.deliveryFee.max}€
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>Mindestbestellwert</Box>
                  <Box sx={{ display: 'flex', typography: 'swiperDetails' }}>
                    {locationConditions ? (
                      <Box>{locationConditions.minOrderValue}</Box>
                    ) : shop.minOrderValue.max === 0 ? (
                      <Box>{shop.minOrderValue.max}€</Box>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: 'inline-block',
                            pr: 1,
                            pt: '1px',
                            typography: 'caption',
                            fontStyle: 'italic',
                            color: 'action.active',
                          }}
                        >
                          abhängig vom Lieferort
                        </Box>
                        <Box>
                          {shop.minOrderValue.min}€ - {shop.minOrderValue.max}€
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </>
            ) : null}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>Servicearten</Box>
              <Box sx={{ display: 'flex', typography: 'swiperDetails' }}>
                <Box>
                  {shop.isDelivery ? 'Lieferung, ' : null}
                  {shop.isPickup ? 'Abholung, ' : null}
                  {shop.isLocal ? 'Lokal' : null}
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>

        {shop.phoneNumber || shop.url ? (
          <Box>
            <Box sx={{ typography: 'h5' }}>Kontakt</Box>
            <Stack sx={{ pt: 1 }} spacing={0.5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>Telefonnummer</Box>
                <Box>
                  <Link href={`tel:${shop.phoneNumber}`} variant="swiperDetails" underline="none">
                    {shop.phoneNumber}
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>Webseite</Box>
                <Box>
                  <Link
                    rel="noreferrer"
                    href={
                      shop.url
                        ? `https://${shop.url}`
                        : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${shop.id}/${shop.name.replaceAll(' ', '-')}`
                    }
                    target="_blank"
                    variant="swiperDetails"
                    underline="none"
                  >
                    Webseite besuchen
                  </Link>
                </Box>
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}

export default MoreInfoContent;
