import React, { Component } from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height/3 ;
const CARD_WIDTH = width - 50;
export default class Wifi4 extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF', padding:5, alignItems:'center' }}>
        <Text style={styles.heading}>Choose a Network</Text>
        <Text style={styles.btnText}>There are Wi-Fi networks available for your Arena.</Text>
        <TouchableOpacity
    		onPress={()=> navigate('Wifi5')}
    		style={styles.btn}>
    		<Text style={styles.btnText}>Scan now</Text>
    		</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  beagleImg : {
    marginTop: 10,
    width: CARD_WIDTH,
    marginVertical: 10,
  },
  btn: {
    padding:10,width:'90%',
    paddingVertical:12,
    backgroundColor: "#F7941D",
    borderRadius:25,
    marginVertical:10,alignItems:'center',
  },
  btnText:{
		margin:10,
		color:'#000', textAlign:'center'
	},
  heading:{
    margin:10, fontSize:20,
		color:'#000', textAlign:'center'
  }
  });
