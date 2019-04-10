import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export class Footer extends Component {

  render() {
    const { changeCurrentPage } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => changeCurrentPage('User profile')}>
            <Icon color={this.props.currentPage === 'User profile' ? "#0b80dc" : "#3c4859"} name="user" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Tutorial')}>
            <Icon color={this.props.currentPage === 'Camera' ? "#0b80dc" : "#3c4859"} name="book" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Home')} >
            <Icon color={this.props.currentPage === 'Home' ? "#0b80dc" : "#3c4859"} name="map-marker" type="font-awesome" size={30}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Collected landmarks')}>
            <Icon color={this.props.currentPage === 'Collected landmarks' ? "#0b80dc" : "#3c4859"} name="image" type="font-awesome" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCurrentPage('Login')}>
            <Icon color={this.props.currentPage === 'Login' ? "#0b80dc" : "#3c4859"} name="sign-in" type="font-awesome" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .3,
    width: '100%',
    backgroundColor: '#e9e9e9',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default Footer;