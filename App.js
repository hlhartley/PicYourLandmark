import React, { Component } from 'react';
import Home from './Containers/Home/Home';
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/Footer';
import Login from './Containers/Login/Login';
import CollectedLandMarks from './Containers/CollectedLandmarksContainer/CollectedLandmarksContainer';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'Home',
      currentLatitude: null,
      currentLongitude: null
    }
  }

  async componentDidMount() {
    // const { Location, Permissions } = Expo;
    // const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status === 'granted') {
    //   return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    // } else {
    //   throw new Error('Location permission not granted');
    // }

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude: currentLatitude, longitude: currentLongitude } = position.coords;
        this.setState({
          currentLatitude,
          currentLongitude
        });
      },
      error => console.log(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  };
  changeCurrentPage = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    const { currentPage, currentLatitude, currentLongitude } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        {
          currentPage === 'Home' && currentLongitude !== null ? <Home currentLatitude={currentLatitude} currentLongitude={currentLongitude} /> 
            : currentPage === 'Login' ? <Login /> 
            : currentPage === 'Collected landmarks' ? <CollectedLandMarks />
            : null
        }
        <Footer changeCurrentPage={this.changeCurrentPage}/>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6'
  }
});