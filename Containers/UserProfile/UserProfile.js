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
                <ImageBackground source={require('../../assets/brandenburggate.jpg')} style={styles.imageBackground}>
                    <View style={styles.overlay} />
                    <Text style={styles.bannerText}>WELCOME, {this.state.username.toUpperCase()}!</Text>
                    <Icon style={styles.bannerIcon} color="white" name="id-card" type="font-awesome" size={40} />
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
                    <View style={styles.achievements}>
                        <Icon color="#f44336" name="diamond" type="font-awesome" size={20} />
                        <Text style={styles.userInfoText}>{this.state.points} gems</Text>
                    </View>
                    <View style={styles.achievements}>
                        <Icon color="#009688" name="university" type="font-awesome" size={20} />
                        <Text style={styles.userInfoText}>{this.state.numLandmarksVisited} landmarks visited</Text>
                    </View>
                    <View style={styles.achievements}>
                        <Icon color="#9c27b0" name="flag-checkered" type="font-awesome" size={20} />
                        <Text style={styles.userInfoText}>Recent landmark: {this.state.recentLandmark}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.4,
    },
    achievements: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: '6%',
        marginRight: '6%'
    },
    userInfo: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    userInfoText: {
        fontSize: 20,
        padding: 10,
    },
    profilePictureContainer: {
        flex: .8,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    pictureContainer: {
        width: '65%',
    },
    profilePicture: {
        marginTop: 10,
        width: '100%',
        height: '90%'
    },
    bannerText: {
        color: 'white',
        paddingTop: '20%',
        paddingBottom: '3%',
        fontSize: 18,
        fontWeight: '600',
    }
});

export default UserProfile;