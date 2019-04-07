import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Icon } from 'react-native-elements';

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

  calculateDistance = ({ lat: landmarkLatitude, lon: landmarkLongitude, name, visited, description }) => {
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
      selectedName: name,
      selectedVisited: visited,
      selectedDescription: description,
      clickedLocation: true
    })
  }

  render() {
    const { currentLatDelta, currentLonDelta } = this.state.currentLocation;
    const { currentLatitude, currentLongitude } = this.props;
    const { locations, clickedLocation, selectedName, selectedVisited, selectedPoints, calculatedDistance } = this.state;
    return (
      <View style={styles.container}>
        {
          clickedLocation && selectedVisited ? <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={{ width: '100%', height: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <View style={[styles.overlay, { opacity: 0.6}]} />
              <View style={styles.flexRow}>
                <Text style={styles.headerText}>{selectedName.toUpperCase()}</Text>
              </View>
              <View style={styles.flexRow}>
                <Icon color="#f44336" name="diamond" type="font-awesome" size={15} top={-58} paddingLeft={25}/>
                <Text style={[styles.pointsText, {color: 'white'}]}>{selectedPoints} gems</Text>
              </View>
              <View style={styles.flexRow}>
                <Icon color="#00bcd4" name="car" type="font-awesome" size={15} top={-57} paddingLeft={25}/>
                <Text style={[styles.pointsText, {color: 'white'}]}>{calculatedDistance} mi. away </Text>
              </View>
              {
                calculatedDistance < 1 &&
                <TouchableOpacity style={styles.locationCamera} onPress={() => this.props.changeCurrentPage('Camera')}>
                  <Text style={styles.pointsText}>Retake Photo</Text>
                  <Icon color="white" name="camera" type="font-awesome" size={30} />
                </TouchableOpacity>
              }
          </ImageBackground>
            : clickedLocation ?
            <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={styles.imageBackground}>
                <View style={[styles.overlay, { opacity: 0.6}]} />
                  <View style={styles.flexRow}>
                    <Text style={styles.headerText}>{selectedName.toUpperCase()}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Icon color="#f44336" name="diamond" type="font-awesome" size={15} top={-58} paddingLeft={25}/>
                    <Text style={[styles.pointsText, {color: "white"}]}>{selectedPoints} gems</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Icon color="#00bcd4" name="car" type="font-awesome" size={15} top={-57} paddingLeft={25}/>
                    <Text style={styles.pointsText}>{calculatedDistance} mi. away</Text>
                  </View>
                  {
                    calculatedDistance < 1 ?
                    <TouchableOpacity style={styles.locationCamera} onPress={() => this.props.changeCurrentPage('Camera')}>
                      <Text style={styles.pointsText}>Take Photo!</Text>
                      <Icon color="white" name="camera" type="font-awesome" size={30} />
                    </TouchableOpacity>
                    :
                      <View>
                        <Text style={[styles.pointsText, {top: -50, fontSize: 13}]}>Get within 1 mile of the landmark to take a photo and add it to your collection</Text>
                      </View>
                  }
              </ImageBackground>
              :
              <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={styles.imageBackground}>
                <View style={styles.overlay} />
                <Icon color="white" name="camera-retro" type="font-awesome" size={40} top={-55} />
                <Text style={styles.bannerText}>Earn gems by taking and uploading pics of you at various locations</Text>
              </ImageBackground>
        }
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
                  onPress={() => {
                    this.calculateDistance(location);
                  }}
                >
                  <Callout tooltip={true} >
                    <View style={styles.landmarkInfo}>
                      <Text style={{fontWeight: 'bold'}}>{location.name}</Text>
                      <Text style={{fontStyle: 'italic'}}>{location.description}</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '100%',
  },
  map: {
    width: '100%',
    height: '77%',
    top: -110,
  },
  landmarkInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: .8,
    borderRadius: 15,
    padding: 10,
    fontSize: 14
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.4,
    height: '62%',
  },
  imageBackground: {
    width: '100%', 
    height: '62%', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    top: -50,
    padding: 10
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    padding: 10,
    top: -65
  },
  pointsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    top: -60,
    paddingLeft: 10,
  },
  locationCamera: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 3,
  },
  flexRow: {
    display: 'flex', 
    flexDirection: 'row'
  }
});

export default Home;