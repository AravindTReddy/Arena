import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View,
  PermissionsAndroid
} from 'react-native';
import wifi from 'react-native-android-wifi';

type Props = {};
export default class Wifi6 extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      ssid: null,
      pass: null,
    };
  }

  componentDidMount (){
    console.log(wifi);
    this.askForUserPermissions();
  }

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }


  connectOnPress(){
    wifi.findAndConnect(this.state.ssid, this.state.pass, (found) => {
      this.setState({ssidExist:found});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Configure your wifi</Text>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Sign device into a specific network:</Text>
          <Text style={styles.instructions}>SSID</Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            onChangeText={(event)=>this.state.ssid=event}
            value={this.state.ssid}
            placeholder={'ssid'} />
          <Text style={styles.instructions}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(event)=>this.state.pass=event}
            value={this.state.pass}
            placeholder={'password'} />
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.connectOnPress.bind(this)}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableHighlight>
            <Text style={styles.answer}>{this.state.ssidExist==null?"":this.state.ssidExist?"Network in range :)":"Network out of range :("}</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: '#F5FCFF',
    marginBottom:100
  },
  row:{
    flexDirection:'row'
  },
  title: {
    fontSize: 20,
  },
  instructionsContainer: {
    padding:15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  instructionsTitle: {
    marginBottom:10,
    color: '#333333'
  },
  instructions: {
    color: '#333333'
  },
  button:{
    padding:5,
    width:120,
    alignItems: 'center',
    backgroundColor:"#F7941D",
    marginRight: 15,
  },
  bigButton:{
    padding:5,
    width:180,
    alignItems: 'center',
    backgroundColor:"#F7941D",
    marginRight: 15,
  },
  buttonText:{
    color:'white'
  },
  answer:{
    marginTop: 5,
  }
});
