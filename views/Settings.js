import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar, Button, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import CustomHeader from "../components/CustomHeader";

export default class Settings extends Component {

  // onSubmitPressedI(){
  //   alert("Password changed successfully")
  // }

  render() {
    return (
      <View style={styles.container}>
      <CustomHeader navigation={this.props.navigation} />
      <Text style={styles.titleText}>Reset your password</Text>
      <View style={styles.body}>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Current Password"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
          onChangeText= {curPassword => this.setState({curPassword})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="New Password"
          placeholderTextColor="#ffffff"
          onChangeText= {newPassword => this.setState({newPassword})}/>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Confirm New Password"
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input }
          onChangeText= {anewPassword => this.setState({anewPassword})}/>

        <TouchableOpacity style={styles.button}
        onPress={() => {
          alert("Password changed successfully")
        }}>
        <Text style={styles.buttonText}>Submit</Text>
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
