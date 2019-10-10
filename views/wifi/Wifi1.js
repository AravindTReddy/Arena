import React, { Component } from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity } from "react-native";


export default class Wifi1 extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF', padding:15 }}>
      <Text style={styles.heading}>Pick Your Device</Text>

      <TouchableOpacity onPress={() => navigate('Wifi2')}>
      <Image
          style={styles.beagleImg}
           source={require('../../images/beagle_logo_326x60.png')}
        />
        <Text style={styles.DevName}>Beagle bone black wireless</Text>
        </TouchableOpacity>
        <View style={{borderBottomColor: 'lightgray',borderBottomWidth: 1}}/>

        <TouchableOpacity onPress={() => navigate('Wifi2')}>
        <Image
            style={styles.beagleImg}
             source={require('../../images/beagle_logo_326x60.png')}
          />
          <Text style={styles.DevName}>Beagle bone black wired</Text>
          </TouchableOpacity>
        <View style={{borderBottomColor: 'lightgray',borderBottomWidth: 1}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  beagleImg : {
    marginTop: 15,
    alignItems:'center',
    marginVertical: 10,
    marginRight:15,
  },
  heading:{
    marginRight:15, fontSize:20,
    color:'#000', textAlign:'center',marginBottom:30,
  },
  DevName:{
    textAlign:'center',
    marginBottom:10,
  }
  });
