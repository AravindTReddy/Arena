import React, { Component } from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height/3 ;
const CARD_WIDTH = width - 50;
export default class Wifi3 extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF', padding:5, alignItems:'center' }}>
        <Text style={styles.heading}>Connect to Your Arena</Text>
        <Text style={styles.btnText}>Go to your mobile settings and join your Arena's Wi-Fi network. Return to Brixon to continue setup.</Text>
        <Image
            style={styles.beagleImg}
             source={require('../../images/wifi_con.png')}
          />
        <TouchableOpacity
    		onPress={()=> navigate('Wifi4')}
    		style={styles.btn}>
    		<Text style={styles.btnText}>Next</Text>
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
