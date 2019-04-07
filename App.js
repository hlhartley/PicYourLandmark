import React, { Component } from 'react';
import Home from './Containers/Home/Home';
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/Footer';
import Login from './Containers/Login/Login';
import CameraPage from './Containers/Camera/Camera';
import UserProfile from './Containers/UserProfile/UserProfile';
import CollectedLandMarks from './Containers/CollectedLandmarksContainer/CollectedLandmarksContainer';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'Login',
      currentLatitude: null,
      currentLongitude: null,
      pics: [],
      profilePic: '',
      takingProfilePic: false,
      cameraLoading: false,
      isLoggedIn: true
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
    this.setState({ profilePic: newPic, cameraLoading: false, currentPage: 'User profile' });
  };

  setCameraLoading = () => {
    this.setState({ cameraLoading: true })
  }

  render() {
    const { currentPage, currentLatitude, currentLongitude, pics, profilePic, cameraLoading } = this.state;
    if(currentPage === 'Login') {
      return (
        <View style={styles.container}>
        {
          cameraLoading && <View style={styles.loading}><Image style={styles.loadingGif} source={require('./assets/loading.gif')} /></View>
        }
        <Header />
        <Login isLoggedIn={this.state.isLoggedIn}/>
      </View>
      )
    } else {
        return (
          <View style={styles.container}>
            {
              cameraLoading && <View style={styles.loading}><Image style={styles.loadingGif} source={require('./assets/loading.gif')} /></View>
            }
            <Header />
            {
              currentPage === 'Home' && currentLongitude !== null ? <Home currentLatitude={currentLatitude} currentLongitude={currentLongitude} changeCurrentPage={this.changeCurrentPage} />
                : currentPage === 'Collected landmarks' ? <CollectedLandMarks pics={pics} />
                  : currentPage === 'User profile' ? <UserProfile takeProfilePic={this.takeProfilePic} profilePic={profilePic} />
                    : currentPage === 'Camera' ? <CameraPage setCameraLoading={this.setCameraLoading} savePicture={this.savePicture} />
                      : <View />
            }
          </View>
        );
    }
  };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6',
    position: 'relative'
  },
  loading: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingGif: {
    position: 'relative',
    zIndex: 3,
  }
});

export default App;