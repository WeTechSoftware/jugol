module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@images': './assets/images',
          '@icons': './assets/svg/icons',
          '@ui': './src/components',
          '@screens': './src/screens',
          '@colors': './src/theme-config/colors',
          '@typography': './src/theme-config/typography',
          '@font-config': './src/theme-config/fontConfig',
          '@types': './src/types',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@action-sheets': './src/action-sheets',
          '@routes': './src/routes',
          '@store': './redux',
          '@config': './config.ts',
        },
      },
    ],
  ],
  };
};
