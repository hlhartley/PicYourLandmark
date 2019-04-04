import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Footer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={{ backgroundColor: '#e9e9e9' }} onPress={() => this.props.changeCurrentPage('Home')} >
            <Icon color="#3c4859" name="home" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#e9e9e9' }} onPress={() => this.props.changeCurrentPage('Login')}>
            <Icon color="#3c4859" name="map-marker" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#e9e9e9' }} onPress={() => this.props.changeCurrentPage('Camera')}>
            <Icon color="#3c4859" name="camera" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#e9e9e9' }} onPress={() => this.props.changeCurrentPage('Collected landmarks')}>
            <Icon color="#3c4859" name="image" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#e9e9e9' }} onPress={() => this.props.changeCurrentPage('User profile')}>
            <Icon color="#3c4859" name="user" type="font-awesome" size={30} />
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
    height: '8%',
    width: '100%',
    backgroundColor: '#e9e9e9',
    // borderTopColor: '#3c4859',
    // borderTopWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});