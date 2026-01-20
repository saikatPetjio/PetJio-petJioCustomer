module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ... other plugins like module-resolver
    'react-native-reanimated/plugin', // Must be listed last
  ],
};
