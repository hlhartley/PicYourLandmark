import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

export class Tutorial extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <ImageBackground source={require('../../assets/pyramid.jpg')} style={styles.imageBackground}>
          <View style={styles.overlay} />
          <Text style={styles.bannerText}>TUTORIAL</Text>
          <Icon style={styles.bannerIcon} color="white" name="book" type="font-awesome" size={40} />
        </ImageBackground>
        <View style={styles.tutorialInfo}>
          <Text>Tutorial text</Text>
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
    flex: 3
  },
  bannerText: {
    color: 'white',
    paddingBottom: '3%',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default Tutorial;