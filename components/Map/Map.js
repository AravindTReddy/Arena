import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Animated, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 10;
const CARD_WIDTH = CARD_HEIGHT - 20;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    data:[],
    markers: [],
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
    fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/location')
      .then(response => response.json())
        .then(data => {
            var elements = data.filter(e => !!e.latitude && !!e.longitude).map(function(e) {
              return {
                coordinate: {
                    latitude: e.latitude,
                    longitude: e.longitude
                },
                title: e.unitID,
                description: e.topic
            }
           });
            this.setState({
              markers: elements,
              data:data
            });
          });
          this.index = 0;
          this.animation = new Animated.Value(0);
      // We should detect when scrolling has stopped then animate
      // We should just debounce the event listener here
      this.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= this.state.markers.length) {
          index = this.state.markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }

        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const { coordinate } = this.state.markers[index];
            // console.log(coordinate);
            this.map.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
      });
  }

  render(){
    console.log(this.state.markers);
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    mapStyle =
[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
        //white
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
        //dark gray or light black
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
        //light gray
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
        //almost white
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
        //dark gray or light black near to this
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#98FB98"
        //lightest gray
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#228b22"
        //dark gray or light black near to this
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
        //white
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
        //light gray
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6B5793"
        //dark gray#616161
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#6B5793"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#37BEFF"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#37BEFF"
      }
    ]
  }
]
    return(
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          customMapStyle={mapStyle}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}>
              <Animated.View style={[styles.markerWrap]}>
                  <Animated.View style={[styles.ring]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={{url: '../../images/m1.png'}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    )

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius:4,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    alignSelf: "center",
    padding: 4,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: 'capitalize',
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    textTransform: 'capitalize',
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "rgba(247,148,29,1)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(247,148,29,0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(247,148,29,0.5)",
  },
});
