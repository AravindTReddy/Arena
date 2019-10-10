import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Animated} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    data:[],
    lonData:[],
    latData:[],
    markers: [

    ],
    region: {
      latitude: 35.52220671242907,
      longitude: -84.6653281029795,
      latitudeDelta: 1,
      longitudeDelta: 1,
    },
    isMapReady: false,
  }
}

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }
  componentDidMount(){

    fetch('http://10.200.136.16:2020/location')
      .then(response => response.json())
        .then(data => {
            var elements = data.map(function(e) {
              return {
              coordinate: {
                  latitude: e.latitude,
                  longitude: e.longitude
              },
              title: e.host,
              description: e.topic
            }
           });
            this.setState({
              markers: elements,
              data:data
            });
          });
        }

  render(){
    const dataa = this.state.data
    console.log(dataa)
    console.log
    return(
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={this.state.region}
        // customMapStyle={mapStyle}
        onLayout={this.onMapLayout}
      >
      {this.state.markers.map((marker, index) => {
      return (
      <MapView.Marker key={index} coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}>
      </MapView.Marker>
      );
      })}
      </MapView>

      </View>
    )

  }
}


const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
});
