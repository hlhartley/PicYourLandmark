import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export class Landmark extends Component {
  constructor() {
    super()
  }
  render() {
    const { landmark } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.landmarkName}>{landmark.name.toUpperCase()}</Text>
        <View style={styles.pictureContainer} >
          <Image
            style={styles.landmarkImage}
            source={{ uri: landmark.photo_url }}
          />
        </View>
        <View style={styles.gemContainer}>
          <Icon color="#f44336" name="diamond" type="font-awesome" size={20} />
          <Text style={styles.gemText}>10 gems</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  landmarkImage: {
    height: 200,
    width: 300
  },
  pictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landmarkName: {
    fontWeight: 'bold',
    padding: 10,
  },
  gemContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  gemText: {
    marginLeft: 10
  }
});

export default Landmark;
