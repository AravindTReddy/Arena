import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView, Button, Animated, AnimatedView, Dimensions
} from 'react-native';
import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

// const yAxis =
//   axisLeft(yScale)
//     .ticks(5)
//     .tickFormat(format(d3Config.numberFormat));
//
// const xAxis =
//   axisBottom(xScale)
//     .ticks(5)
//     .tickFormat(timeFormat(d3Config.dateFormat));

export default class Voltage extends Component {

  constructor(){
    super();
    this.state = {
      data:[],
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
            voltageData.push(parseInt(vol.voltage));
          });
          this.setState({
              data: voltageData
          });
            // console.log(this.state.data); array
        });
        }, 1000);
  }
  render() {
    const contentInset = { top: 20, bottom: 20 }
    const dataa = this.state.data
    console.log(dataa); //array
    return (
      <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={ dataa }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={ dataa }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </LineChart>
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
