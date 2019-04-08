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
      currentPage: 'Home',
      currentLatitude: null,
      currentLongitude: null,
      pics: [],
      profilePic: '',
      takingProfilePic: false,
      cameraLoading: false,
      currentUserId: -1,
      visitedLocations: [],
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
    if (this.state.takingProfilePic) {
      this.setState({ profilePic: newPic, cameraLoading: false, currentPage: 'User profile', takingProfilePic: false });
    } else {
      this.addLocationPhoto(newPic);
    }
  };

  addLocationPhoto = (newPic) => {
    let currentPhotoLocation = this.state.currentPhotoLocation;
    currentPhotoLocation.photo_url = newPic;
    const visitedLocations = [...this.state.visitedLocations, currentPhotoLocation];
    this.setState({ visitedLocations, cameraLoading: false, currentPage: 'Collected landmarks' });
  }

  takeLocationPhoto = (selectedName, selectedDescription, selectedLatitude, selectedLongitude, selectedID) => {
    const currentPhotoLocation = {
      name: selectedName,
      description: selectedDescription,
      lat: selectedLatitude,
      lon: selectedLongitude,
      landmark_id: selectedID,
      photo_url: ''
    }
    this.setState({ currentPhotoLocation, currentPage: "Camera" });
  }

  setCameraLoading = () => {
    this.setState({ cameraLoading: true })
  }

  setUserLoginId = (id) => {
    this.setState({ currentUserId: id })
  }

  fetchUserInfo = async (username, password) => {
    const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/?username=${username}&password=${password}`
    const response = await fetch(url)
    const result = await response.json()
    const { user_id, user_locations } = result;
    this.setState({ currentUserId: user_id, visitedLocations: user_locations, currentPage: 'Home' })
  }

  render() {
    const { currentPage, currentLatitude, currentLongitude, pics, profilePic, cameraLoading } = this.state;
    return (
      <View style={styles.container}>
        {
          cameraLoading && <View style={styles.loading}><Image style={styles.loadingGif} source={require('./assets/loading.gif')} /></View>
        }
        {
          currentPage !== 'Camera' && <Header />
        }
        {
          currentPage === 'Home' && currentLongitude !== null ? <Home currentLatitude={currentLatitude} currentLongitude={currentLongitude} changeCurrentPage={this.changeCurrentPage} takeLocationPhoto={this.takeLocationPhoto} />
            : currentPage === 'Login' ? <Login currentUserId={this.state.currentUserId} setUserLoginId={this.setUserLoginId} fetchUserInfo={this.fetchUserInfo} />
              : currentPage === 'Collected landmarks' ? <CollectedLandMarks pics={pics} />
                : currentPage === 'User profile' ? <UserProfile takeProfilePic={this.takeProfilePic} profilePic={profilePic} />
                  : currentPage === 'Camera' ? <CameraPage setCameraLoading={this.setCameraLoading} savePicture={this.savePicture} />
                    : <View />
        }
        <Footer changeCurrentPage={this.changeCurrentPage} currentPage={currentPage} />
      </View>
    );
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