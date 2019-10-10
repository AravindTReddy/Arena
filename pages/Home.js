import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';
import Logo from '../components/Logo';
export default class Home extends Component{
		
	render(){
		const { navigate } = this.props.navigation;
		return(
      <View style={styles.container}>
        <Logo/>
    		<TouchableOpacity
    		onPress={() => navigate('Login')}
    		style={styles.btn1}>
    		<Text style={styles.btnText}>Login</Text>
    		</TouchableOpacity>

    		<TouchableOpacity
    		onPress={()=> navigate('Signup')}
    		style={styles.btn2}>
    		<Text style={styles.btnText}>Register</Text>
    		</TouchableOpacity>

      </View>
		);
	}
}
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
	btn1: {
    padding:10,margin:10,width:'90%',
    paddingVertical:12,
    backgroundColor: "#F7941D",
    borderRadius:25,
    marginVertical:10,
  },
	btn2:{
		backgroundColor:'gray',
		padding:10,margin:10,width:'90%',
		paddingVertical:12,
		borderRadius:25,
		marginVertical:10,
	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
	btnText:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'

	},
	navhead: {
    height: 55,
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

});


AppRegistry.registerComponent('Home', () => Home);
