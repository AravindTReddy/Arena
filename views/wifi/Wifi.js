import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';

// <View style={styles.devList}>
// <Text style={styles.heading}>Your devices</Text>
// </View>

export default class Wifi extends Component{
	render(){
		const { navigate } = this.props.navigation;
		return(
      <View style={styles.container}>
      <Text style={styles.heading}>Add your devices here</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}/>
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
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}/>

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
    padding:10,margin:10,width:'80%',marginTop:50,
    paddingVertical:12,
    backgroundColor: "lightgray",
    borderRadius:25,
    marginVertical:10,
  },
	btn2:{
		backgroundColor:'gray',
		padding:10,margin:10,width:'80%',
		paddingVertical:12,
		borderRadius:25,
		marginVertical:10,
	},
	heading:{
		margin:10, fontSize:20,marginTop:30,
		color:'#000', textAlign:'center',marginBottom:30,
	},
	btnText:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'

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
