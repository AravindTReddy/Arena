
//
//     <ScrollView>
//     <View><Text>Voltage</Text></View>
//
//
//
//           <View>
//   <Text>Bezier Line Chart</Text>
//   <LineChart
//     data={ dataa }
//     width={Dimensions.get("window").width} // from react-native
//     height={220}
//     yAxisLabel={"$"}
//     chartConfig={{
//       backgroundColor: "#e26a00",
//       backgroundGradientFrom: "#fb8c00",
//       backgroundGradientTo: "#ffa726",
//       decimalPlaces: 2, // optional, defaults to 2dp
//       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       style: {
//         borderRadius: 16
//       }
//     }}
//     bezier
//     style={{
//       marginVertical: 8,
//       borderRadius: 16
//     }}
//   />
// </View>
//
//
//                  </ScrollView>
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView, Button, Animated, AnimatedView, Dimensions
} from 'react-native';
// import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

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
    fetch('http://10.200.71.139:2020/normal')
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
