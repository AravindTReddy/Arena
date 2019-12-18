import React, {Component} from 'react'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { Keyboard, View, Text, StyleSheet, Dimensions, Platform, Picker, Button, TouchableOpacity } from 'react-native'
import { Circle, G, Line, Rect, Path  } from 'react-native-svg'
import dateFns from 'date-fns'
import * as scale from 'd3-scale'
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/5 ;
const CARD_WIDTH = width/2;
class Phase extends Component {
  constructor(){
    super();
    this.state ={
      data:[],
      freqData:[],
      value:'',
    }
    console.log('constructor');
  }
//   fetchData = async()=>{
//     console.log('function in componentDidMount');
//       // const response = await fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/location');
//       // const times = await response.json();
//       // this.setState({data:times});
//       this.interval = setInterval(() => {
//       const data = [];
//       const freqData = [];
//
//       fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/normal/10014')
//       .then(response => response.json())
//           .then(d => {
//             d.forEach(function (vol) {
//               data.push({
//                 value: vol.frequency,
//                 date: new Date(vol.time),
//               });
//               freqData.push(vol.frequency);
//               });
//             this.setState({
//                 data: data,
//                 freqData: freqData,
//             });
//           });
//         }, 2000);
//     }
// componentDidMount(){
//   console.log('componentDidMount');
//   this.fetchData();
// }

onpickerPressed() {
    //console.log('onValueChange');
    if(this.state.value){
    var id = this.state.value;
    this.state.data = [];
    this.interval = setInterval(() => {
      const freqData = [];
      const data = [];
    fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/unitID', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         unitID: id,
      }),
    })
    .then((response) => response.json())
       .then((responseJson)=>{
         //console.log(responseJson);
          responseJson.forEach(function (vol) {
            data.push({
              value: vol.frequency,
              date: new Date(vol.time),
            });
            freqData.push(vol.frequency);
            //console.log(data);dateFns.setHours(new Date(2018, 0, 0), 42),
            });
          this.setState({
              data: data,
              freqData: freqData,
          });
        })
        .catch((error)=>{
          console.error(error);
        });
    }, 2000);

   Keyboard.dismiss();
  }
  else{
    alert("Please Select a Option");
  }
  }

    render() {
      console.log('render');
      const data1 = this.state.freqData
      const data3 = this.state.data
      //console.log(data3);
      //grid was there
        const axesSvg = { fontSize: 12, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = 30;
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
          <View style={styles.pickerArea}>
          <Picker
          		style={styles.picker}
          		selectedValue={this.state.value}
              onValueChange={(value, index) => { this.setState({value: value}) }}
          		>
          		<Picker.Item label="Select a option" value=""/>
          		<Picker.Item label="10015" value="10015" />
          		<Picker.Item label="10014" value="10014" />
              <Picker.Item label="10011" value="10011" />
              <Picker.Item label="10006" value="10006" />
              <Picker.Item label="10003" value="10003" />
          		<Picker.Item label="10002" value="10002" />
          </Picker>
          <TouchableOpacity style={styles.button}
          onPress={this.onpickerPressed.bind(this)}>
          <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.chart}>
           <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
               <YAxis
                   data={data1}
                   style={{ marginBottom: xAxisHeight }}
                   contentInset={verticalContentInset}
                   svg={axesSvg}
                   numberOfTicks={10}
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
        )
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
  pickerArea:{
    width: 400,
    height: 44,
    margin: 10,
    flexDirection:'row',
  },
  picker: {
    width: 200,
    height: 44,
    margin: 10,
  },
});
export default Phase
