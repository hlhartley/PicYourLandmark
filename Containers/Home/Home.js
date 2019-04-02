import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 


export default class Home extends Component {
  constructor() {
    super()

  }



  // componentDidMount = () => {
  //   // this.fetchLocations()
  // }

  render() {


    return (
      <View style={styles.container}>

        <MapView
          provider={"google"} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }}
            pinColor='#FFF000'
            description={'hello'}
          />
          <Marker
            coordinate={{
              latitude: 37.78827,
              longitude: -122.4330
            }}
            pinColor={'#000FFF'}
          />
        </MapView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
  //   position: 'absolute',
  // left: 0,
  //   right: 0,
  //     top: 0,
  //       bottom: 0,
    height: 400,
    width: '90%',
    margin: 0,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});