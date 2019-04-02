import React, {Component} from 'react';
import Home from './Containers/Home/Home';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps'; 

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage:'Home'
    }
  }

  

  // componentDidMount = () => {
  //   // this.fetchLocations()
  // }

  render() {
    const {currentPage} = this.state;
    switch(currentPage) {
      case 'Home':
      return <Home />
    }

    // return (
    //   <View style={styles.container}>
    //     <MapView
    //       provider={"google"} // remove if not using Google Maps
    //       style={styles.map}
    //       region={{
    //         latitude: 37.78825,
    //         longitude: -122.4324,
    //         latitudeDelta: 0.015,
    //         longitudeDelta: 0.0121,
    //       }}
    //       showsUserLocation={true}
    //     >
    //       <Marker
    //         coordinate={{
    //           latitude: 37.78825,
    //           longitude: -122.4324
    //         }}
    //         pinColor='#FFF000'
    //         description={'hello'}
    //       />
    //       <Marker
    //         coordinate={{
    //           latitude: 37.78827,
    //           longitude: -122.4330
    //         }}
    //         pinColor={'#000FFF'}
    //       />
    //     </MapView>
    //   </View>
    // );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

// position: 'absolute',
//   left: 0,
//     right: 0,
//       top: 0,
//         bottom: 0,
