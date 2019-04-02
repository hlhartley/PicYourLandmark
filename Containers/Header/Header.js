import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      titleText: 'Pic Your Landmark'
    }
  }

  render() {
    const {titleText} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {titleText}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30
  }
});