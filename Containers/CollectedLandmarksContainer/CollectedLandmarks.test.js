import React from 'react';
import { CollectedLandmarksContainer } from './CollectedLandmarksContainer';
import renderer from 'react-test-renderer';

describe('CollectedLandmarksContainer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CollectedLandmarksContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
