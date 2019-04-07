import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export class Footer extends Component {

  render() {
    const {changeCurrentPage, currentPage} = this.props;
    const containerHeight = currentPage === 'Camera' ? '15%' : '8%';
    return (
      <View style={[styles.container, {height: containerHeight}]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => changeCurrentPage('User profile')}>
            <Icon color="#3c4859" name="user" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Home')} >
            <Icon color="#3c4859" name="map-marker" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Camera')}>
            <Icon color="#3c4859" name="camera" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Collected landmarks')}>
            <Icon color="#3c4859" name="image" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Login')}>
            <Icon color="#3c4859" name="sign-in" type="font-awesome" size={30} />
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
    width: '100%',
    backgroundColor: '#e9e9e9',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Footer;