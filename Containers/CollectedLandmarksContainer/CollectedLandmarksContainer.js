import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Landmark from '../Landmark/Landmark';

export class CollectedLandmarksContainer extends Component {
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
            {
              this.props.visitedLocations.map((location) => {
                return (<Landmark key={location.id} landmark={location} />)
              })
            }
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
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  bannerText: {
    color: 'white',
    paddingBottom: '3%',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default CollectedLandmarksContainer;