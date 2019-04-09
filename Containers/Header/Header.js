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
        <Icon name="map-marker" type="font-awesome" size={22} color='tomato' position='absolute' top={-17} left={'-25%'}/>
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
    backgroundColor: '#e9e9e9',
    flexDirection: 'column',
    alignItems: 'center',
    flex: .4,
    justifyContent: 'flex-end'

  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c4859',
  }
});

export default Header;