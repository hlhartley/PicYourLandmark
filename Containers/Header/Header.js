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
      <View style={styles.container}>
        <Icon name="map-marker" type="font-awesome" size={22} color='tomato' position='absolute' top={5} left={'-28%'}/>
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
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    height: '12%'
  },
  titleText: {
    top: 23,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c4859',
    paddingBottom: 10,
  }
});

export default Header;