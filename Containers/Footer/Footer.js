import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default class Footer extends Component {

  render() {
    return (
      <View style={styles.container}>
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
  }
});