import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match the snapshot when on the Home page', () => {
    wrapper.setState({ currentPage: 'Home' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the Login page', () => {
    wrapper.setState({ currentPage: 'Login' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the Collected landmarks page', () => {
    wrapper.setState({ currentPage: 'Collected landmarks' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the User profile page', () => {
    wrapper.setState({ currentPage: 'User profile' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the Camera page', () => {
    wrapper.setState({ currentPage: 'Camera' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when not on a page', () => {
    wrapper.setState({ currentPage: '' });
    expect(wrapper).toMatchSnapshot();
  });

  describe('changeCurrentPage method', () => {
    it('should change state to what was passed as an argument', () => {
      wrapper.setState({ currentPage: 'Home' });
      wrapper.instance().changeCurrentPage('Camera')
      expect(wrapper.state('currentPage')).toEqual('Camera');
    });
  });

  describe('takeProfilePic method', () => {
    it('should change state to what was passed as an argument', () => {
      wrapper.setState({ takingProfilePic: false });
      wrapper.instance().takeProfilePic()
      expect(wrapper.state('takingProfilePic')).toEqual(true);
    });
  });

  describe('savePicture method', () => {
    it('should change state to what was passed as an argument if takingProfilePic is true', () => {
      wrapper.setState({ takingProfilePic: true });
      wrapper.instance().savePicture('newPic')
      expect(wrapper.state('profilePic')).toEqual('newPic');
      expect(wrapper.state('cameraLoading')).toEqual(false);
      expect(wrapper.state('currentPage')).toEqual('User profile');
      expect(wrapper.state('takingProfilePic')).toEqual(false)
    });

    it.skip('should call addLocationPhoto if takingProfilePic is false', () => {
      wrapper.setState({ takingProfilePic: false, currentPhotoLocation: ''});
      wrapper.instance().savePicture('newPic')
      wrapper.instance().addLocationPhoto = jest.fn()
      expect(wrapper.instance().addLocationPhoto).toHaveBeenCalled()
    });
  });

  describe('takeLocationPhoto method', () => {
    it('should change state to what was passed as an argument', () => {
      const mockCurrentPhotoLocation = {
        name: 'selectedName',
        description: 'selectedDescription',
        lat: 'selectedLatitude',
        lon: 'selectedLongitude',
        landmark_id: 'selectedID',
        photo_url: ''
      }
      wrapper.instance().takeLocationPhoto('selectedName', 'selectedDescription', 'selectedLatitude', 'selectedLongitude', 'selectedID')
      expect(wrapper.state('currentPhotoLocation')).toEqual(mockCurrentPhotoLocation);
      expect(wrapper.state('currentPage')).toEqual('Camera')
    });
  });

  describe('setCameraLoading method', () => {
    it('should change state to what was passed as an argument', () => {
      wrapper.setState({ cameraLoading: false })
      wrapper.instance().setCameraLoading()
      expect(wrapper.state('cameraLoading')).toEqual(true);
    });
  });

  describe('setUserLoginId method', () => {
    it('should change state to what was passed as an argument', () => {
      wrapper.setState({ currentUserId: 1 })
      wrapper.instance().setUserLoginId(2)
      expect(wrapper.state('currentUserId')).toEqual(2);
    });
  });
});
