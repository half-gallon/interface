import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Darker_Grotesque } from 'next/font/google';

export const darkerGrotesque = Darker_Grotesque({
  weight: ['300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#4465DA',
      main: '#4465DA',
      dark: '#4465DA',
    },
    secondary: {
      light: '#FF76C0',
      main: '#FF76C0',
      dark: '#FF76C0',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: darkerGrotesque.style.fontFamily,
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontFeatureSettings: `'clig' off, 'liga' off`,
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: '26px' /* 152.941% */,
          letterSpacing: '0.46px',
        },
      },
    },
  },
});

export default theme;
