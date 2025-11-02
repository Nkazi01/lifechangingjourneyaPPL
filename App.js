import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorBoundary from './src/components/ErrorBoundary';
import { FontLoader } from './src/providers/FontLoader';
import { AuthProvider } from './src/context/AuthContext';
import { DataProvider } from './src/providers/DataProvider';
import AppNavigator from './src/navigation/AppNavigator';
import CustomSplashScreen from './src/components/common/CustomSplashScreen';
import { Colors } from './src/styles/colors';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          {!splashFinished ? (
            <CustomSplashScreen onFinish={() => setSplashFinished(true)} />
          ) : (
            <FontLoader>
              <AuthProvider>
                <DataProvider>
                  <StatusBar style="dark" backgroundColor={Colors.background} />
                  <AppNavigator />
                </DataProvider>
              </AuthProvider>
            </FontLoader>
          )}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
