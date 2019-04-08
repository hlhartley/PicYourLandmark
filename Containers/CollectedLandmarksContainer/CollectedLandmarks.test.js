import React from 'react';
import { CollectedLandmarksContainer } from './CollectedLandmarksContainer';
import renderer from 'react-test-renderer';

describe('CollectedLandmarksContainer', () => {
  let mockVisitedLocations;
  it('renders correctly', () => {
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
    const tree = renderer.create(<CollectedLandmarksContainer visitedLocations={mockVisitedLocations}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
