/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @AravindSaiThummala
 */

import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, StatusBar, Button, Keyboard,
  TouchableOpacity, TextInput, Animated } from 'react-native';
import Logo from "../components/Logo";
// AWS Amplify modular import
import Auth from '@aws-amplify/auth'
import { RED, goBack, BLUE } from './constants'
import Icon from 'react-native-vector-icons/FontAwesome';
// import  Header  from '../components/Header'
export default class SignIn extends Component {

constructor(props){
  super(props);
  this.state = {
    userEmail: "",
    userPassword: "",
    fadeIn: new Animated.Value(0),
    fadeOut: new Animated.Value(0),
    isHidden: false
  }
}

componentDidMount() {
  this.fadeIn()
}
fadeIn() {
  Animated.timing(
    this.state.fadeIn,
    {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }
  ).start()
  this.setState({isHidden: true})
}
fadeOut() {
  Animated.timing(
    this.state.fadeOut,
    {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }
  ).start()
  this.setState({isHidden: false})
}

// Sign in user with AWS AmplifyAuth & Cognito along with user input validations
async onLoginPressed() {
    const { userEmail, userPassword } = this.state
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if (userEmail=="" && userPassword==""){
      this.setState({Error:'You cannot login with an empty form, Please fill details and try again.'})
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
    else {
      await Auth.signIn(userEmail, userPassword)
      .then(user => {
        this.setState({ user })
        this.props.navigation.navigate('Main')
      })
      .catch(err => {
        if (! err.message) {
          console.log('Error when signing in: ', err)
          Alert.alert('Error when signing in: ', err)
        } else {
          console.log('Error when signing in: ', err.message)
          Alert.alert('Error when signing in: ', err.message)
        }
      })
    }
    Keyboard.dismiss();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}
      onPress={goBack(navigation)}>
      <Icon name="arrow-left" size={35} color="#1c313a" />
      </TouchableOpacity>
        <View style={styles.body}>
        <Logo/>
        <Text style={styles.errormsg}>
        {this.state.Error}
        </Text>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          autocomplete="off"
          keyboardType="email-address"
          onChangeText= {userEmail => this.setState({userEmail})}
          onFocus={() => this.fadeOut()}
          onEndEditing={() => this.fadeIn()} />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText= {userPassword => this.setState({userPassword})}
          onFocus={() => this.fadeOut()}
          onEndEditing={() => this.fadeIn()}
          autocomplete="off" />
          
        <TouchableOpacity style={styles.button}
        onPress={this.onLoginPressed.bind(this)}>
        <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgetPassword')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Forgotten password ?</Text>
        </TouchableOpacity>

        <View style={styles.signupTextcont}>
            <Text style={styles.signupText}>Don't have an account ? </Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}  >
            <Text style={styles.signupButton}>Sign up</Text>
          </TouchableOpacity>

        </View>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
  },
  signupTextCont : {
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
  buttonStyle: {
    padding: 20,
  },
});
