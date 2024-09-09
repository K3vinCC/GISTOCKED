import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Home1 from './src/screens/Home1'; // Assuming you'll create this for testing
import { enableScreens } from 'react-native-screens';
import 'react-native-safe-area-context';
const Stack = createStackNavigator();
enableScreens();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Home1" component={Home1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;