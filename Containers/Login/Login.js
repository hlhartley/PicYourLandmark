import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/statueofliberty.jpg')} style={{width: '100%', height: '100%', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style={[styles.overlay, { height: '100%'}]} />
                <View>
                    {/* <Text style={styles.loginText}>LOGIN</Text> */}
                    <Icon color="white" name="user-circle" type="font-awesome" size={75} padding={15}/>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: '#e9e9e9', width: 200, padding: 10, borderRadius: 15, bottom: 10 }}>
                        <Text>Create account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#e9e9e9', width: 200, padding: 10, borderRadius: 15 }}>
                        <Text>Log in</Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80%',
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.3,
        height: '70%',
    },
    // loginText: {
    //     color: 'white',
    //     fontSize: 25,
    //     fontWeight: '600',
    //     textAlign: 'center',
    //     paddingBottom: 10,
    // }
});
