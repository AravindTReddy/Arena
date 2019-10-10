import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from "../../views/Dashboard/Profile";
import Frequency from "../../views/Dashboard/Frequency";
import Voltage from "../../views/Dashboard/Voltage";
import Phase from "../../views/Dashboard/Phase";

const TabNavigator = createBottomTabNavigator({
  Profile:  { screen: Profile,
      navigationOptions: {
      tabBarLabel:"Home",
      tabBarOptions: {
          showIcon: true
        },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={28} color="#F7941D" />
            )
          },
        },
  Frequency: { screen: Frequency,
    navigationOptions: {
    tabBarLabel:"Frequency",
    tabBarOptions: {
        showIcon: true
      },
    tabBarIcon: ({ tintColor }) => (
      <Icon name="wifi" size={28} color="#F7941D" />
          )
        },
   },
  Voltage: { screen: Voltage,
    navigationOptions: {
    tabBarLabel:"Voltage",
    tabBarOptions: {
        showIcon: true
      },
    tabBarIcon: ({ tintColor }) => (
      <Icon name="plug" size={28} color="#F7941D" />
          )
        },
   },
  Phase: {screen:Phase,
    navigationOptions: {
    tabBarLabel:"Phase",
    tabBarOptions: {
        showIcon: true
      },
    tabBarIcon: ({ tintColor }) => (
      <Icon name="adn" size={28} color="#F7941D" />
          )
        },
  },
});

export default createAppContainer(TabNavigator);
