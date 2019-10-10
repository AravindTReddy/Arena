import React from 'react';
import { Button, TouchableOpacity, Text, View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomHeader from '../components/CustomHeader'
import CustomDrawerNavigator from "../components/CustomDrawerNavigator";
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";
import About from "../views/About";
import DevManager from "../views/DevManager"

const MainNavigator = createDrawerNavigator(
  {
    Dashboard: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name= "home" style={{ color: tintColor }} />
        ),
        drawerLabel: "Home"
      },
      screen: Dashboard
    },
    AddDevice: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="plus" style={{ color: tintColor }} />
        ),
        drawerLabel: "Device Manager"
      },
      screen: DevManager
    },
    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="cogs" style={{ color: tintColor }} />
        ),
        drawerLabel: "Settings"
      },
      screen: Settings
    },
    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="info-circle" style={{ color: tintColor }} />
        ),
        drawerLabel: "About"
      },
      screen: About
    }
  },
  {
    contentComponent: CustomDrawerNavigator
  }
);

const MainApp = createAppContainer(MainNavigator);
export default MainApp;
