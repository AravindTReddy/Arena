import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, ScrollView, Dimensions
} from 'react-native';
import { Container, Header, Content, Badge, Icon } from 'native-base';
import { AreaChart, BarChart, LineChart, Grid, YAxis, XAxis, ProgressCircle } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import dateFns from 'date-fns';
// import { Dropdown } from 'react-native-material-dropdown';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/5 ;
const CARD_WIDTH = width/2;
export default class Frequency extends Component {
  constructor(){
    super();
    this.state = {
      data:[],
      freqData:[],
    }
    console.log('constructor');
  }
  fetchData = async()=>{
    console.log('function in componentDidMount');
      this.interval = setInterval(() => {
      const data = [];
      const freqData = [];
      fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/normal/10002')
      .then(response => response.json())
          .then(d => {
            d.forEach(function (vol) {
              data.push({
                value: vol.frequency,
                date: new Date(vol.time),
              });
              freqData.push(vol.frequency);
              });
            this.setState({
                data: data,
                freqData: freqData,
            });
          });
        }, 2000);
    }
componentDidMount(){
  console.log('componentDidMount');
  this.fetchData();
}

  render() {
    //console.log('render');
    const contentInset = { top: 20, bottom: 20 }
    const data1 = this.state.freqData
    const data3 = this.state.data
    //console.log(data3);
    const axesSvg = { fontSize: 12, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
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
            <Text style={styles.buttonText}>Frequency Plot</Text>
            <View style={styles.chart}>
            <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={data1}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    numberOfTicks={ 5 }

                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                 <LineChart
                    style={ { flex: 1 } }
                     data={ data3 }
                     yAccessor={({ item }) => item.value}
                     xAccessor={({ item }) => item.date}
                     contentInset={{ left: 10, right: 25 }}
                     xScale={scale.scaleTime}
                     numberOfTicks={10}
                     svg={ {
                         stroke: 'rgb(134, 65, 244)',
                     } }

                 >
                 <Grid/>

                 </LineChart>
                 <XAxis
                   data={data3}
                   svg={{
                       fill: 'black',
                       fontSize: 8,
                       fontWeight: 'bold',
                       rotation: 20,
                       originY: 30,
                      y: 5,
                   }}
                   xAccessor={({ item }) => item.date}
                   scale={scale.scaleTime}
                   numberOfTicks={10}
                   style={{ marginHorizontal: -15, height: 20 }}
                   contentInset={{ left: 15, right: 25 }}
                   formatLabel={(value) => dateFns.format(value, 'hh:mm:ss')}
                 />
                 </View>
             </View>
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
// <View style={{ height: 300, flexDirection: 'row', marginTop:10 }}>
// <YAxis
//     data={ data1 }
//     contentInset={ contentInset }
//     svg={{
//         fill: '#F7941D',
//         fontSize: 12,
//     }}
//     numberOfTicks={ 9 }
//     formatLabel={ value => `${value}` }
//  />
//       <LineChart
//           style={{ flex: 1}}
//           data={ data1 }
//           svg= {{ stroke: '#8800cc' }}
//           contentInset={ contentInset }
//       >
//           <Grid/>
//       </LineChart>
//   </View>
