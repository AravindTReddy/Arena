/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, StatusBar, Button, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import Logo from "../components/Logo";
import { RED, goBack, BLUE } from './constants';
import Icon from 'react-native-vector-icons/FontAwesome';
// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

export default class ConfirmSignUp extends Component {

constructor(props){
  super(props);
  this.state = {
    userEmail: "",
    authCode: '',
    newPassword: '',
  }
}

// Request a new password
  async forgotPassword() {
    const { userEmail } = this.state
    if (userEmail==""){
      this.setState({Error:'Please enter Email address first'})
    }
    else {
      await Auth.forgotPassword(userEmail)
      .then(data => console.log('New code sent', data))
      .catch(err => {
        if (! err.message) {
          console.log('Error while setting up the new password: ', err)
          Alert.alert('Error while setting up the new password: ', err)
        } else {
          console.log('Error while setting up the new password: ', err.message)
          Alert.alert('Error while setting up the new password: ', err.message)
        }
      })
    }
  }
  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const { userEmail, authCode, newPassword } = this.state
    if (userEmail=="" && newPassword=="" && authCode==""){
      this.setState({Error:'Please fill all the details and try again.'})
    }
    else if (userEmail=="") {
      this.setState({Error:'Please enter Email address'})
    }
    else if(newPassword==""){
  	this.setState({Error:'Please enter new password'})
  	}
    else if (authCode=="") {
      this.setState({Error:'Please enter confirmation code'})
    }
    else {
      await Auth.forgotPasswordSubmit(userEmail, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate('SignIn')
        console.log('the New password submitted successfully')
      })
      .catch(err => {
        if (! err.message) {
          console.log('Error while confirming the new password: ', err)
          Alert.alert('Error while confirming the new password: ', err)
        } else {
          console.log('Error while confirming the new password: ', err.message)
          Alert.alert('Error while confirming the new password: ', err.message)
        }
      })
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.body}>
      <TouchableOpacity style={styles.backButton}
      onPress={goBack(navigation)}>
      <Icon name="arrow-left" size={35} color="#1c313a" />
      </TouchableOpacity>
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
          keyboardType={'email-address'}
          returnKeyType='go'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={false}
          onChangeText= {userEmail => this.setState({userEmail})}/>

        <TouchableOpacity style={styles.button}
        onPress={this.forgotPassword.bind(this)}>
        <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>

        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='New password'
          placeholderTextColor='#adb4bc'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText= {newPassword => this.setState({newPassword})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Confirmation code"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType={'numeric'}
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={false}
          onChangeText= {authCode => this.setState({authCode})}/>

        <TouchableOpacity style={styles.button}
        onPress={this.forgotPasswordSubmit.bind(this)}>
        <Text style={styles.buttonText}>Confirm new password</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  body : {
    backgroundColor:'#ffffff',
    flex: 1,
  },
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
  inputBox: {
    width:'90%',
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
    width:'90%',
    paddingVertical:12,
    backgroundColor: "#1c313a",
    borderRadius:25,
    marginVertical:10,
  },
  backButton: {
    borderRadius:25,
    paddingHorizontal:5,
    marginVertical:5,
  },
  errormsg: {
    color:"#F7941D",
  },
});
