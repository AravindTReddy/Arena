import React, { Component } from "react";
import { View,Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import {
  Modal,
  TextInput,
  TouchableHighlight,
  ScrollView,
  PermissionsAndroid,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import wifi from 'react-native-android-wifi';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/8 ;
const CARD_WIDTH = width - 50;

type Props = {};

export default class Wifi4 extends Component {
  constructor(props){
    super(props);
    this.state = {
      wifiList: null,
      ssidExist: null,

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

  getWifiNetworksOnPress(){
    wifi.loadWifiList((wifiStringList) => {
        console.log(wifiStringList);
        var wifiArray = JSON.parse(wifiStringList);
        this.setState({
          wifiList:wifiArray,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF', padding:5, alignItems:'center' }}>
        <View>
        <Text style={styles.btnText}>There are Wi-Fi networks available for your Arena.</Text>
        <TouchableOpacity
    		onPress={this.getWifiNetworksOnPress.bind(this)}
    		style={styles.btn}>
    		<Text style={styles.heading}>Scan now</Text>
    		</TouchableOpacity>
        <Text style={styles.heading}>Choose a Network</Text>
        <View style={{elevation:2,borderBottomColor:'black',borderBottomWidth:1}}/>
        </View>

       <FlatList
       data={this.state.wifiList}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>
       <View style={styles.wifiList}>
       <View style={styles.wifiIcon}><Icon name="wifi" size={28} color="lightgray" /></View>
       <TouchableOpacity onPress={()=> navigate('Wifi5')}>
        <View style={styles.wifiName}>
          <Text style={{color:'black', fontSize:14, }}>{item.SSID}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.wifiIcon}><Icon name="lock" size={28} color="black" /></View>
      <View style={styles.wifiIcon1}><Icon name="chevron-right" size={28} color="lightgray" /></View>
       </View>
       }
       />
      <TouchableOpacity onPress={()=> navigate('Wifi6')}>
       <Text style={styles.btnText}>I can't find my network</Text>
      </TouchableOpacity>
       </View>


    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop:10,width:CARD_WIDTH,
    height:CARD_HEIGHT-30,
    backgroundColor: "#F7941D",
    borderRadius:5,
    marginVertical:10,alignItems:'center',
    justifyContent:'center',
  },
  btnText:{
		justifyContent:'center',
		color:'#000', textAlign:'center',
    margin:10,
	},
  heading:{
    margin:10, fontSize:20,
		color:'#000', textAlign:'center'
  },
  wifiList: {
    flexDirection:'row',
    margin:12,
    borderBottomColor:'gray',
    borderBottomWidth:1,
    width:CARD_WIDTH,
    height:CARD_HEIGHT-40,
  },
  wifiIcon: {
    marginRight:15,
  },
  wifiName: {
    marginRight:CARD_WIDTH/2.2,
  },
  wifiIcon1: {
    marginRight:5,
  }
  });
