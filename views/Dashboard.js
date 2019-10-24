import React, { Component } from "react";
import { View } from "react-native";
import CustomTabNavigator from "../components/CustomTabNavigator";
import CustomHeader from "../components/CustomHeader";
// import Map from '../components/Map';
export default class Dashboard extends Component {
  static router = CustomTabNavigator.router;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader navigation={this.props.navigation} />

        <CustomTabNavigator navigation={this.props.navigation} />
      </View>
    );
  }
}
