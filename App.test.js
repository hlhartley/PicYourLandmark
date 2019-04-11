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
      expect(wrapper.state('currentPage')).toEqual('Login');
      wrapper.instance().changeCurrentPage('Camera')
      expect(wrapper.state('currentPage')).toEqual('Camera');
    });
  });

  describe('setLoggedOutMessage method', () => {
    it('should change state to what was passed as an argument', () => {
      expect(wrapper.state('loggedOutMessage')).toEqual('');
      wrapper.instance().setLoggedOutMessage('Cannot do that')
      expect(wrapper.state('loggedOutMessage')).toEqual('Cannot do that');
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
      const newPic = 'newPicURL';
      wrapper.instance().storeProfilePic = jest.fn()
      wrapper.setState({ takingProfilePic: true });
      wrapper.instance().savePicture(newPic)
      expect(wrapper.state('profilePic')).toEqual(newPic);
      expect(wrapper.state('cameraLoading')).toEqual(false);
      expect(wrapper.state('currentPage')).toEqual('User profile');
      expect(wrapper.state('takingProfilePic')).toEqual(false)
      expect(wrapper.instance().storeProfilePic).toHaveBeenCalledWith(newPic)
    });

    it('should call addLocationPhoto if takingProfilePic is false', () => {
      const newPic = 'newPicURL';
      wrapper.instance().addLocationPhoto = jest.fn()
      wrapper.setState({ takingProfilePic: false});
      wrapper.instance().savePicture(newPic)
      expect(wrapper.instance().addLocationPhoto).toHaveBeenCalledWith(newPic)
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

  describe('setUserLogin method', () => {
    it('should change state to what was passed as an argument', () => {
      wrapper.setState({ currentUserId: 1 })
      wrapper.instance().setUserLogin(2)
      expect(wrapper.state('currentUserId')).toEqual(2);
    });
  });

  describe('changeCurrentPage method', () => {
    it('should change state to what was passed as an argument', () => {
      expect(wrapper.state('currentPage')).toEqual('Login');
      wrapper.instance().changeCurrentPage('Home')
      expect(wrapper.state('currentPage')).toEqual('Home');
    });
  });

  describe.skip('fetchUserInfo method', () => {
    it('should make fetch call when fetchUserInfo is called', async () => {
      window.fetch = jest.fn()
      await wrapper.instance().fetchUserInfo('tester', 'abc')
      let mockUrl = `https://pic-landmark-api.herokuapp.com/api/v1/users/?username=tester&password=abc`
      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    });

    it('should get the user info if everything is ok', async () => {
      const expected = {
          user_id: 1,
          username: "joe55",
          user_locations: [
            {
                "name": "Great Lawn Park",
                "description": "Beautiful Park",
                "lat": 39.72386,
                "lon": -104.88715,
                "landmark_id": 6,
                "photo_url": "www.myimage.com/2"
            },
            {
                "name": "Buckley Annex",
                "description": "Beautiful Park",
                "lat": 39.7159,
                "lon": -104.90379,
                "landmark_id": 3,
                "photo_url": "www.myimage.com"
            }
          ]
      }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          user_id: 1,
          username: "joe55",
          user_locations: [
            {
                "name": "Great Lawn Park",
                "description": "Beautiful Park",
                "lat": 39.72386,
                "lon": -104.88715,
                "landmark_id": 6,
                "photo_url": "www.myimage.com/2"
            },
            {
                "name": "Buckley Annex",
                "description": "Beautiful Park",
                "lat": 39.7159,
                "lon": -104.90379,
                "landmark_id": 3,
                "photo_url": "www.myimage.com"
            }
          ]
      }),
        status: 200,
        ok: true
      }));
      await wrapper.instance().fetchUserInfo('joe55', 'abc123');
      expect(wrapper.state('visitedLocations')).toEqual(expected.user_locations);
      expect(wrapper.state('currentPage')).toEqual('Home');
      expect(wrapper.state('currentUserId')).toEqual(expected.user_id);
    });

    it('should return an error if everything is not ok', async () => {
      const expected = Error('Error fetching data');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        json: jest.fn().mockReturnValue('Error fetching data')
      }));
      expect(wrapper.instance().fetchUserInfo('joe55', 'abc123')).rejects.toEqual(expected)
    });
  });
});
