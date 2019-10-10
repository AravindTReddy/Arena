import React, { Component } from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height/2 ;
const CARD_WIDTH = width - 50;
export default class Wifi2 extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF', padding:5, alignItems:'center' }}>
        <Text style={styles.heading}>Power Up Your Arena Device</Text>
        <Text style={styles.btnText}>Plug in your Arena box and wait for 15 seconds for Wifi to pickup.</Text>
        <Image
            style={styles.beagleImg}
             source={require('../../images/arena_powerup.jpg')}
          />
        <TouchableOpacity
    		onPress={()=> navigate('Wifi3')}
    		style={styles.btn}>
    		<Text style={styles.btnText}>Next</Text>
    		</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  beagleImg : {
    marginTop: 15,
    width: CARD_WIDTH,
    marginVertical: 10,
    borderRadius:10,
  },
  btn: {
    padding:10,marginTop:40,width:'90%',
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
