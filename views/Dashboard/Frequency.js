import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, ScrollView,
} from 'react-native';
import { Container, Header, Content, Badge, Icon } from 'native-base';
import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Dropdown } from 'react-native-material-dropdown';

export default class Voltage extends Component {
  constructor(){
    super();
    this.state = {
      data:[],
      freqData:[],
    }
  }
  componentDidMount(){
    const data = [];
    fetch('http://192.168.1.7:2020/normal')
    .then(response => response.json())
        .then(data => {
          const freqData = [];
          data.forEach(function (vol) {
            freqData.push((vol.frequency));
          });
          this.setState({
              freqData: freqData,
              data:data
          });
        });
  }

  render() {
    const contentInset = { top: 20, bottom: 20 }
    const dataa = this.state.freqData
    // console.log();
    let dataf = [{
      value: '10001',
    }, {
      value: '10002',
    }, {
      value: '10003',
    }];
    return (
      <ScrollView>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text>OverView</Text>
        </View>
        <View style={styles.header2}>
        <Text>OverView</Text>

        </View>
      </View>
        <Text style={styles.buttonText}>Frequency Plots</Text>

        <Dropdown
        label='Select your unit/deviceID'
        data={dataf}
        />

          <View style={{ height: 200, flexDirection: 'row', marginTop:20 }}>

                <LineChart
                    style={{ flex: 1}}
                    data={ dataa }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </LineChart>
                <LineChart
                svg={{ stroke: 'rgb(104, 95, 44)' }}
                  style={StyleSheet.absoluteFill}
                  data={[60, 60, 60, 60, 60, 61, 61, 60, 60, 60, 60, 61, 60, 59, 59, 59, 60, 60, 60, 60]}>
                </LineChart>
            </View>
            <View>

            </View>


    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  topcontainer : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    height:200,
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'black',
    textAlign:'center'
  },
  header: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop:20,
  },
  header1: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    width: 170,
    marginTop: 10, marginBottom:10,
    marginRight: 10, marginLeft:10,
    justifyContent: 'center',
    elevation: 2,
  },
  header2: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    width: 170,
    marginTop: 10, marginBottom:10,
    marginRight: 10,
    justifyContent: 'center',
    elevation: 2,
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
