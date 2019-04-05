import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import Landmark from '../Landmark/Landmark';

export default class CollectedLandmarksContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/greatwallofchina.jpg')} style={{width: '100%', height: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.overlay} />
                <Text style={styles.bannerText}>COLLECTED LANDMARKS</Text>
                <Icon color="white" name="university" type="font-awesome" size={40} top={-34}/>
                </ImageBackground>
                <Landmark />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '70%',
        width: '100%'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        height: '62%',
    },
    bannerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        top: -49,
        padding: 10
    }
});
