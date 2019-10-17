/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

//import Routes from './Routes';

import Wifi from './wifi/Wifi';
import Wifi1 from './wifi/Wifi1';
import Wifi2 from './wifi/Wifi2';
import Wifi3 from './wifi/Wifi3';
import Wifi4 from './wifi/Wifi4';
import Wifi5 from './wifi/Wifi5';
import Wifi6 from './wifi/Wifi6';
import Wifi_test from './wifi/Wifi_test';
import CustomHeader from "../components/CustomHeader";
import {HeaderBackButton, createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const RootStack = createStackNavigator({
  Wifi: Wifi,
  Wifi1:Wifi1,
  Wifi2:Wifi2,
  Wifi3:Wifi3,
  Wifi4:Wifi4,
  Wifi5:Wifi5,
  Wifi6:Wifi6,
  Wifi_test:Wifi_test,
},
{
  defaultNavigationOptions: {
       headerTitle: 'Device Manager'
     },
    initialRouteName: 'Wifi'
});

const AppContainer = createAppContainer(RootStack);

export default class DevManager extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} />
        <AppContainer />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5FCFF',
    flex: 1,
  }
  });
