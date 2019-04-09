import React from 'react';
import { CollectedLandmarksContainer } from './CollectedLandmarksContainer';
import { shallow } from 'enzyme';

describe('CollectedLandmarksContainer', () => {
  let wrapper;
  let mockVisitedLocations;
  beforeEach(() => {
    mockVisitedLocations = [
      {
        name: "Great Lawn Park",
        description: "Beautiful Park",
        lat: 39.72386,
        lon: -104.88715,
        landmark_id: 6,
        photo_url: "www.myimage.com/2"
    },
    {
        name: "Buckley Annex",
        description: "Beautiful Park",
        lat: 39.7159,
        lon: -104.90379,
        landmark_id: 3,
        photo_url: "www.myimage.com"
    }
  ]
    wrapper = shallow(<CollectedLandmarksContainer visitedLocations={mockVisitedLocations}/>);
  });

  it('should match the snapshot when there are visited locations', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there are no visited locations', () => {
    wrapper.setProps({ visitedLocations: []})
    expect(wrapper).toMatchSnapshot();
  });
});
