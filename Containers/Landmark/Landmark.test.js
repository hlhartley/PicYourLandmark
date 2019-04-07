import React from 'react';
import { Landmark } from './Landmark';
import renderer from 'react-test-renderer';

describe('Landmark', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Landmark />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
