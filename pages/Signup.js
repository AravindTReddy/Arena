/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Logo from "../components/Logo";

export default class Signup extends Component {

constructor(props){
  super(props);
  this.state = {
    userEmail: "",
    userName:"",
    userPassword: ""
  }
}
onRegisterPressed(){
  const userEmail = this.state.userEmail; //can use state in any way
  const userName = this.state.userName;
  const {userPassword} = this.state;
  //user input basic validations
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(userEmail==""){
		//alert("Please enter Email address");
	  this.setState({Error:'Please enter Email address'})
	}
	else if(reg.test(userEmail) === false)
	{
	//alert("Email is Not Correct");
	this.setState({Error:'Email is Not Correct'})
	return false;
	}
  else if(userName==""){
	this.setState({Error:'Please enter your full name'})
  //alert("Please enter password");
	}
	else if(userPassword==""){
	this.setState({Error:'Please enter password'})
  //alert("Please enter password");
	}
  else if(userPassword.length <5){
  this.setState({Error: 'password  must be more than 6 characters'});
  }
  else{
  //alert('thank you, your form is submitted successfully');
  this.setState({Error: 'Thank you, registration successfull! Please login Now!'});
  }
  Keyboard.dismiss();
}

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
          onSubmitEditing={() => this.password.focus()}
          onChangeText= {userEmail => this.setState({userEmail})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Full Name"
          placeholderTextColor="#ffffff"
          onChangeText= {userName => this.setState({userName})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input }
          onChangeText= {userPassword => this.setState({userPassword})}/>

        <TouchableOpacity style={styles.button}
        onPress={this.onRegisterPressed.bind(this)}>
        <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.signupTextcont}>
          <Text style={styles.signupText}>Already have an account ? </Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}  >
            <Text style={styles.signupButton}>Sign in</Text>
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
    justifyContent :'center'
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
