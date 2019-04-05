import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

export default class Landmark extends Component {
    constructor() {
        super()
        this.state = {
            collectedLandmarks: [
                {
                    id: 1,
                    name: 'Coors Field',
                    pointVal: 10,
                    visited: '4/1/2019'
                },
                {
                    id: 2,
                    name: 'Statue of Liberty',
                    pointVal: 10,
                    visited: '3/12/2019'
                },
                {
                    id: 3,
                    name: 'Grand Canyon',
                    pointVal: 10,
                    visited: '12/9/2018'
                }
            ]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.collectedLandmarks.map((landmark => {
                        return(
                            <View key={landmark.id} style={styles.landmarkContainer}>
                                <Text>Landmark name: {landmark.name}</Text>
                                <Text>Point value: {landmark.pointVal}</Text>
                                <Text>Date visited: {landmark.visited}</Text>
                            </View>
                        )
                    }))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        left: '5%',
        width: '92%',
        padding: 8,
    },
    landmarkContainer: {
        padding: 10,
        top: -60
    }
});
