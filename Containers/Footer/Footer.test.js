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

  it('should match the snapshot with the correct data passed in', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with 15% containerHeight if the currentPage is Camera', () => {
    wrapper.setProps({ currentPage: 'Camera'})
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

  it('camera button should call changeCurrentPage and pass in the string Camera', () => {
    wrapper.find(TouchableOpacity).at(2).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Camera')
  });

  it('image/picture button should call changeCurrentPage and pass in the string Collected landmarks', () => {
    wrapper.find(TouchableOpacity).at(3).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Collected landmarks')
  });

  it('sign in button should call changeCurrentPage and pass in the string Login', () => {
    wrapper.find(TouchableOpacity).at(4).simulate('press')
    expect(mockChangeCurrentPage).toHaveBeenCalledWith('Login')
  });
});