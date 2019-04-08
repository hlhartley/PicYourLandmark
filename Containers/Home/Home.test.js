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

describe.skip('Home', () => {

  let wrapper;
  let mockLatitude;
  let mockLongitude;
  let mockChangeCurrentPage;

  beforeEach(() => {
    mockLatitude = 23.4;
    mockLongitude = 104.8;
    mockChangeCurrentPage = jest.fn();
    mockTakeLocationPhoto = jest.fn();
    wrapper = shallow(<Home currentLatitude={mockLatitude} currentLongitude={mockLongitude} changeCurrentPage={mockChangeCurrentPage} takeLocationPhoto={mockTakeLocationPhoto} />);
  });

  it('should match the snapshot when a user has not clicked on a location', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when the user clicks a location that they have already visited and are close enough to retake a photo', () => {
    beforeEach(() => {
      wrapper.setState({ clickedLocation: true, selectedVisited: true, calculatedDistance: 0 });
    });

    it('should match the snapshot when the user clicks a location', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call takeProfilePic when user does not have a profile picture', () => {
      wrapper.find(TouchableOpacity).first().simulate('press');
      expect(mockChangeCurrentPage).toHaveBeenCalledWith('Camera');
    });
  });

  it('when the user clicks a location that they have already visited but they are not close enough to retake a photo', () => {
    wrapper.setState({ clickedLocation: true, selectedVisited: true, calculatedDistance: 2 });
    expect(wrapper).toMatchSnapshot();
  });

  describe('when a user clicks on a marker location but has not visited the location', () => {
    it('should match the snapshot if they are close enough to take a photo', () => {
      wrapper.setState({ clickedLocation: true, selectedVisited: false, calculatedDistance: 0 });
      wrapper.find(TouchableOpacity).first().simulate('press');
      expect(mockChangeCurrentPage).toHaveBeenCalledWith('Camera');
    });

    it('should match the snapshot if the user is too far away to take a photo', () => {
      wrapper.setState({ clickedLocation: true, selectedVisited: false, calculatedDistance: 2 });
      expect(wrapper).toMatchSnapshot();
    });
  })

  it('should call calculateDistance when a marker is clicked', () => {
    wrapper.instance().calculateDistance = jest.fn();
    wrapper.find(Marker).first().simulate('press');
    expect(wrapper.instance().calculateDistance).toHaveBeenCalled();
  });

  describe('calculateDistance method', () => {
    const mockLat = 39.77;
    const mockLon = -104.99;
    const mockName = 'The Delectable Egg';
    const mockVisited = true;
    const mockDescription = 'Example description';
    const mockLocation = {
      lat: mockLat,
      lon: mockLon,
      name: mockName,
      visited: mockVisited,
      description: mockDescription
    }

    it('should take in a location and then setState with distance from current user and relevant location information', () => {
      wrapper.instance().calculateDistance(mockLocation)
      expect(wrapper.state('calculatedDistance')).toEqual('7668.42');
      expect(wrapper.state('selectedName')).toEqual(mockName);
      expect(wrapper.state('selectedVisited')).toEqual(mockVisited);
      expect(wrapper.state('selectedDescription')).toEqual(mockDescription);
      expect(wrapper.state('clickedLocation')).toEqual(true);
    })
  })
});
