import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

export class Tutorial extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <ImageBackground source={require('../../assets/pyramid.jpg')} style={styles.imageBackground}>
          <View style={styles.overlay} />
          <Text style={styles.bannerText}>GUIDE BOOK</Text>
          <Icon style={styles.bannerIcon} color="white" name="book" type="font-awesome" size={40} />
        </ImageBackground>
        <View style={styles.tutorialInfo}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ paddingBottom: 5, paddingRight: 5, textAlign: 'center', fontStyle: 'italic'}}>Earn</Text>
            <Icon color="#f44336" name="diamond" type="font-awesome" size={20} />
            <Text style={{ paddingBottom: 5, paddingLeft: 5, textAlign: 'center', fontStyle: 'italic'}}>'s by collecting landmarks!</Text>
          </View>
          <Text style={{ padding: 5, fontWeight: 'bold'}}>Collect a landmark:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          </View>
          <Text style={{ padding: 5}}>STEP 1: Create an account</Text>
          <Icon color="#0b80dc" name="sign-in" type="font-awesome" size={28} />
          <Text style={{ padding: 5}}>STEP 2: Go to the maps page to find the closest landmark to you or a landmark you'd like to visit</Text>
          <Icon color="#9c27b0" name="map-marker" type="font-awesome" size={28} />
          <Text style={{ padding: 5}}>STEP 3: Click on the map marker of that landmark</Text>
          <Text style={{ padding: 5}}>STEP 4: Get within 1 mile of the selected landmark and click the 'Take Photo!' button in the banner</Text>
          <Text style={{ padding: 5}}>STEP 5: View your pictures on the Collected Landmarks page</Text>
          <Icon color="#4caf50" name="image" type="font-awesome" size={28} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  imageBackground: {
    flex: 1.5,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  tutorialInfo: {
    flex: 3,
    padding: 15
  },
  bannerText: {
    color: 'white',
    paddingBottom: '3%',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default Tutorial;