import React, {Component} from 'react';
import Home from './Containers/Home/Home';
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/Footer';
import Login from './Containers/Login/Login';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 'Login'
    }
  }

  render() {
    const { currentPage } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        {
          currentPage === 'Home' ? <Home /> : currentPage === 'Login' ? <Login /> : null
        }
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f6f6f6'
  }
});

