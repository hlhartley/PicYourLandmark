import React from 'react';
import { CameraWindow } from './Camera';
import renderer from 'react-test-renderer';

describe('CameraWindow', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CameraWindow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})
