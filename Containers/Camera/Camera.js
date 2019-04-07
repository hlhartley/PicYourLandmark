import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions, ScreenOrientation } from 'expo';
import { Icon } from 'react-native-elements';

export class CameraWindow extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
    }
  };

  componentWillMount = async () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  componentWillUnmount = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  };

  takePicture = () => {
    this.props.setCameraLoading();
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async (photo) => {
    let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
    this.props.savePicture(saveResult);
  };

  render() {
    const { hasCameraPermission } = this.state;
    switch (hasCameraPermission) {
      case null:
        return <Text>Request to access camera has not been made</Text>;
      case false:
        return <Text>Access to camera has not been given</Text>;
      default:
        return (
          <View style={styles.viewContainer}>
            <Camera style={styles.camera} type={this.state.type} ref={ref => { this.camera = ref; }}>
              <View style={styles.cameraButtonsContainer}>
                <View style={styles.leftButtonsContainer}>
                  <View style={styles.leftButtons} />
                  <View style={styles.leftButtons} />
                  <TouchableOpacity
                    style={styles.leftButtons}
                    onPress={() => this.takePicture()}>
                    <Icon color="white" name="camera" type="font-awesome" size={35} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.leftButtons}
                    onPress={() => {
                      this.setState({
                        type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                      });
                    }}>
                    <Icon color="white" name="random" type="font-awesome" size={35} />
                  </TouchableOpacity>
                </View>
                <View style={styles.rightButtonsContainer}>
                  <View style={styles.rightButtons} />
                  <View style={styles.rightButtons} />
                  <TouchableOpacity
                    style={styles.rightButtons}
                    onPress={() => this.takePicture()}>
                    <Icon color="white" name="camera" type="font-awesome" size={35} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rightButtons}
                    onPress={() => {
                      this.setState({
                        type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                      });
                    }}>
                    <Icon color="white" name="random" type="font-awesome" size={35} />
                  </TouchableOpacity>
                </View>
              </View>
            </Camera>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  camera: {
    height: '85%'
  },
  cameraButtonsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  leftButtonsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  rightButtonsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  rightButtons: {
    paddingRight: '15%',
    paddingLeft: '15%',
    alignSelf: 'flex-end',
  },
  leftButtons: {
    paddingRight: '15%',
    paddingLeft: '15%',
    alignSelf: 'flex-start',
  }
});

export default CameraWindow;