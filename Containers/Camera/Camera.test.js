import React from 'react';
import { CameraWindow } from './Camera';
import { shallow } from 'enzyme'
import { CameraRoll } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo';

describe('CameraWindow', () => {

  let wrapper;
  let mockSetCameraLoading
  let mockSavePicture;

  beforeEach(() => {
    CameraRoll.saveToCameraRoll = jest.fn(() => 'filePath')
    mockSetCameraLoading = jest.fn()
    mockSavePicture = jest.fn()
    wrapper = shallow(<CameraWindow setCameraLoading={mockSetCameraLoading} savePicture={mockSavePicture} />)
  });

  it('should match the snapshot when hasCameraPermission is null', () => {
    wrapper.setState({ hasCameraPermission: null });
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot when hasCameraPermission is false', () => {
    wrapper.setState({ hasCameraPermission: false });
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot when hasCameraPermission is granted', () => {
    wrapper.setState({ hasCameraPermission: 'granted', type: Camera.Constants.Type.front });
    expect(wrapper).toMatchSnapshot()
  });

  describe('takePicture method', () => {
    it('should call setCameraLoading', () => {
      wrapper.instance().takePicture()
      expect(mockSetCameraLoading).toHaveBeenCalled()
    });
  });

  describe('onPictureSaved method', () => {
    it.skip('should call savePicture', async () => {
      wrapper.instance().onPictureSaved()
      await expect(mockSavePicture).toHaveBeenCalledWith('filePath')
    });
  });

  describe('Camera buttons', () => {
    it('left camera button should call take picture', () => {
      wrapper.setState({ hasCameraPermission: 'granted' });
      wrapper.instance().takePicture = jest.fn();
      wrapper.find(TouchableOpacity).at(0).simulate('press');
      expect(wrapper.instance().takePicture).toHaveBeenCalled();
    });
    it('left switch button should switch state of type from front to back', () => {
      wrapper.setState({ hasCameraPermission: 'granted', type: Camera.Constants.Type.front });
      wrapper.find(TouchableOpacity).at(1).simulate('press');
      expect(wrapper.state('type')).toEqual(Camera.Constants.Type.back);
    });
    it('right camera button should call take picture', () => {
      wrapper.setState({ hasCameraPermission: 'granted' });
      wrapper.instance().takePicture = jest.fn();
      wrapper.find(TouchableOpacity).at(2).simulate('press');
      expect(wrapper.instance().takePicture).toHaveBeenCalled();
    });
    it('right switch button should switch state of type from front to back', () => {
      wrapper.setState({ hasCameraPermission: 'granted', type: Camera.Constants.Type.front });
      wrapper.find(TouchableOpacity).at(3).simulate('press');
      expect(wrapper.state('type')).toEqual(Camera.Constants.Type.back);
    });
  });
});