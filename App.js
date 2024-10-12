import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Posts from './Screens/Posts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ 
            headerTitleAlign: 'center',
            title: 'Login', 
          }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ 
            headerTitleAlign: 'center', 
            title: 'Sign Up',
          }} 
        />
        <Stack.Screen 
          name="Posts" 
          component={Posts} 
          options={{ 
            headerTitleAlign: 'center', 
            title: 'Posts',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({


});
