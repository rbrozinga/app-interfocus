import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Colors from '../theme/colors';

const Stack = createStackNavigator();

type NavigationProps = {
  theme: Theme;
};

const Navigation = ({ theme }: NavigationProps) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: Colors.white,
          headerTitle: '',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Home}
          options={{
            gestureEnabled: false,
            headerTitle: '',
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
