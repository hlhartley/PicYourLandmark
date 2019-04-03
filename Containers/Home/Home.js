import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      currentLocation: {
        currentLatDelta: 0.015,
        currentLonDelta: 0.0121
      },
      locations: [
        {
          id: 1,
          lat: 39.75302,
          lon: -104.9965,
          visited: false
        },
        {
          id: 2,
          lat: 39.75023,
          lon: -104.9965,
          visited: true
        }
      ]
    }
  }

  render() {
    const { currentLatDelta, currentLonDelta, locations } = this.state.currentLocation;
    const { currentLatitude, currentLongitude } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          provider={"google"}
          style={styles.map}
          region={{
            latitude: currentLatitude,
            longitude: currentLongitude,
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
    height: '100%'
  },
});