import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

export default class UserProfile extends Component {
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
        return (
            <View style={styles.container}>
                <Icon color="#3c4859" name="portrait" type="badge" size={150} />
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        left: '5%',
        height: '70%',
        width: '92%',
        padding: 8,
        top: 20
    },
    userInfo : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '40%'
    }
});
