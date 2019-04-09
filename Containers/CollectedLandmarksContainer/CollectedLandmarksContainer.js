import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Landmark from '../Landmark/Landmark';

export class CollectedLandmarksContainer extends Component {

  renderVisitedLocations = () => {
    if (this.props.visitedLocations.length) {
      return (
        this.props.visitedLocations.map((location) => {
          return (<Landmark key={location.landmark_id} landmark={location} />)
        })
      )
    } else {
      return (
        <View style={styles.noCollectedLandmarksMessage}>
          <Text style={{paddingTop: 30, fontWeight: 'bold'}}>You have 0 collected landmarks</Text>
          <Icon color="#745f57" name="map" type="font-awesome" size={50} padding={30} />
          <Text>Get within 1 mile of a landmark to snap a photo and add it to your landmarks collection</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <ImageBackground source={require('../../assets/greatwallofchina.jpg')} style={styles.imageBackground}>
          <View style={styles.overlay} />
          <Text style={styles.bannerText}>COLLECTED LANDMARKS</Text>
          <Icon style={styles.bannerIcon} color="white" name="university" type="font-awesome" size={40} />
        </ImageBackground>
        <View style={styles.locations}>
          <ScrollView>
            {this.renderVisitedLocations()}
          </ScrollView>
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
  locations: {
    flex: 3
  },
  bannerText: {
    color: 'white',
    paddingBottom: '3%',
    fontSize: 18,
    fontWeight: '600',
  },
  noCollectedLandmarksMessage: {
    padding: 10,
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default CollectedLandmarksContainer;