import React from 'react';
import { UserProfile } from './UserProfile';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

describe('UserProfile', () => {

  let wrapper;
  let mockProfilePic;
  let mockTakeProfilePic;
  let mockCurrentUserName;
  let mockChangeCurrentPage;
  let mockSetLoggedOutMessage;

  beforeEach(() => {
    mockTakeProfilePic = jest.fn();
    mockChangeCurrentPage = jest.fn();
    mockSetLoggedOutMessage = jest.fn();
    mockProfilePic = 'stringURL';
    mockCurrentUserName = ''
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} changeCurrentPage={mockChangeCurrentPage} visitedLocations={[]} setLoggedOutMessage={mockSetLoggedOutMessage} points={0}/>);
  });

  it('should match the snapshot when the user has a profile picture', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the user does not have a profile picture', () => {
    mockProfilePic = '';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[]} points={0} setLoggedOutMessage={mockSetLoggedOutMessage} changeCurrentPage={mockChangeCurrentPage}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is a current user with no visited locations', () => {
    mockCurrentUserName = 'tester';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[]} points={0} setLoggedOutMessage={mockSetLoggedOutMessage} changeCurrentPage={mockChangeCurrentPage}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is a current user with 1 or more visited locations', () => {
    mockCurrentUserName = 'tester';
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[{ name: 'Eiffel Tower' }]} points={0} setLoggedOutMessage={mockSetLoggedOutMessage} changeCurrentPage={mockChangeCurrentPage}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call takeProfilePic when user already has a profile picture', () => {
    wrapper = shallow(<UserProfile profilePic={mockProfilePic} takeProfilePic={mockTakeProfilePic} currentUserName={mockCurrentUserName} visitedLocations={[{ name: 'Eiffel Tower' }]} points={0} setLoggedOutMessage={mockSetLoggedOutMessage} changeCurrentPage={mockChangeCurrentPage}/>);
    wrapper.find(TouchableOpacity).first().simulate('press');
    expect(mockTakeProfilePic).toHaveBeenCalled();
  });

  it('should call takeProfilePic when user does not have a profile picture', () => {
    wrapper = shallow(<UserProfile profilePic={''} takeProfilePic={mockTakeProfilePic} currentUserName={'hello'} visitedLocations={[]} points={0} setLoggedOutMessage={mockSetLoggedOutMessage} changeCurrentPage={mockChangeCurrentPage}/>);
    wrapper.find(TouchableOpacity).at(0).simulate('press');
    expect(mockTakeProfilePic).toHaveBeenCalled();
  });

  it('should call userNeedLogin when user does not have a profile picture and no currentUserName', () => {
    wrapper = shallow(<UserProfile profilePic={''} takeProfilePic={mockTakeProfilePic} currentUserName={''} visitedLocations={[]} points={0} setLoggedOutMessage={mockSetLoggedOutMessage} changeCurrentPage={mockChangeCurrentPage}/>);
    const spy = jest.spyOn(wrapper.instance(), 'userNeedLogin')
    wrapper.find(TouchableOpacity).first().simulate('press');
    expect(spy).toHaveBeenCalled();
  });
});
