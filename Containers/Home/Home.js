import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Icon, Image } from 'react-native-elements';

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      clickedLocation: false,
      calculatedDistance: 0,
      selectedName: '',
      selectedVisited: false,
      selectedDescription: '',
      selectedPoints: 10,
      selectedID: -1,
      selectedLongitude: 0,
      selectedLatitude: 0,
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
        },
        {
          id: 3,
          lat: 39.77023,
          lon: -104.9965,
          visited: false,
          name: 'Far away example',
          description: 'over a mile away'
        }
      ]
    }
  }

  calculateDistance = ({ lat: landmarkLatitude, lon: landmarkLongitude, name, visited, description, id }) => {
    const earthRadiusMiles = 3958.8;
    const { currentLatitude, currentLongitude } = this.props;
    const deltaLatitude = (currentLatitude - landmarkLatitude) * Math.PI / 180;
    const deltaLongitude = (currentLongitude - landmarkLongitude) * Math.PI / 180;
    const landmarkLatitudeInRads = landmarkLatitude * Math.PI / 180;
    const currentLatitudeInRads = currentLatitude * Math.PI / 180;
    const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) + Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2) * Math.cos(landmarkLatitudeInRads) * Math.cos(currentLatitudeInRads);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const calculatedDistance = (earthRadiusMiles * c).toFixed(2);
    this.setState({
      calculatedDistance,
      selectedID: id,
      selectedName: name,
      selectedVisited: visited,
      selectedDescription: description,
      selectedLatitude: landmarkLatitude,
      selectedLongitude: landmarkLongitude,
      clickedLocation: true
    })
  }

  sendLocationPhoto = () => {
    const { selectedName, selectedDescription, selectedLatitude, selectedLongitude, selectedID } = this.state;
    this.props.takeLocationPhoto(selectedName, selectedDescription, selectedLatitude, selectedLongitude, selectedID)
  }

  render() {
    const { currentLatDelta, currentLonDelta } = this.state.currentLocation;
    const { currentLatitude, currentLongitude, allLocations, visitedLocationIds } = this.props;
    const { locations, clickedLocation, selectedName, selectedVisited, selectedPoints, calculatedDistance } = this.state;
    return (
      <View style={styles.container}>
        {
          clickedLocation && selectedVisited ? <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={styles.imageBackground}>
            <View style={styles.overlay} />
            <View style={styles.flexRow}>
              <Text style={styles.headerText}>{selectedName}</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon color="#f44336" name="diamond" type="font-awesome" size={15} />
              <Text style={[styles.pointsText, { color: 'white' }]}>{selectedPoints} gems</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon color="#00bcd4" name="car" type="font-awesome" size={15} />
              <Text style={[styles.pointsText, { color: 'white' }]}>{calculatedDistance} mi. away </Text>
            </View>
            {
              calculatedDistance < 1 &&
              <View style={styles.flexRow}>
                <TouchableOpacity style={styles.locationCamera} onPress={() => this.sendLocationPhoto()}>
                  <Icon color="#4caf50" name="camera" type="font-awesome" size={15} marginTop={15} />
                  <Text style={[styles.pointsText, { color:'#c9c9c9', marginTop: 4}]}>Click to Retake Photo!</Text>
                </TouchableOpacity>
              </View>
            }
          </ImageBackground>
            : clickedLocation ?
              <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={styles.imageBackground}>
                <View style={styles.overlay} />
                <View style={styles.flexRow}>
                  <Text style={styles.headerText}>{selectedName}</Text>
                </View>
                <View style={styles.flexRow}>
                  <Icon color="#f44336" name="diamond" type="font-awesome" size={15} />
                  <Text style={[styles.pointsText, { color: "white" }]}>{selectedPoints} gems</Text>
                </View>
                <View style={styles.flexRow}>
                  <Icon color="#00bcd4" name="car" type="font-awesome" size={15} />
                  <Text style={styles.pointsText}>{calculatedDistance} mi. away</Text>
                </View>
                {
                  calculatedDistance < 1 ?
                    <View style={styles.flexRow}>
                      <TouchableOpacity style={styles.locationCamera} onPress={() => this.sendLocationPhoto()}>
                        <Icon color="#4caf50" name="camera" type="font-awesome" size={15} marginTop={15}/>
                        <Text style={[styles.pointsText, { color: '#c9c9c9', marginTop: 4}]}>Click to Take Photo!</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View>
                      <Text style={[styles.pointsText, { fontSize: 14, marginTop: 10, padding: 2, color: '#c9c9c9'}]}>Get within 1 mile of the landmark to take a photo and add it to your collection</Text>
                    </View>
                }
              </ImageBackground>
              :
              <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={styles.imageBackground}>
                <View style={styles.overlay} />
                <Text style={styles.bannerText}>Earn gems by taking and uploading pics of you at various locations</Text>
                <Icon color="white" name="camera-retro" type="font-awesome" size={40} paddingTop={15}/>
              </ImageBackground>
        }
        {
          currentLatitude ?
            <MapView
              provider={"google"}
              style={styles.map}
              initialRegion={{
                latitude: currentLatitude,
                longitude: currentLongitude,
                latitudeDelta: currentLatDelta,
                longitudeDelta: currentLonDelta,
              }}
              showsUserLocation={true}
            >
              {
                allLocations.map(location => {
                  const pinColor = visitedLocationIds.includes(location.id) ? '#FFF000' : '#000FFF';
                  return (
                    <Marker
                      key={location.id}
                      coordinate={{
                        latitude: location.lat,
                        longitude: location.lon
                      }}
                      pinColor={pinColor}
                      onPress={() => {
                        this.calculateDistance(location);
                      }}
                    >
                      <Callout tooltip={true} >
                        <View style={styles.landmarkInfo}>
                          <Text style={{ fontWeight: 'bold' }}>{location.name}</Text>
                          <Text style={{ fontStyle: 'italic' }}>{location.description}</Text>
                          <Text>Distance away: mi</Text>
                          <Text>Visited: no</Text>
                          <Text>Link - takes to camera</Text>
                        </View>
                      </Callout>
                    </Marker>
                  )
                })
              }
            </MapView>
            :
            <View style={{ flex: 3 }}>
              <View style={styles.loading} >
                <Image style={styles.loadingGif} source={require('../../assets/loading.gif')} />
              </View>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: '100%',
  },
  map: {
    width: '100%',
    flex: 3,
  },
  imageBackground: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
    position: 'relative',
  },
  landmarkInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    fontSize: 14
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    height: '100%',
    width: '100%'
  },
  bannerText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    padding: 10
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    padding: 10,
  },
  pointsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  loading: {
    flex: 3,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  loadingGif: {
    position: 'relative',
    zIndex: 3,
  }
});

export default Home;