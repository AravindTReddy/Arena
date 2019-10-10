/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Button, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import Logo from "../components/Logo";

export default class Login extends Component {

constructor(props){
  super(props);
  this.state = {
    userEmail: "",
    userPassword: ""
  }
}
onLoginPressed(){
this.props.navigation.navigate("Main");
}

// onLoginPressed(){
//   const userEmail = this.state.userEmail; //can use state in any way
//   const {userPassword} = this.state;
//   //user input basic validations
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
// 	if(userEmail==""){
// 		//alert("Please enter Email address");
// 	  this.setState({Error:'Please enter Email address'})
// 	}
// 	else if(reg.test(userEmail) === false)
// 	{
// 	//alert("Email is Not Correct");
// 	this.setState({Error:'Email is Not Correct'})
// 	return false;
// 	}
// 	else if(userPassword==""){
// 	this.setState({Error:'Please enter password'})
//   //alert("Please enter password");
// 	}
// 	else{
//   fetch('http://192.168.1.3:2020/users', {
//      method: 'POST',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify({
//        email: userEmail,
//        password: userPassword,
//     }),
//   })
//   .then((response) => response.json())
//   	 .then((responseJson)=>{
//   		 if(responseJson == userPassword){
//   			 // redirect to profile page
//   			 alert("Successfully Login");
//   			 this.props.navigation.navigate("Profile");
//   		 }else{
//   			 alert("Wrong Login Details");
//   		 }
//   	 })
//   .catch((error)=>{
//     console.error(error);
//   });
//   }
//  Keyboard.dismiss();
// }
  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Text style={styles.errormsg}>
        {this.state.Error}
        </Text>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText= {userEmail => this.setState({userEmail})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText= {userPassword => this.setState({userPassword})}/>

        <TouchableOpacity style={styles.button}
        onPress={this.onLoginPressed.bind(this)}>
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupTextcont}>
            <Text style={styles.signupText}>Don't have an account ? </Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}  >
            <Text style={styles.signupButton}>Sign up</Text>
          </TouchableOpacity>

        </View>
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
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'black',
  	fontSize:16
  },
  signupButton: {
  	color:'black',
  	fontSize:16,
  	fontWeight:'500',
    alignItems:'center',
  },
  body: {
    justifyContent: 'center',
    flexGrow:1,
    alignItems: 'center',
  },
  inputBox: {
    width:300,
    backgroundColor: "gray",
    borderRadius:25,
    paddingHorizontal:16,
    marginVertical:5,
  },
  buttonText: {
    fontWeight:"500",
    color: "#ffffff",
    borderRadius:25,
    textAlign: 'center',
  },
  button: {
    width:300,
    paddingVertical:12,
    backgroundColor: "#1c313a",
    borderRadius:25,
    marginVertical:10,
  },
  errormsg: {
    color:"#F7941D",
  },
});
