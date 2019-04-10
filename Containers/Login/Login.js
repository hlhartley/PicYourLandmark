import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      isLoginPage: true
    }
  }

  componentWillUnmount() {
    this.props.setLoggedOutMessage('')
  };

  createAccount = async () => {
    try {
      const { username, password, confirmPassword, email } = this.state;
      const url = `https://pic-landmark-api.herokuapp.com/api/v1/users/?email=${email}&username=${username}&password=${password}&password_confirmation=${confirmPassword}`
      const response = await fetch(url, { method: 'POST', headers: { 'Content-type': 'application/json' }});
      const result = await response.json();
      this.props.setUserLogin(result.id, result.username);
    } catch (error) {
      console.log(error.message);
    }
  }

  loginUser = () => {
    const { username, password } = this.state;
    this.props.fetchUserInfo(username, password);
  }

  toggleLoginPage = () => {
    this.setState({ isLoginPage: !this.state.isLoginPage });
  }

  handleUsernameText = (e) => {
    this.setState({ username: e });
  }

  handlePasswordText = (e) => {
    this.setState({ password: e });
  }

  handleConfirmPasswordText = (e) => {
    this.setState({ confirmPassword: e });
  }

  handleEmailText = (e) => {
    this.setState({ email: e});
  }

  render() {
    if (this.props.currentUserId >= 0) {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../../assets/goldengate.jpg')} style={styles.imageBackground}>
            <View style={styles.overlay} />
            <View>
              <Icon color="white" name="user-circle" type="font-awesome" size={70} padding={15} top={50} />
              <Text style={styles.usernameText}>{this.state.username}</Text>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#e9e9e9', top: -10 }]} onPress={() => this.props.setUserLogout()}>
              <Text style={{ textAlign: 'center' }}>Log out</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )
    } else if (this.state.isLoginPage) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <ImageBackground source={require('../../assets/goldengate.jpg')} style={styles.imageBackground}>
            <View style={styles.overlay} />
            <Text style={[styles.buttonText, { color: 'yellow' }]}>{this.props.loggedOutMessage}</Text>
            <Icon color="white" name="user-circle" type="font-awesome" size={70} padding={15}  />
            <View>
              <TextInput
                placeholder='Username'
                style={styles.inputBox}
                onChangeText={(e) => this.handleUsernameText(e)}
                value={this.state.username}
              />
              <TextInput
                placeholder='Password'
                secureTextEntry={true}
                password={true}
                style={[styles.inputBox, { top: -20 }]}
                onChangeText={(e) => this.handlePasswordText(e)}
                value={this.state.password}
              />
              <TouchableOpacity style={[styles.button, { backgroundColor: '#e9e9e9', top: -10 }]} onPress={() => this.loginUser()}>
                <Text style={{ textAlign: 'center' }}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.toggleLoginPage()}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Click here to create an account</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      )
    } else {
      return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <ImageBackground source={require('../../assets/goldengate.jpg')} style={styles.imageBackground}>
            <View style={styles.overlay} />
            <Icon color="white" name="user-circle" type="font-awesome" size={70} padding={15} />
            <View>
              <TextInput
                placeholder='Username'
                style={styles.inputBox}
                onChangeText={(e) => this.handleUsernameText(e)}
                value={this.state.username}
              />
              <TextInput
                placeholder='E-mail'
                style={[styles.inputBox, { top: -20 }]}
                onChangeText={(e) => this.handleEmailText(e)}
                value={this.state.email}
              />
              <TextInput
                placeholder='Password'
                secureTextEntry={true}
                password={true}
                style={[styles.inputBox, { top: -10 }]}
                onChangeText={(e) => this.handlePasswordText(e)}
                value={this.state.password}
              />
              <TextInput
                placeholder='Confirm Password'
                secureTextEntry={true}
                password={true}
                style={[styles.inputBox, { top: 0 }]}
                onChangeText={(e) => this.handleConfirmPasswordText(e)}
                value={this.state.confirmPassword}
              />
              <TouchableOpacity style={[styles.button, { backgroundColor: '#e9e9e9', top: 10 }]} onPress={() => this.createAccount()}>
                <Text style={styles.buttonText}>Create account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.toggleLoginPage()}>
                <Text style={[styles.buttonText, { color: 'white', top: 10 }]}>Already a member? Click here to log in</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
    width: '100%',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.4,
    height: '100%',
  },
  imageBackground: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  inputBox: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white',
    opacity: 0.7,
    padding: 5,
    textAlign: 'center',
    top: -30
  },
  button: {
    width: 200,
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: 'center'
  },
  usernameText: {
    color: 'white',
    fontSize: 24,
    top: 55,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default Login;