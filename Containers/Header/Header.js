import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      titleText: 'PIC YOUR LANDMARK'
    }
  }

  render() {
    const {titleText} = this.state
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name="map-marker" type="font-awesome" size={33} color='tomato'/>
        <Text style={styles.titleText}>
          {titleText}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9e9e9',
    // borderBottomColor: '#3c4859',
    // borderBottomWidth: 1,
    height: 120,
    paddingTop: 10,
    flex: .4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    left: 10,
    top: 3,
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3c4859'
  }
});