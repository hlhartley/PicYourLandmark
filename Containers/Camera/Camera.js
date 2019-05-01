import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, ScreenOrientation } from 'expo';
import { Icon } from 'react-native-elements';

export class CameraWindow extends Component {
  constructor() {
    super();
    this.state = {
      type: Camera.Constants.Type.front,
    }
  };

  componentWillMount = async () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
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

const styles = StyleSheet.create({
  viewContainer: {
    flex: 2.3,
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1
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