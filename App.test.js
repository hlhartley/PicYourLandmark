import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match the snapshot when on the Home page', () => {
    wrapper.setState({ currentPage: 'Home' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the Login page', () => {
    wrapper.setState({ currentPage: 'Login' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the Collected landmarks page', () => {
    wrapper.setState({ currentPage: 'Collected landmarks' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the User profile page', () => {
    wrapper.setState({ currentPage: 'User profile' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when on the Camera page', () => {
    wrapper.setState({ currentPage: 'Camera' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when not on a page', () => {
    wrapper.setState({ currentPage: '' });
    expect(wrapper).toMatchSnapshot();
  });

  describe('changeCurrentPage method', () => {
    it('should change state to what was passed as an argument', () => {
      wrapper.setState({ currentPage: 'Home' });
      wrapper.instance().changeCurrentPage('Camera')
      expect(wrapper.state('currentPage')).toEqual('Camera');
    });
  });

});
