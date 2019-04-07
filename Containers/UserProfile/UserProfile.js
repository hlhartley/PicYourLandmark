import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

export class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: 'user 1',
            points: 30,
            numLandmarksVisited: 3,
            recentLandmark: 'Coors Field'
        }
    }
    render() {
        const { profilePic } = this.props;
        return (
            <View style={styles.viewContainer}>
                <ImageBackground source={require('../../assets/brandenburggate.jpg')} style={{ width: '100%', height: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.overlay} />
                    <Text style={styles.bannerText}>WELCOME, {this.state.username.toUpperCase()}!</Text>
                    <Icon color="white" name="id-card" type="font-awesome" size={40} top={-34} />
                </ImageBackground>
                {
                    profilePic.length ?
                        <TouchableOpacity style={styles.profilePictureContainer} onPress={() => this.props.takeProfilePic()}>
                            <View style={styles.pictureContainer} >
                                <Image
                                    style={styles.profilePicture}
                                    source={{ uri: profilePic }}
                                />
                            </View>
                        </TouchableOpacity>
                        : <TouchableOpacity style={styles.profilePictureContainer} onPress={() => this.props.takeProfilePic()}>
                            <Icon color="#3c4859" name="portrait" type="badge" size={150} />
                        </TouchableOpacity>
                }
                <View style={styles.userInfo}>
                    <View>
                        <Icon color="#f44336" name="diamond" type="font-awesome" size={20} />
                        <Text style={{ fontSize: 16, paddingTop: 3 }}>{this.state.points} gems</Text>
                    </View>
                    <View>
                        <Icon color="#009688" name="university" type="font-awesome" size={20} top={13}/>
                        <Text style={{ fontSize: 16, top: 15, paddingTop: 3 }}>{this.state.numLandmarksVisited} landmarks visited</Text>
                    </View>
                    <View>
                        <Icon color="#9c27b0" name="flag-checkered" type="font-awesome" size={20} top={25}/>
                        <Text style={{ fontSize: 16, top: 25, paddingTop: 3 }}>Recent landmark: {this.state.recentLandmark}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: '70%',
        width: '100%'
    },
    userInfo: {
        top: -123,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePictureContainer: {
        top: -110,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '40%',
    },
    pictureContainer: {
        width: '40%'
    },
    profilePicture: {
        width: '100%',
        height: '100%'
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

export default UserProfile;