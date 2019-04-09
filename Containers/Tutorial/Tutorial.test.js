import React from 'react';
import { Tutorial } from './Tutorial';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

describe('Tutorial', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tutorial />)
  });

  it('should match the snapshot with the correct data passed in when on User profile page', () => {
    expect(wrapper).toMatchSnapshot()
  });
});
