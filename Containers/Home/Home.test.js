import React from 'react';
import { Home } from './Home';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';

jest.mock('react-native-maps', () => {
  const React = require.requireActual('react');
  const MapView = require.requireActual('react-native-maps');

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});

describe('Home', () => {

  let wrapper;
  let mockLatitude;
  let mockLongitude;
  let mockChangeCurrentPage;

  beforeEach(() => {
    mockLatitude = 23.4;
    mockLongitude = 104.8;
    mockChangeCurrentPage = jest.fn();
    mockTakeLocationPhoto = jest.fn();
    mockAllLocations = [
      {
        "name": "Great Lawn Park",
        "description": "Beautiful Park",
        "lat": 39.72386,
        "lon": -104.88715,
        "id": 6
      },
      {
        "name": "Buckley Annex",
        "description": "Beautiful Park",
        "lat": 39.7159,
        "lon": -104.90379,
        "id": 3
      }
    ];
    mockVisitedLocations = [
      {
        "name": "Great Lawn Park",
        "description": "Beautiful Park",
        "lat": 39.72386,
        "lon": -104.88715,
        "id": 6
      }
    ];
    mockVisitedLocationIds = [6];
    mockCurrentUserId = 1;
    mockSetLoggedOutMessage = jest.fn();

    wrapper = shallow(<Home currentLatitude={mockLatitude}
      currentLongitude={mockLongitude}
      changeCurrentPage={mockChangeCurrentPage}
      takeLocationPhoto={mockTakeLocationPhoto}
      allLocations={mockAllLocations}
      visitedLocations={mockVisitedLocations}
      visitedLocationIds={mockVisitedLocationIds}
      currentUserId={mockCurrentUserId}
      setLoggedOutMessage={mockSetLoggedOutMessage} />);
  });

  it('should match the snapshot when a user has not clicked on a location', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when a user has not clicked on a location', () => {
    wrapper.setProps({ currentLatitude: null })
    expect(wrapper).toMatchSnapshot();
  });

  it('should call calculateDistance when a marker is clicked', () => {
    wrapper.instance().calculateDistance = jest.fn();
    wrapper.find(Marker).first().simulate('press');
    expect(wrapper.instance().calculateDistance).toHaveBeenCalled();
  });

  describe('when the user clicks a location that they have already visited and are close enough to retake a photo', () => {
    beforeEach(() => {
      wrapper.setState({ clickedLocation: true, selectedVisited: true, calculatedDistance: 0 });
    });

    it('should match the snapshot when the user clicks a location', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call takeProfilePic when user does not have a profile picture', () => {
      wrapper.instance().sendLocationPhoto = jest.fn();
      wrapper.find(TouchableOpacity).first().simulate('press');
      expect(wrapper.instance().sendLocationPhoto).toHaveBeenCalled();
    });
  });

  describe('when the user clicks a location that they have already visited but they are not close enough to retake a photo', () => {
    it('should match the snapshot when the user clicks a location', () => {
      wrapper.setState({ clickedLocation: true, selectedVisited: true, calculatedDistance: 2 });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when a user clicks on a marker location but has not visited the location', () => {
    it('should match the snapshot if they are close enough to take a photo', () => {
      wrapper.instance().sendLocationPhoto = jest.fn();
      wrapper.setState({ clickedLocation: true, selectedVisited: false, calculatedDistance: 0 });
      wrapper.find(TouchableOpacity).first().simulate('press');
      expect(wrapper.instance().sendLocationPhoto).toHaveBeenCalled();
    });

    it('should match the snapshot if the user is too far away to take a photo', () => {
      wrapper.setState({ clickedLocation: true, selectedVisited: false, calculatedDistance: 2 });
      expect(wrapper).toMatchSnapshot();
    });
  })

  describe('calculateDistance method', () => {
    const mockLat = 39.77;
    const mockLon = -104.99;
    const mockName = 'The Delectable Egg';
    const mockVisited = true;
    const mockUnvisited = false;
    const mockDescription = 'Example description';
    const mockLocation = {
      lat: mockLat,
      lon: mockLon,
      name: mockName,
      visited: mockVisited,
      description: mockDescription
    }
    const mockVisitedPinColor = '#FFF000';
    const mockUnvisitedPinColor = '#000FFF';

    it('should take in a location and then setState with distance from current user and relevant location information', () => {
      wrapper.instance().calculateDistance(mockLocation, mockVisitedPinColor)
      expect(wrapper.state('calculatedDistance')).toEqual('7668.42');
      expect(wrapper.state('selectedName')).toEqual(mockName);
      expect(wrapper.state('selectedVisited')).toEqual(mockVisited);
      expect(wrapper.state('selectedDescription')).toEqual(mockDescription);
      expect(wrapper.state('clickedLocation')).toEqual(true);
    })

    it('should take in a location and then setState with distance from current user and relevant location information', () => {
      // wrapper.setProps({ currentUserId: -1 })
      wrapper.instance().calculateDistance(mockLocation, mockUnvisitedPinColor)
      expect(wrapper.state('calculatedDistance')).toEqual('7668.42');
      expect(wrapper.state('selectedName')).toEqual(mockName);
      expect(wrapper.state('selectedVisited')).toEqual(mockUnvisited);
      expect(wrapper.state('selectedDescription')).toEqual(mockDescription);
      expect(wrapper.state('clickedLocation')).toEqual(true);
    })
  })

  describe('sendLocationPhoto', () => {
    // wrapper.setProps({currentUserId: -1})
    it('should', () => {
      wrapper.instance().sendLocationPhoto()
      expect(mockTakeLocationPhoto).toHaveBeenCalled();
    })
    it('should', () => {
      wrapper.setProps({ currentUserId: -1 })
      wrapper.instance().sendLocationPhoto()
      expect(mockSetLoggedOutMessage).toHaveBeenCalledWith('You need to be logged in to perform that action');
      expect(mockChangeCurrentPage).toHaveBeenCalledWith('Login');
    });
  });
});
