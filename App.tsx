/**
 * Petjio Customer App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store';


function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
        <AppNavigator />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;