import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

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
        <View style={[styles.announcement, { borderRadius: 15, backgroundColor: '#a3c7f0', paddingTop: 20 }]}>
          <Icon name="bullhorn" type="font-awesome" size={21} color='#0d67af'/>
          <Text style={[{color:'#3c4859', paddingRight: 10, paddingLeft: 8}]}>Earn points by taking and uploading pics of you at various locations</Text>
        </View>
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
    height: '70%',
    width: '92%',
    padding: 8,
    top: 20
  },
  announcement: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    fontSize: 18,
    height: '18%',
    padding: 5,
    color: 'green'
  },
  map: {
    width: '100%',
    height: '80%',
    top: 30,
  },
});