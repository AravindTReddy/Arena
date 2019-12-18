import React, { Component } from "react";
import { Alert, Text, View, StyleSheet, StatusBar, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import CustomHeader from "../components/CustomHeader";
import Auth from '@aws-amplify/auth'
export default class Settings extends Component {
  state = {
    password1: '',
    password2: '',
  }
  // Change user password for the app
  changePassword = async () => {
    const { password1, password2 } = this.state
    await Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, password1, password2)
    })
    .then(data => console.log('Password changed successfully', data))
    .catch(err => {
      if (! err.message) {
        console.log('Error changing password: ', err)
        Alert.alert('Error changing password: ', err)
      } else {
        console.log('Error changing password: ', err.message)
        Alert.alert('Error changing password: ', err.message)
      }
    })
  }
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out from the app?',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        {text: 'OK', onPress: () => this.signOut()},
      ],
      { cancelable: false }
    )
  }
  signOut = async () => {
    await Auth.signOut()
    .then(() => {
      console.log('Sign out complete')
      this.props.navigation.navigate('Hello')
    })
    .catch(err => console.log('Error while signing out!', err))
  }

  render() {
    return (
      <View style={styles.container}>
      <CustomHeader navigation={this.props.navigation} />
      <View style={styles.body}>
      <Text style={styles.titleText}>Change your password</Text>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Old Password"
          placeholderTextColor="#ffffff"
          onChangeText= {password1 => this.setState({password1})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="New Password"
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input }
          onChangeText= {password2 => this.setState({password2})}/>

        <TouchableOpacity style={styles.button}
        onPress={this.changePassword.bind(this)}>
        <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
        onPress={this.signOutAlert.bind(this)}>
        <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginBottom:100
  },
  body : {
    alignItems:'center',
    justifyContent :'center'
  },
  titleText:{
    marginVertical:10,
    fontSize:16,
  	fontWeight:'500',
    paddingBottom:10,
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
