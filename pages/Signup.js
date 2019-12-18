/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, StatusBar, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Logo from "../components/Logo";
import { RED, goBack, BLUE } from './constants'
// AWS Amplify modular import
import Auth from '@aws-amplify/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class SignUp extends Component {

constructor(props){
  super(props);
  this.state = {
    userEmail: "",
    userPassword:"",
    userpasswordConfirmation: ""
  }
}
// Sign up user with AWS AmplifyAuth & Cognito along with user input validations
async onSignupPressed() {
    const {  userEmail, userPassword, userpasswordConfirmation  } = this.state
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if (userEmail=="" && userPassword=="" && userpasswordConfirmation==""){
      this.setState({Error:'You cannot submit an empty form, Please fill details and try again.'})
    }
    else if (userEmail=="") {
      this.setState({Error:'Please enter Email address'})
    }
    else if(reg.test(userEmail) === false){
  	this.setState({Error:'Email is Not Correct'})
  	return false;
  	}
    else if(userPassword==""){
  	this.setState({Error:'Please enter password'})
  	}
    else if(userpasswordConfirmation==""){
  	this.setState({Error:'Please confirm your password'})
  	}
    else if(userPassword.length <5){
    this.setState({Error: 'Password  must be more than 6 characters and include an numerical value'});
    }
    else if (userPassword !== userpasswordConfirmation) {
      this.setState({Error: 'Passwords do not match!'});
    }
    else {
      await Auth.signUp(userEmail, userPassword)
      .then(user => {
        this.props.navigation.navigate('ConfirmSignUp', {
                userEmail: this.state.userEmail,
              });
      })
      .catch(err => {
        if (! err.message) {
          console.log('Error when signing up: ', err)
          Alert.alert('Error when signing up: ', err)
        } else {
          console.log('Error when signing up: ', err.message)
          Alert.alert('Error when signing up: ', err.message)
        }
      })
    }
      Keyboard.dismiss();
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
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
          onChangeText= {userEmail => this.setState({userEmail})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input }
          secureTextEntry={true}
          onChangeText= {userPassword => this.setState({userPassword})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Confirm Password"
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input }
          secureTextEntry={true}
          onChangeText= {userpasswordConfirmation => this.setState({userpasswordConfirmation})}/>

        <TouchableOpacity style={styles.button}
        onPress={this.onSignupPressed.bind(this)}>
        <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>

        <View style={styles.signupTextcont}>
          <Text style={styles.signupText}>Already have an account ? </Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignIn')}  >
            <Text style={styles.signupButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent :'center'
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
