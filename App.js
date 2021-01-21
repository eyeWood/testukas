import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home';
import Page from './screens/page';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Test App' }} />
        <Stack.Screen name="Page" component={Page} options={{ title: 'Page' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}