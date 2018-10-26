import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const App = createStackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  Home: {screen: Home},
},
{
  initialRouteName: 'Login'
})

export default App;