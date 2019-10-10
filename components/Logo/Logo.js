import React, {Component} from 'react';
import { View, StatusBar, Text, StyleSheet, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image
          style={{width: 300, height: 150}}
           source={require('../../images/logo.png')}
        />
      <Text style={styles.logoText}>Welcome to the Arena</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    flexGrow: 0.5,
    marginTop: 15,
    alignItems: 'center'
  },
  logoText: {
    fontSize:18,
    marginVertical: 10,
  },
});
