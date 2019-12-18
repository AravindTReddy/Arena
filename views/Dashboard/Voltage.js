import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, ScrollView, Dimensions
} from 'react-native';
import { Container, Header, Content, Badge, Icon } from 'native-base';
import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
// import { Dropdown } from 'react-native-material-dropdown';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/5 ;
const CARD_WIDTH = width/2;
export default class Voltage extends Component {
  constructor(){
    super();
    this.state = {
      data:[],
      vdata1:[],
      vdata2:[],
    }
  }
  componentDidMount(){
    this.interval = setInterval(() => {
    const data = [];
    fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/normal/10014')
    .then(response => response.json())
        .then(data => {
          const vdata1 = [];
          data.forEach(function (vol) {
            vdata1.push(vol.voltage);
          });
          this.setState({
              vdata1: vdata1,
              data: data
          });
        });
        fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/normal/10002')
        .then(response => response.json())
            .then(data => {
              const vdata2 = [];
              data.forEach(function (vol) {
                vdata2.push(vol.voltage);
              });
              this.setState({
                  vdata2: vdata2,
              });

            });
      }, 2000);
  }

  render() {
    const data1 = this.state.vdata1
    const data2 = this.state.vdata2
    // console.log(data1);
      return (
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text>OverView</Text>
        </View>
        <View style={styles.header2}>
        <Text>OverView</Text>

        </View>
      </View>
        <Text style={styles.buttonText}>Voltage Plots</Text>

          <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
          <YAxis
              data={ data1 }
              contentInset={ { top: 20, bottom: 20 } }
              svg={{
                  fill: '#F7941D',
                  fontSize: 12,
              }}
              numberOfTicks={ 7 }
              formatLabel={ value => `${value}` }
          />
                <LineChart
                    style={{ flex: 1}}
                    data={ data1 }
                    svg={{ stroke: 'rgba(34, 128, 176, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                >
                    <Grid/>
                </LineChart>
            </View>

            </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'black',
    textAlign:'center',
    padding:5,
  },
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding:10,
  },
  header1: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    height: CARD_HEIGHT,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    width: CARD_WIDTH-20,
    justifyContent: 'center',
    elevation: 2,
    margin:5,
  },
  header2: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    height: CARD_HEIGHT,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    width: CARD_WIDTH-20,
    justifyContent: 'center',
    elevation: 2,
    margin:5,
  },
});
// <FlatList
// data={this.state.data}
// keyExtractor={(item,index) => index.toString()}
// renderItem={({item}) =>
//
// <View>
//    <Text style={{color:'#F7941D', fontWeight:'bold'}}>ID: {item.unitID}</Text>
//    <Text style={{color:'#F7941D'}}>Frequency: {item.frequency}</Text>
//    <Text>Host: {item.host}</Text>
//   </View>
// }
// />
