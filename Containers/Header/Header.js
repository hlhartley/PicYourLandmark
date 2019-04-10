import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      titleText: 'PIC YOUR LANDMARK'
    }
  }

  render() {
    const {titleText} = this.state
    return (
      <View style={[styles.container, {paddingTop: 25}]}>
        <Icon name="map-marker" type="font-awesome" size={22} color='tomato' marginRight={7} marginLeft={7} />
        <Text style={styles.titleText}>
          {titleText}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    alignItems: 'center',
    justifyContent: 'center',
    flex: .3

  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c4859',
  }
});

export default Header;