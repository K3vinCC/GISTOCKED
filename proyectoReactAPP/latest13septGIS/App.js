import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; // Importamos SplashScreen
import { useFonts } from 'expo-font';

import Home from './src/screens/Home';
import Home1 from './src/screens/Home1'; // Assuming you'll create this for testing
import Opciones from './src/screens/Opciones';
import { enableScreens } from 'react-native-screens';
import 'react-native-safe-area-context';

import Header1 from './src/components/header1';
import { ThemeProvider } from './ThemeContext';

const Stack = createStackNavigator();
enableScreens();
const App = () => {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Racing': require('./assets/fonts/RacingSansOne-Regular.ttf'),
  });
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Fonts not loaded yet...");
    return null;
  };
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Home} options={{ headerStyle: {
                                                                         backgroundColor: '#34495E',
                                                                      },
                                                                      headerTintColor: '#FFF',
                                                                      headerTitle: () => <Header1 />,
                                                                      
                                                                      }}/>
        <Stack.Screen name="Inicio1" component={Home1} options={{ headerStyle: {
                                                                         backgroundColor: '#34495E'
                                                                      },
                                                                                 headerTintColor: '#FFF',
                                                                                 headerTitleStyle: {
                                                                                    fontFamily: 'Racing'}}}/>
        <Stack.Screen name="Opciones" component={Opciones} options={{ headerStyle: {
                                                                         backgroundColor: '#34495E'
                                                                      },
                                                                                 headerTintColor: '#FFF',
                                                                                 headerTitleStyle: {
                                                                                    fontFamily: 'Racing'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

const RootApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default RootApp;