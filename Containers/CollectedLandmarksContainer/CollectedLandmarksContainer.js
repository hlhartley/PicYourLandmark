import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Landmark from '../Landmark/Landmark';

export class CollectedLandmarksContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                <ScrollView style={styles.scrollView}>
                    <ImageBackground source={require('../../assets/greatwallofchina.jpg')} style={styles.imageBackground}>
                    <View style={styles.overlay} />
                    <Text style={styles.bannerText}>COLLECTED LANDMARKS</Text>
                    <Icon color="white" name="university" type="font-awesome" size={40} top={-110}/>
                    </ImageBackground>
                    {
                        this.props.visitedLocations.map((location) => {
                            return (<Landmark key={location.landmark_id} landmark={location}/>)
                        })
                    }
                </ScrollView>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        height: '54%',
    },
    imageBackground: {
        width: '100%', 
        height: '54%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    bannerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        top: -100,
        padding: 10
    },
    scrollView: {
        height: '300%'
    }
});

export default CollectedLandmarksContainer;