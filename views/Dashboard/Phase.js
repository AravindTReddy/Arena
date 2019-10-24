import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView, Button, Animated, AnimatedView, Dimensions
} from 'react-native';
import { AreaChart, BarChart, LineChart, Grid, XAxis, YAxis, ProgressCircle, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

export default class Phase extends Component {

  constructor(){
    super();
    this.state = {
      data:[],
      voltageData:[]
    }
  }
  //10.0.0.198:2020

  componentDidMount(){
    this.interval = setInterval(() => {
    const data = [];
    fetch('http://192.168.1.7:2020/normal')
    .then(response => response.json())
        .then(data => {
          const voltageData = [];
          data.forEach(function (vol) {
           // voltageData.push(parseInt(vol.voltage));
          voltageData.push({
                  x: vol.voltage,
                  y: vol.time,
                });
          });
          this.setState({
              voltageData: voltageData,
              data:data
          });
            // console.log(this.state.data); array
        });
      }, 10000);
  }
  render() {
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 20, bottom: 20 }
    const xAxisHeight = 30
    const voldata = this.state.voltageData
    const data = this.state.data
    console.log(data);
    console.log(voldata); //array
    return (
      <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
         <YAxis
             data={voldata}
             style={{ marginBottom: xAxisHeight }}
             contentInset={verticalContentInset}
             svg={axesSvg}
         />
         <View style={{ flex: 1, marginLeft: 10 }}>
             <LineChart
                 style={{ flex: 1 }}
                 data={voldata}
                 contentInset={verticalContentInset}
                 svg={{ stroke: 'rgb(134, 65, 244)' }}
             >
                 <Grid/>
             </LineChart>
             <XAxis
                 style={{ marginHorizontal: 10, height: xAxisHeight }}
                 data={data}

                 contentInset={{ left: 10, right: 10 }}
                 svg={axesSvg}
             />
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
    fontWeight: 'bold'
  }

});
