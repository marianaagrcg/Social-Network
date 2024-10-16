import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import AllPost from './Screens/AllPost';
import Following from './Screens/Following';
import Profiel from './Screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Función para el Tab Navigator
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Post" component={AllPost} />
      <Tab.Screen name="Following" component={Following} />
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator */}
      <Stack.Navigator>
        {/* Pantallas de autenticación */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Anidando el Tab Navigator dentro del Stack Navigator */}
        <Stack.Screen 
          name="Home" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}