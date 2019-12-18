import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/8 ;
const CARD_WIDTH = width - 50;
// <View style={styles.devList}>
// <Text style={styles.heading}>Your devices</Text>
// </View>

export default class Wifi extends Component{
	render(){
		const { navigate } = this.props.navigation;
		return(
      <View style={styles.container}>
      <Text style={styles.heading}>Add your devices here</Text>

    		<TouchableOpacity
    		onPress={() => navigate('Wifi1')}
    		style={styles.btn1}>
    		<Text style={styles.btnText}>Add a Device</Text>
    		</TouchableOpacity>

    		<TouchableOpacity
    		onPress={()=> navigate('Wifi1')}
    		style={styles.btn2}>
    		<Text style={styles.btnText}>Add a Group</Text>
    		</TouchableOpacity>

      </View>
		);
	}
}
const styles = StyleSheet.create({
  container : {
    backgroundColor: '#F5FCFF',
    flex: 1,
    alignItems:'center',
  },
	btn1: {
    padding:10,margin:10,
		width:CARD_WIDTH,
    height:CARD_HEIGHT-25,
		marginTop:50,
    paddingVertical:12,
    backgroundColor: "lightgray",
    borderRadius:5,
    marginVertical:10,
  },
	btn2:{
		backgroundColor:'gray',
		padding:10,margin:10,width:CARD_WIDTH,
    height:CARD_HEIGHT-25,
		paddingVertical:12,
		borderRadius:5,
		marginVertical:10,
	},
	heading:{
		margin:10, fontSize:20,marginTop:30,
		color:'#000', textAlign:'center',marginBottom:10,alignItems:'center',
	},
	btnText:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center', alignItems:'center',

	},
	devList: {
    flex:1,
    backgroundColor: 'white',
    elevation: 3,
    width:'90%',
    flexDirection: 'row',
  },

});


AppRegistry.registerComponent('Wifi', () => Wifi);
