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
      allLocations: [],
      visitedLocations: [
        {
          landmark_id: 1,
          lat: 39.75302,
          lon: -104.9965,
          visited: false,
          name: 'Summit',
          description: 'example 1 description',
          photo_url: 'content://media/external/images/media/692'
        },
        {
          landmark_id: 2,
          lat: 39.75023,
          lon: -104.9965,
          visited: true,
          name: 'The Delectable Egg',
          description: 'example 2 description',
          photo_url: 'content://media/external/images/media/692'
        },
        {
          landmark_id: 3,
          lat: 39.77023,
          lon: -104.9965,
          visited: false,
          name: 'Far away example',
          description: 'over a mile away',
          photo_url: 'content://media/external/images/media/692'
        }
      ]
    }
  };

  componentDidMount = async () => {
    this.fetchAllLocations();
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

  fetchAllLocations = async () => {
    const url = `https://pic-landmark-api.herokuapp.com/api/v1/locations/?lat=39.719683&lon=-104.498445`
    const response = await fetch(url, { method: 'GET', headers: { 'Content-type': 'application/json' } })
    const result = await response.json()
    this.setState({allLocations: result})
  }

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

  storePhoto = async (currentPhotoLocation) => {
    const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/${this.state.currentUserId}/landmarks?url=${currentPhotoLocation.photo_url}&location=${currentPhotoLocation.landmark_id}`
    const response = await fetch(url, { method: 'POST', headers: { 'Content-type': 'application/json' } })
    const result = await response.json()
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
    try {
      const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/?username=${username}&password=${password}`
      const response = await fetch(url)
      const result = await response.json()
      const { user_id, user_locations } = result;
      this.setState({ currentUserId: user_id, visitedLocations: user_locations, currentPage: 'Home' })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    const { currentPage, currentLatitude, currentLongitude, pics, profilePic, cameraLoading, allLocations } = this.state;
    return (
      <View style={styles.container}>
        {
          cameraLoading && <View style={styles.loading}><Image style={styles.loadingGif} source={require('./assets/loading.gif')} /></View>
        }
        {
          currentPage !== 'Camera' && <Header />
        }
        {
          currentPage === 'Home' && currentLatitude !== null ? <Home currentLatitude={currentLatitude} currentLongitude={currentLongitude} changeCurrentPage={this.changeCurrentPage} takeLocationPhoto={this.takeLocationPhoto} allLocations={allLocations} />
            : currentPage === 'Login' ? <Login currentUserId={this.state.currentUserId} setUserLoginId={this.setUserLoginId} fetchUserInfo={this.fetchUserInfo} />
              : currentPage === 'Collected landmarks' ? <CollectedLandMarks pics={pics} visitedLocations={this.state.visitedLocations} />
                : currentPage === 'User profile' ? <UserProfile takeProfilePic={this.takeProfilePic} profilePic={profilePic} />
                  : currentPage === 'Camera' ? <CameraPage setCameraLoading={this.setCameraLoading} savePicture={this.savePicture} />
                    : <View style={{ flex: 3 }} />
        }
        <Footer changeCurrentPage={this.changeCurrentPage} currentPage={currentPage} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#f6f6f6',
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