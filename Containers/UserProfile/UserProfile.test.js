import React from 'react';
import { UserProfile } from './UserProfile';
import renderer from 'react-test-renderer';

describe('UserProfile', () => {
  it('renders correctly', () => {
    const mockProfilePic = 'stringURL'
    const tree = renderer.create(<UserProfile profilePic={mockProfilePic} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
