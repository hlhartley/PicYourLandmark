import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      currentLocation: {
        currentLat: 37.78825,
        currentLon: -122.4324,
        currentLatDelta: 0.015,
        currentLonDelta: 0.0121
      },
      locations: [
        {
          id: 1,
          lat: 37.78825,
          lon: -122.4324,
          visited: false
        },
        {
          id: 2,
          lat: 37.78828,
          lon: -122.4334,
          visited: true
        }
      ]
    }
  }


  render() {
    const { currentLat, currentLon, currentLatDelta, currentLonDelta } = this.state.currentLocation;
    const { locations } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={"google"}
          style={styles.map}
          region={{
            latitude: currentLat,
            longitude: currentLon,
            latitudeDelta: currentLatDelta,
            longitudeDelta: currentLonDelta,
          }}
          showsUserLocation={true}
        >
          {
            locations.map(location => {
              const pinColor = location.visited ? '#FFF000' : '#000FFF';
              return <Marker
                key={location.id}
                coordinate={{
                  latitude: location.lat,
                  longitude: location.lon
                }}
                pinColor={pinColor}
              />
            })
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    left: '5%',
    height: '60%',
    width: '90%',
  },
  map: {
    width: '100%',
    height: '100%',
    top: 100,
  },
});