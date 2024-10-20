// App.js
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/LoginScreen';
import SignUp from './Screens/SignUpScreen';
import AllPost from './Screens/AllPostsScreen';
import Following from './Screens/FollowingScreen';
import Profile from './Screens/ProfileScreen';
import CreatePost from './Screens/CreatePostScreen';
import UserDetail from './Screens/UserDetailScreen';

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
