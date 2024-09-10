import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Home1 from './src/screens/Home1'; // Assuming you'll create this for testing
import Opciones from './src/screens/Opciones';
import Ginventario from './src/screens/Ginventario'
import { enableScreens } from 'react-native-screens';
import 'react-native-safe-area-context';
const Stack = createStackNavigator();
enableScreens();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Inicio1" component={Home1} />
        <Stack.Screen name="Opciones" component={Opciones} options={{ headerStyle: {
                                                                         backgroundColor: '#34495E'
                                                                      },
                                                                                 headerTintColor: '#fff',
                                                                                 headerTitleStyle: {
                                                                                   fontWeight: 'bold',}}}/>
        <Stack.Screen name="inventario" component={Ginventario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;