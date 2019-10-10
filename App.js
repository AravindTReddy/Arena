/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

//import Routes from './Routes';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Main from './pages/Main';


import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const RootStack = createStackNavigator({
  Login: Login,
  Signup: Signup,
  Home: Home,
  Main: Main,
},
{
  defaultNavigationOptions: {
       header: null
     },
    initialRouteName: 'Home'
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
