import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; 

import Login from './src/screens/Login'
import Perfil from './src/screens/Pefil';
import Home from './src/screens/Home';
import ZVentas from './src/screens/ZVentas';
import Home1 from './src/screens/Home1'; 
import Opciones from './src/screens/Opciones';
import Ginventario from './src/screens/Ginventario'
import Ainventario from './src/screens/Ainventario'

import { enableScreens } from 'react-native-screens';
import 'react-native-safe-area-context';

import Header1 from './src/components/header1';
import { ThemeProvider} from './ThemeContext';
import { useFonts } from 'expo-font';  

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
      <Stack.Navigator initialRouteName="Inicio Sesion">
        <Stack.Screen name="Inicio sesion" component={Login}/>
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
        <Stack.Screen name="inventario" component={Ginventario} />
        <Stack.Screen name="Ainventario" component={Ainventario} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Ventas" component={ZVentas} />
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