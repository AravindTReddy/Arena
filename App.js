/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

//import Routes from './Routes';
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Hello from './pages/Hello';
import Main from './pages/Main';
import Settings from './views/Settings'
import ConfirmSignUp from './pages/ConfirmSignUp';
import ForgetPassword from './pages/ForgetPassword';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

const RootStack = createStackNavigator({
  Hello: Hello,
  SignIn: SignIn,
  SignUp: SignUp,
  ConfirmSignUp: ConfirmSignUp,
  ForgetPassword: ForgetPassword,
  Main: Main,
  Settings:Settings
},
{
  defaultNavigationOptions: {
       header: null
     },
    initialRouteName: 'Hello'
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
