import React from 'react';
import { Landmark } from './Landmark';
import { shallow } from 'enzyme';

describe('Landmark', () => {
  let wrapper;
  let mockLocation;

  beforeEach(() => {
    mockLocation = {
      name: "Great Lawn Park",
      description: "Beautiful Park",
      lat: 39.72386,
      lon: -104.88715,
      landmark_id: 6,
      photo_url: "www.myimage.com/2"
  }
    wrapper = shallow(<Landmark key={1} landmark={mockLocation}/>)
  });

  it('should match the snapshot with the correct data passed in when on User profile page', () => {
    expect(wrapper).toMatchSnapshot()
  });
});
