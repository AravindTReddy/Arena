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
    authCode: '',
  }
}

async confirmSignUp() {
    const { navigation } = this.props;
    const { userEmail } = navigation.state.params
    const { authCode } = this.state
    if (authCode=="") {
      this.setState({Error:'Please enter confirmation code'})
    }
    else {
      await Auth.confirmSignUp(userEmail, authCode)
      .then(user => {
        this.props.navigation.navigate('SignIn')
      })
      .catch(err => {
        if (! err.message) {
          console.log('Error when entering confirmation code: ', err)
          Alert.alert('Error when entering confirmation code: ', err)
        } else {
          console.log('Error when entering confirmation code: ', err.message)
          Alert.alert('Error when entering confirmation code: ', err.message)
        }
      })
    }
  }

  async resendconfirmSignUp() {
    const { userEmail } = navigation.state.params
    await Auth.resendSignUp(userEmail)
    .then(() => console.log('Confirmation code resent successfully'))
    .catch(err => {
      if (! err.message) {
        console.log('Error requesting new confirmation code: ', err)
        Alert.alert('Error requesting new confirmation code: ', err)
      } else {
        console.log('Error requesting new confirmation code: ', err.message)
        Alert.alert('Error requesting new confirmation code: ', err.message)
      }
    })
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
        onPress={this.confirmSignUp.bind(this)}>
        <Text style={styles.buttonText}>Confirm SignUp</Text>
        </TouchableOpacity>

        <View style={styles.signupTextcont}>
            <Text style={styles.signupText}>Didn't received the code ? </Text>
          <TouchableOpacity
          onPress={this.resendconfirmSignUp.bind(this)}>
            <Text style={styles.signupButton}>Resend code</Text>
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
