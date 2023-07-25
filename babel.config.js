module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@applicationAssets': './src/assets',
          '@components': './src/components',
          '@apps': './src/components/apps',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@types': './src/types',
          '@themes': './themes.tsx',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
