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
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[]} points={0}/>);
  });

  it('should match the snapshot when the user has a profile picture', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the user does not have a profile picture', () => {
    mockProfilePic = '';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[]} points={0}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is a current user with no visited locations', () => {
    mockCurrentUserName = 'tester';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[]} points={0}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is a current user with 1 or more visited locations', () => {
    mockCurrentUserName = 'tester';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[{ name: 'Eiffel Tower' }]} points={0}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call takeProfilePic when user already has a profile picture', () => {
    wrapper.find(TouchableOpacity).first().simulate('press');
    expect(mockTakeProfilePic).toHaveBeenCalled();
  });

  it('should call takeProfilePic when user does not have a profile picture', () => {
    mockProfilePic = '';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[]} points={0}/>);
    wrapper.find(TouchableOpacity).first().simulate('press');
    expect(mockTakeProfilePic).toHaveBeenCalled();
  });
});
