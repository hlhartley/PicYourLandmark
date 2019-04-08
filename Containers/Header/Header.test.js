import React from 'react';
import { Header } from './Header';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />)
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match the snapshot with the correct title text', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a proper default state', () => {
    const expected = {
      titleText: 'PIC YOUR LANDMARK'
    }

    expect(wrapper.state()).toEqual(expected);
  });
});