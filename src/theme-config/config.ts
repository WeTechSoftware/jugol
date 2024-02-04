import {extendTheme} from 'native-base';
import colors from './colors';
import components from './components';
import {fontConfig, fonts} from './fontConfig';
import shadows from './shadows';
import space from './space';
import typography from './typography';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
const theme = extendTheme({
  typography,
  space,
  colors,
  fontConfig,
  fonts,
  config,
  shadows,
  components,
});

export default theme;
