import React, { Component } from 'react';
import Home from './Containers/Home/Home';
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/Footer';
import Login from './Containers/Login/Login';
import UserProfile from './Containers/UserProfile/UserProfile';
import Tutorial from './Containers/Tutorial/Tutorial';
import CollectedLandmarksContainer from './Containers/CollectedLandmarksContainer/CollectedLandmarksContainer';
import CameraPage from './Containers/Camera/Camera';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { ScreenOrientation } from 'expo';
import base64 from 'react-native-base64'

export class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'Login',
      currentLatitude: null,
      currentLongitude: null,
      profilePic: '',
      takingProfilePic: false,
      cameraLoading: false,
      currentUserId: -1,
      currentUserName: '',
      allLocations: [],
      visitedLocationIds: [],
      visitedLocations: [],
      loggedOutMessage: ''
    }
  };

  componentWillMount = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
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

  componentWillUpdate(nextProps, nextState) {
    const { currentLatitude, currentLongitude } = this.state;
    if (nextState.currentLatitude !== currentLatitude || nextState.currentLongitude !== currentLongitude) {
      this.fetchAllLocations(nextState.currentLongitude, nextState.currentLatitude);
    }
  }

  fetchAllLocations = async (lon, lat) => {
    try {
      const url = `https://pic-landmark-api.herokuapp.com/api/v1/locations/?lat=${lat}&lon=${lon}`
      const response = await fetch(url, { method: 'GET', headers: { 'Content-type': 'application/json' } })
      const result = await response.json()
      this.setState({ allLocations: result })
    } catch (error) {
      console.log(error.message)
    }
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

  setLoggedOutMessage = (message) => {
    this.setState({ loggedOutMessage: message });
  }

  takeProfilePic = () => {
    this.setState({ takingProfilePic: true, currentPage: "Camera" });
  };

  savePicture = (newPic) => {
    if (this.state.takingProfilePic) {
      this.setState({ profilePic: newPic, cameraLoading: false, currentPage: 'User profile', takingProfilePic: false });
      this.storeProfilePic(newPic)
    } else {
      this.addLocationPhoto(newPic);
    }
  };

  storeProfilePic = async (newPic) => {
    const photoURL = base64.encode(newPic);
    const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/${this.state.currentUserId}/?profile_url=${photoURL}`;
    try {
      await fetch(url, { method: 'PATCH', headers: { 'Content-type': 'application/json' } });
    } catch (error) {
      console.log(error.message);
    }
  }

  addLocationPhoto = (newPic) => {
    let currentPhotoLocation = this.state.currentPhotoLocation;
    currentPhotoLocation.photo_url = newPic;
    const visitedLocations = [currentPhotoLocation, ...this.state.visitedLocations];
    const visitedLocationIds = [...this.state.visitedLocationIds, currentPhotoLocation.id];
    this.setState({ visitedLocations, visitedLocationIds, cameraLoading: false, currentPage: 'Collected landmarks' });
    this.storePhoto(currentPhotoLocation);
  }

  storePhoto = async (currentPhotoLocation) => {
    const photoURL = base64.encode(currentPhotoLocation.photo_url);
    const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/${this.state.currentUserId}/landmarks/?url=${photoURL}&location=${currentPhotoLocation.id}`;
    try {
      await fetch(url, { method: 'POST', headers: { 'Content-type': 'application/json' } });
    } catch (error) {
      console.log(error.message);
    }
  }

  takeLocationPhoto = (selectedName, selectedDescription, selectedLatitude, selectedLongitude, selectedID) => {
    const currentPhotoLocation = {
      name: selectedName,
      description: selectedDescription,
      lat: selectedLatitude,
      lon: selectedLongitude,
      id: selectedID,
      photo_url: ''
    };
    this.setState({ currentPhotoLocation, currentPage: "Camera" });
  }

  setCameraLoading = () => {
    this.setState({ cameraLoading: true });
  }

  setUserLogin = (id, username) => {
    this.setState({ currentUserId: id, currentUserName: username }, this.changeCurrentPage('User profile'));
  }

  setUserLogout = () => {
    this.setState({ currentUserId: -1, currentUserName: '', profilePic: '', currentUserName: '', visitedLocations: [], visitedLocationIds: [] });
  }

  fetchUserInfo = async (username, password) => {
    try {
      const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/?username=${username}&password=${password}`;
      const response = await fetch(url);
      const result = await response.json();
      const { user_id, user_locations, profile_url } = result;
      const profilePic = base64.decode(profile_url);
      let visitedLocationIds = [];
      let decodedLocations = user_locations.map(location => {
        visitedLocationIds.push(location.landmark_id);
        location.photo_url = base64.decode(location.photo_url);
        return location;
      })
      this.setState({ currentUserId: user_id, currentUserName: username, visitedLocations: decodedLocations, visitedLocationIds, currentPage: 'User profile', profilePic });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { currentPage, currentLatitude, currentLongitude, profilePic, cameraLoading, allLocations,
      visitedLocations, visitedLocationIds, currentUserName, loggedOutMessage, currentUserId } = this.state;
    return (
      <View style={styles.container}>
        {
          cameraLoading && <View style={styles.loading}><Image style={styles.loadingGif} source={require('./assets/loading.gif')} /></View>
        }
        {
          currentPage !== 'Camera' && <Header />
        }
        {
          currentPage === 'Home' ? <Home currentLatitude={currentLatitude}
            currentLongitude={currentLongitude}
            changeCurrentPage={this.changeCurrentPage}
            takeLocationPhoto={this.takeLocationPhoto}
            allLocations={allLocations}
            visitedLocations={visitedLocations}
            visitedLocationIds={visitedLocationIds}
            currentUserId={currentUserId}
            setLoggedOutMessage={this.setLoggedOutMessage}
          />
            : currentPage === 'Login' ? <Login currentUserId={this.state.currentUserId}
              setUserLogin={this.setUserLogin}
              changeCurrentPage={this.changeCurrentPage}
              fetchUserInfo={this.fetchUserInfo}
              loggedOutMessage={loggedOutMessage}
              setLoggedOutMessage={this.setLoggedOutMessage}
              setUserLogout={this.setUserLogout}
            />
              : currentPage === 'Collected landmarks' ? <CollectedLandmarksContainer visitedLocations={this.state.visitedLocations} />
                : currentPage === 'User profile' ? <UserProfile takeProfilePic={this.takeProfilePic}
                  profilePic={profilePic}
                  currentUserName={currentUserName}
                  visitedLocations={visitedLocations}
                  setLoggedOutMessage={this.setLoggedOutMessage}
                  changeCurrentPage={this.changeCurrentPage}
                />
                  : currentPage === 'Camera' ? <CameraPage setCameraLoading={this.setCameraLoading} savePicture={this.savePicture} />
                    : currentPage === 'Tutorial' ? <Tutorial />
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