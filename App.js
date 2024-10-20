// App.js
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import AllPost from './Screens/AllPost';
import Following from './Screens/Following';
import Profile from './Screens/Profile';
import CreatePost from './Screens/CreatePost';
import UserDetail from './Screens/UserDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs()
{
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Post" component={AllPost} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Following" component={Following} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="users" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

export default function App()
{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
