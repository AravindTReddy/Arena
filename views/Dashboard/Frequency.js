import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, ScrollView, Dimensions
} from 'react-native';
import { Container, Header, Content, Badge, Icon } from 'native-base';
// import { AreaChart, BarChart, LineChart, Grid, YAxis, ProgressCircle } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Dropdown } from 'react-native-material-dropdown';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

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
    fetch('http://10.200.159.78:2020/normal')
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
    console.log("hi");
    let dataf = [{
      value: '10001',
    }, {
      value: '10002',
    }, {
      value: '10003',
    }];
    const line = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          strokeWidth: 2, // optional
        },
      ],
    };

    return (

    <View>
<Text>
Bezier Line Chart
</Text>
<LineChart
data={ line }
width={Dimensions.get('window').width} // from react-native
height={220}
yAxisLabel={'$'}
chartConfig={{
backgroundColor: '#e26a00',
backgroundGradientFrom: '#fb8c00',
backgroundGradientTo: '#ffa726',
decimalPlaces: 2, // optional, defaults to 2dp
color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
style: {
borderRadius: 16
}
}}
bezier
style={{
marginVertical: 8,
borderRadius: 16
}}
/>
<Text>
Bar chart
</Text>
<BarChart
    // style={graphStyle}
    data={ line }
    width={Dimensions.get('window').width}
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
    borderRadius: 16
    }
    }}
/>
</View>
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
