import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export class Landmark extends Component {
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
                        return (
                            <View key={landmark.id} style={styles.landmarkContainer}>
                                <Image source={require('../../assets/statueofliberty.jpg')} style={{ width: 300, height: 200, bottom: 15 }}/>
                                <Text style={{ fontWeight: 'bold' }}>{landmark.name.toUpperCase()} ({landmark.visited})</Text>
                                <View style={{ display: 'flex' }}>
                                    <Icon color="#f44336" name="diamond" type="font-awesome" size={20} left={-140} top={3}/>
                                    <Text style={{ top: -15, left: 30}}>{landmark.pointVal} gems</Text>
                                </View>
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
        flex: 1
    },
    landmarkContainer: {
        padding: 10,
        top: -200,
    }
});

export default Landmark;
