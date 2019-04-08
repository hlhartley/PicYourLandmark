import React from 'react';
import { Landmark } from './Landmark';
import renderer from 'react-test-renderer';

describe('Landmark', () => {
  let mockLocation;
  test('renders correctly', () => {
    mockLocation = {
      name: "Great Lawn Park",
      description: "Beautiful Park",
      lat: 39.72386,
      lon: -104.88715,
      landmark_id: 6,
      photo_url: "www.myimage.com/2"
  }
    const tree = renderer.create(<Landmark key={1} landmark={mockLocation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
