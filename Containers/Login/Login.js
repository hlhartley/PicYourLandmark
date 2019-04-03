import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon color="#3c4859" name="user-circle" type="font-awesome" size={70} />
                <View>
                    <TouchableOpacity style={{ backgroundColor: '#e9e9e9', width: 200, padding: 10, borderRadius: 15, top: 85 }}>
                        <Text>Create account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#e9e9e9', width: 200, padding: 10, borderRadius: 15, top: 105 }}>
                        <Text>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        left: '5%',
        height: '70%',
        width: '92%',
        padding: 8,
        top: 20
    }
});
