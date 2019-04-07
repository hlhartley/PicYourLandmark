import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Landmark from '../Landmark/Landmark';

export class CollectedLandmarksContainer extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[{ flex: 1 }, StyleSheet.absoluteFill]}>
                    <ScrollView style={styles.scrollView}>
                        <ImageBackground source={require('../../assets/greatwallofchina.jpg')} style={{width: '100%', height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.overlay} />
                        <Text style={styles.bannerText}>COLLECTED LANDMARKS</Text>
                        <Icon color="white" name="university" type="font-awesome" size={40} top={-100}/>
                        </ImageBackground>
                        <Landmark />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        height: '45%',
    },
    bannerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        top: -120,
        padding: 10
    }
});

export default CollectedLandmarksContainer;