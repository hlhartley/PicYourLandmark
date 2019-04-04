import React, { Component } from 'react';
import Home from './Containers/Home/Home';
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/Footer';
import Login from './Containers/Login/Login';
import CameraPage from './Containers/Camera/Camera';
import UserProfile from './Containers/UserProfile/UserProfile';
import CollectedLandMarks from './Containers/CollectedLandmarksContainer/CollectedLandmarksContainer';
import { StyleSheet, View } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'Login',
      currentLatitude: null,
      currentLongitude: null,
      pics: [],
      profilePic: '',
      takingProfilePic: false
    }
  };

  componentDidMount = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      this.getStartLocation();
      this.startLocationTracking();
    } else {
      throw new Error('Location permission not granted');
    }
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  };

  getStartLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ currentLatitude: position.coords.latitude, currentLongitude: position.coords.longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
  };

  startLocationTracking = () => {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { latitude: currentLatitude, longitude: currentLongitude } = position.coords;
        this.setState({
          currentLatitude,
          currentLongitude
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  };

  changeCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  takeProfilePic = () => {
    this.setState({ takingProfilePic: true, currentPage: "Camera" });
  };

  savePicture = (newPic) => {
    this.setState({ profilePic: newPic });
  };

  render() {
    const { currentPage, currentLatitude, currentLongitude, pics, profilePic } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        {
          currentPage === 'Home' && currentLongitude !== null ? <Home currentLatitude={currentLatitude} currentLongitude={currentLongitude} />
            : currentPage === 'Login' ? <Login />
              : currentPage === 'Collected landmarks' ? <CollectedLandMarks pics={pics} />
                : currentPage === 'User profile' ? <UserProfile takeProfilePic={this.takeProfilePic} profilePic={profilePic} />
                  : currentPage === 'Camera' ? <CameraPage savePicture={this.savePicture} />
                    : <View />
        }
        <Footer changeCurrentPage={this.changeCurrentPage} />
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