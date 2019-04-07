import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions } from 'expo';

export class CameraWindow extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
  };

  componentWillMount = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  takePicture = () => {
    this.props.setCameraLoading()
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
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View style={styles.container}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.takePicture();
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 200, color: 'white' }}>
                  {' '}Snap{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 100, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  }
});

export default CameraWindow;