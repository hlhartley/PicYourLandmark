import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export class Landmark extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.landmarkContainer}>
          <Image source={require('../../assets/statueofliberty.jpg')} style={{ width: 300, height: 200, bottom: 15 }} />
          <Text style={{ fontWeight: 'bold' }}>{this.props.landmark.name.toUpperCase()}</Text>
          <View style={{ display: 'flex' }}>
            <Icon color="#f44336" name="diamond" type="font-awesome" size={20} left={'-45%'} top={3} />
            <Text style={{ top: -15, left: 30 }}>10 gems</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    left: '5%',
    width: '92%',
    padding: 8
  },
  landmarkContainer: {
    top: '-25%'
  }
});

export default Landmark;
