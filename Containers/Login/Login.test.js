import React from 'react';
import { Login } from './Login';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer'

describe('Login', () => {
  let wrapper;
  let mockSetUserLogin;
  let mockFetchUserInfo;
  let mockChangeCurrrentPage;
  let mockSetLoggedOutMessage;
  let mockSetUserLogout

  beforeEach(() => {
    mockSetUserLogin = jest.fn()
    mockFetchUserInfo = jest.fn()
    mockChangeCurrrentPage = jest.fn()
    mockSetLoggedOutMessage = jest.fn()
    mockSetUserLogout = jest.fn()
    wrapper = shallow(<Login currentUserId={1}
      setUserLogin={mockSetUserLogin}
      changeCurrentPage={mockChangeCurrrentPage}
      fetchUserInfo={mockFetchUserInfo}
      setLoggedOutMessage={mockSetLoggedOutMessage}
      setUserLogout={mockSetUserLogout}
    />)
  });

  it('should have a proper default state', () => {
    const expected = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      isLoginPage: true
    }

    expect(wrapper.state()).toEqual(expected);
  });

  describe('Login rendering', () => {
    it('should match the snapshot when the currentUserId is greater than or equal to 0', () => {
      wrapper.setProps({ currentUserId: -1 })
      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ currentUserId: 1 })
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when this.state.isLoginPage is true', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when this.state.isLoginPage is false', () => {
      wrapper.setState({ isLoginPage: false })
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Login buttons', () => {
    it('logout button should call setUserLogout when pressed', () => {
      wrapper.find(TouchableOpacity).at(0).simulate('press')
      expect(mockSetUserLogout).toHaveBeenCalled()
    });

    it('login button should call this.loginUser when pressed', () => {
      wrapper.instance().loginUser = jest.fn()
      wrapper.setProps({ currentUserId: -1 })
      wrapper.setState({ isLoginPage: true })
      wrapper.find(TouchableOpacity).at(0).simulate('press')
      expect(wrapper.instance().loginUser).toHaveBeenCalled()
    });

    it('Click here to create account button should call this.toggleLoginPage when pressed', () => {
      wrapper.instance().toggleLoginPage = jest.fn()
      wrapper.setProps({ currentUserId: -1 })
      wrapper.setState({ isLoginPage: true })
      wrapper.find(TouchableOpacity).at(1).simulate('press')
      expect(wrapper.instance().toggleLoginPage).toHaveBeenCalled()
    });

    it('Create account button should call this.createAccount when pressed', () => {
      wrapper.instance().createAccount = jest.fn()
      wrapper.setProps({ currentUserId: -1 })
      wrapper.setState({ isLoginPage: false })
      wrapper.find(TouchableOpacity).at(0).simulate('press')
      expect(wrapper.instance().createAccount).toHaveBeenCalled()
    });

    it('Already a member? Click here to log in button should call this.toggleLoginPage when pressed', () => {
      wrapper.instance().toggleLoginPage = jest.fn()
      wrapper.setProps({ currentUserId: -1 })
      wrapper.setState({ isLoginPage: false })
      wrapper.find(TouchableOpacity).at(1).simulate('press')
      expect(wrapper.instance().toggleLoginPage).toHaveBeenCalled()
    });
  });

  describe('createAccount method', () => {
    it.skip('createAccount method should make post request when createAccount is called', async () => {
      window.fetch = jest.fn()
      let email = 'tester01@gmail.com'
      let username = 'tester01'
      let password = 'abc'
      let confirmPassword = 'abc'
      let mockUrl = `https://pic-landmark-api.herokuapp.com/api/v1/users/?email=${email}&username=${username}&password=${password}&password_confirmation=${confirmPassword}`

      wrapper.setState({ email, username, password, confirmPassword })
      await wrapper.instance().createAccount()
      expect(window.fetch).toHaveBeenCalledWith(mockUrl, { method: 'POST', headers: { 'Content-type': 'application/json' } })
    });

    it('createAccount method should send back user id and username, and call setUserLogin and changeCurrentPage methods if everything is ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          "id": 27,
          "email": "landmarker@example.com",
          "username": "landmarker",
          "profile_url": "",
          "locations": []
        }),
        status: 200,
        ok: true
      }));
      await wrapper.instance().createAccount();
      expect(mockSetUserLogin).toHaveBeenCalledWith(27, "landmarker");
    });

    it('createAccount method should throw error if everything is not ok', async () => {
      const expected = Error('Error fetching data');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        json: jest.fn().mockReturnValue('Error fetching data')
      }));
      expect(wrapper.instance().createAccount()).rejects.toEqual(expected)
    });
  });

  describe('loginUser method', () => {
    it('loginUser method should call fetchUserInfo when loginUser is called', () => {
      wrapper.instance().loginUser()
      expect(mockFetchUserInfo).toHaveBeenCalled()
    });
  })

  describe('toggleLoginPage method', () => {
    it('toggleLoginPage method should set state with isLoginPage value', () => {
      wrapper.instance().toggleLoginPage()
      expect(wrapper.state().isLoginPage).toEqual(false)
    });
  });

  describe('handleUsernameText method', () => {
    it('should update the username on text input on login page', () => {
      const instanceOf = renderer.create(<Login isLoginPage={true} currentUserId={-1} />).getInstance()
      instanceOf.handleUsernameText('username1')
      expect(instanceOf.state.username).toEqual('username1')
    });

    it('should update the username on text input on create new account page', () => {
      const instanceOf = renderer.create(<Login isLoginPage={false} currentUserId={-1} />).getInstance()
      instanceOf.handleUsernameText('username2')
      expect(instanceOf.state.username).toEqual('username2')
    });
  });

  describe('handlePasswordText method', () => {
    it('should update the password on text input on login page', () => {
      const instanceOf = renderer.create(<Login isLoginPage={true} currentUserId={-1} />).getInstance()
      instanceOf.handlePasswordText('password1')
      expect(instanceOf.state.password).toEqual('password1')
    });

    it('should update the password on text input on create new account page', () => {
      const instanceOf = renderer.create(<Login isLoginPage={false} currentUserId={-1} />).getInstance()
      instanceOf.handlePasswordText('password2')
      expect(instanceOf.state.password).toEqual('password2')
    });

    it('should update the email on text input on create new account page', () => {
      const instanceOf = renderer.create(<Login isLoginPage={false} currentUserId={-1} />).getInstance()
      instanceOf.handleEmailText('tester001@gmail.com')
      expect(instanceOf.state.email).toEqual('tester001@gmail.com')
    });
  });

  describe('handleConfirmPasswordText method', () => {
    it('should update the confirm password on text input on create new account page', () => {
      const instanceOf = renderer.create(<Login isLoginPage={false} currentUserId={-1} />).getInstance()
      instanceOf.handleConfirmPasswordText('confirmPassword1')
      expect(instanceOf.state.confirmPassword).toEqual('confirmPassword1')
    });
  });
});
