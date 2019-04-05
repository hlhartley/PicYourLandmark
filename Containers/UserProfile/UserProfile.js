import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
                    <Text style={{ fontSize: 19 }}>Username: {this.state.username}</Text>
                    <Text style={{ fontSize: 19 }}>Total points: {this.state.points}</Text>
                    <Text style={{ fontSize: 19 }}># Landmarks visited: {this.state.numLandmarksVisited}</Text>
                    <Text style={{ fontSize: 19 }}>Most recent landmark visited: {this.state.recentLandmark}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        left: '5%',
        height: '70%',
        width: '92%',
        padding: 8,
        top: 20
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '40%'
    },
    profilePictureContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '40%',
        backgroundColor: '#e9e9e9'
    },
    pictureContainer: {
        width: '40%'
    },
    profilePicture: {
        width: '100%',
        height: '100%'
    }
});

export default UserProfile;