import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFCDCD',
      main: '#D32F2F',
      dark: '#942121',
      contrastText: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    text: { primary: '#132F4C' },

    background: {
      default: '#f4f5f7',
      footer: '#0C1324',
    },
    avatar: {
      default: '#d81f2c',
    },
    action: {
      hoverOpacity: 0.15,
      disabledOpacity: 'rgba(0,0,0,0.38)',
    },
    food_tags: {
      halal: {
        main: '#db000e',
        light: '#f5b2b388',
      },
      vegetarian: {
        main: '#1f9c27',
        light: '#bee1b988',
      },
      vegan: {
        main: '#ba5913',
        light: '#ffb46e88',
      },
      kosher: {
        main: '#2a7bcb',
        light: '#bed5ef88',
      },
      gluten: {
        main: '#4b00b3',
        light: '#4b00b333',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    swiperTitle: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.3,
      letterSpacing: '0.00714em',
    },
    swiperDetails: {
      fontWeight: 400,
      fontSize: '0.825rem',
      lineHeight: 1.35,
      letterSpacing: '0.03333em',
      color: grey[700],
    },
    caption: {
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8725rem',
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: '1.24',
      fontSize: '0.9rem',
      letterSpacing: '0.01071em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  mixins: {
    toolbar: {
      minHeight: 74,
    },
    secondaryBar: {
      minHeight: 38,
    },
    bottomNavigation: {
      minHeight: 56,
    },
    cartDesktop: {
      minWidth: 324,
    },
    swipeableDrawer: {
      height: '90%',
      titleHeight: 62,
      borderRadius: '24px 24px 0 0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;
