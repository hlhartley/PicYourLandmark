import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout, MyCustomMarkerView, MyCustomCalloutView } from 'react-native-maps';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

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
          visited: false,
          name: 'Summit',
          description: 'example 1 description'
        },
        {
          id: 2,
          lat: 39.75023,
          lon: -104.9965,
          visited: true,
          name: 'The Delectable Egg',
          description: 'example 2 description'
        }
      ]
    }
  }

  render() {
    const { currentLatDelta, currentLonDelta } = this.state.currentLocation;
    const { currentLatitude, currentLongitude } = this.props;
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
              return (
                <Marker
                  key={location.id}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lon
                  }}
                  pinColor={pinColor}
                >
                  <MapView.Callout tooltip={true}>
                    <View style={styles.landmarkInfo}>
                      <Text style={{fontSize: 14, fontWeight: 'bold'}}>{location.name}</Text>
                      <Text style={{fontSize: 14, fontStyle: 'italic'}}>{location.description}</Text>
                      <Text style={{fontSize: 14}}>Distance away: .5 mi</Text>
                      <Text style={{fontSize: 14}}>Visited: no</Text>
                      <Text style={{fontSize: 14}}>Link - takes to camera</Text>
                    </View>
                  </MapView.Callout>
                </Marker>
              )
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
  landmarkInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: .8,
    borderRadius: 15,
    padding: 10
  }
});