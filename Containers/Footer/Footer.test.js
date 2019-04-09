import React from 'react';
import { Footer } from './Footer';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';

describe('Footer', () => {
  let wrapper;
  let mockChangeCurrentPage;

  beforeEach(() => {
    mockChangeCurrentPage = jest.fn()
    wrapper = shallow(<Footer changeCurrentPage={mockChangeCurrentPage}/>)
  });

  it('should match the snapshot with the correct data passed in when on User profile page', () => {
    wrapper.setProps({ currentPage: 'User profile'})
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with the correct data passed in when on Home page', () => {
    wrapper.setProps({ currentPage: 'Home'})
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with the correct data passed in when on Tutorial page', () => {
    wrapper.setProps({ currentPage: 'Tutorial'})
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with the correct data passed in when on Collecrted landmarks page', () => {
    wrapper.setProps({ currentPage: 'Collected landmarks'})
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with the correct data passed in when on Login page', () => {
    wrapper.setProps({ currentPage: 'Login'})
    expect(wrapper).toMatchSnapshot()
  });

  it('user button should call changeCurrentPage and pass in the string User Profile', () => {
    wrapper.find(TouchableOpacity).at(0).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('User profile')
  });

  it('map marker/home button should call changeCurrentPage and pass in the string Home', () => {
    wrapper.find(TouchableOpacity).at(1).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Home')
  });

  it('image/picture button should call changeCurrentPage and pass in the string Collected landmarks', () => {
    wrapper.find(TouchableOpacity).at(2).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Collected landmarks')
  });
  
  it('tutorial button should call changeCurrentPage and pass in the string Tutorial', () => {
    wrapper.find(TouchableOpacity).at(3).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Tutorial')
  });
  
  it('sign in button should call changeCurrentPage and pass in the string Login', () => {
    wrapper.find(TouchableOpacity).at(4).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Login')
  });
});