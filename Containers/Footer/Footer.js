import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

export default class Footer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ backgroundColor: 'red' }}>
              <Icon color="white" name="home" type="font-awesome" size={35}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red' }}>
              <Icon color="white" name="map-marker" type="font-awesome" size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red' }}>
              <Icon color="white" name="camera" type="font-awesome" size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red' }}>
              <Icon color="white" name="image" type="font-awesome" size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red' }}>
              <Icon color="white" name="user-circle" type="font-awesome" size={35} />
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    backgroundColor: 'red'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});