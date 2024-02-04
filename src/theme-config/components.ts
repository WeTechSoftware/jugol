import {scale} from 'react-native-size-matters';
import colors from './colors';
import {fontSizes, fontWeights} from './typography';

const components = {
  Input: {
    baseStyle: {
      bg: '#fff',
      borderColor: colors.gray[100],
      borderRadius: 15,
      py: scale(12) + 'px',
      borderWidth: 1,
      _focus: {
        borderColor: colors.primary[100],
        backgroundColor: '#fff',
      },
      placeholderTextColor: colors.gray[200],
    },
    defaultProps: {
      fontSize: fontSizes.xs,
    },
  },
  Button: {
    variants: {
      red: {
        background: colors.gray[300],
        _pressed: {
          background: colors.gray[300],
        },
        _text: {
          color: '#fff',
        },
      },
      primary: {
        bg: colors.primary[100],
        borderRadius: 15,
        _pressed: {
          background: colors.primary[100] + '95',
          borderColor: colors.primary[100] + '95',
        },
        _text: {
          color: '#fff',
        },
      },
      preprimary: {
        bg: colors.blue[300],
        borderRadius: 15,
        _pressed: {
          background: colors.blue[300] + '95',
        },
        _text: {
          color: '#AF0DBD',
        },
      },
      danger: {
        borderRadius: 15,
        borderColor: '#fac8c8',
        borderWidth: 1.5,
        _pressed: {
          background: '#ffebeb',
        },
        _text: {
          color: colors.red[100],
        },
      },

      outline: {
        bg: 'transparent',
        borderColor: colors.light[100],
        borderWidth: '1.5px',
        rounded: '2xl',
        padding: '8px',
        fontWeight: 400,
        color: '#000000',
      },
    },
    baseStyle: {
      borderRadius: '8px',
    },
    defaultProps: {
      _text: {
        fontSize: fontSizes.md,
        fontWeight: 600,
        py: '4px',
        px: '16px',
      },
    },
  },
};

export default components;
