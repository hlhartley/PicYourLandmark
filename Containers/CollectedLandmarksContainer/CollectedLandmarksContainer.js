import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import Landmark from '../Landmark/Landmark';

export default class CollectedLandmarksContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Collected Landmarks</Text>
                <Landmark />
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
