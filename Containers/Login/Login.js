import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

export class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
    }
    render() {
        if (this.props.isLoggedIn) {
            return ( 
                <View style={styles.container}>
                <ImageBackground source={require('../../assets/goldengate.jpg')} style={styles.imageBackground}>
                <View style={styles.overlay} />
                    <Icon color="white" name="user-circle" type="font-awesome" size={70} padding={15} top={50}/>
                        <View>
                        <TextInput
                            placeholder='Username'
                            style={styles.inputBox}
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                        />
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true} 
                            password={true}
                            style={[styles.inputBox, {top: -20}]}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#e9e9e9', top: -10 }]}>
                            <Text style={{textAlign: 'center'}}>Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.setLoginStatus(false)}>
                            <Text style={[styles.buttonText, {color: 'white'}]}>Click here to create an account</Text>
                        </TouchableOpacity>
                    </View> 
                </ImageBackground>
            </View>
            )
            } else {
                return (
                    <View style={styles.container}>
                    <ImageBackground source={require('../../assets/goldengate.jpg')} style={styles.imageBackground}>
                    <View style={styles.overlay} />
                        <Icon color="white" name="user-circle" type="font-awesome" size={70} padding={15} top={40}/>
                            <View>
                            <TextInput
                                placeholder='Username'
                                style={styles.inputBox}
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
                            />
                            <TextInput
                                placeholder='Password'
                                secureTextEntry={true} 
                                password={true}
                                style={[styles.inputBox, {top: -20}]}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                            />
                            <TextInput
                                placeholder='Confirm Password'
                                secureTextEntry={true} 
                                password={true}
                                style={[styles.inputBox, {top: -10}]}
                                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                value={this.state.confirmPassword}
                            />
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#e9e9e9', top: 5 }]}>
                            <Text style={styles.buttonText}>Create account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.setLoginStatus(true)}>
                            <Text style={[styles.buttonText, {color: 'white', top: 5}]}>Already a member? Click here to log in</Text>
                        </TouchableOpacity>
                    </View> 
                    </ImageBackground>
                </View>
                )
            }
        }
    }

const styles = StyleSheet.create({
    container: {
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
        height: '100%', 
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
    }
});

export default Login;