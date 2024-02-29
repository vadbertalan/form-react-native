import React from 'react';

import {LoginScreen} from './screens/login-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>
  );
}
