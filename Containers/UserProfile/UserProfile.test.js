import React from 'react';
import { UserProfile } from './UserProfile';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

describe('UserProfile', () => {

  let wrapper;
  let mockProfilePic;
  let mockTakeProfilePic;
  let mockCurrentUserName;

  beforeEach(() => {
    mockTakeProfilePic = jest.fn();
    mockProfilePic = 'stringURL';
    mockCurrentUserName = ''
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName}/>);
  });

  it('should match the snapshot when the user has a profile picture', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the user does not have a profile picture', () => {
    mockProfilePic = '';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call takeProfilePic when user already has a profile picture', () => {
    wrapper.find(TouchableOpacity).first().simulate('press');
    expect(mockTakeProfilePic).toHaveBeenCalled();
  });

  it('should call takeProfilePic when user does not have a profile picture', () => {
    mockProfilePic = '';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName}/>);
    wrapper.find(TouchableOpacity).first().simulate('press');
    expect(mockTakeProfilePic).toHaveBeenCalled();
  });
});
