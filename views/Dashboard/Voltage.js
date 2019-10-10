import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView, Button, Animated, AnimatedView
} from 'react-native';
import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default class Voltage extends Component {

  constructor(){
    super();
    this.state = {
      data:[],
    }
  }
  //10.0.0.198:2020
  componentDidMount(){
    const data = [];
    fetch('http://10.200.159.78:2020/normal')
    .then(response => response.json())
        .then(data => {
          const voltageData = [];
          data.forEach(function (vol) {
            voltageData.push((vol.voltage));
          });
          this.setState({
              data: voltageData
          });
            // console.log(this.state.data); array
        });
  }
  render() {
    const contentInset = { top: 20, bottom: 20 }
    const dataa = this.state.data
    console.log(dataa); //array
    return (

      <ScrollView>
      <View><Text>Voltage</Text></View>
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


            <AreaChart
                       style={{ height: 350 }}
                       data={ dataa }
                       contentInset={{ top: 30, bottom: 30 }}
                       curve={ shape.curveNatural }
                       svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                   >
                       <Grid/>
                   </AreaChart>


                   <LineChart
                             style={{ height: 350 }}
                             data= {dataa}
                             svg={{ stroke: 'rgb(134, 65, 244)' }}

                         >
                             <Grid/>
                         </LineChart>

                   </ScrollView>


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
