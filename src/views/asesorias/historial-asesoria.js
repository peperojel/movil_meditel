import React, { Component } from 'react';
// import {Text } from 'react-native-elements'
import {  View, StyleSheet} from 'react-native';

export default class HistorialAsesoriasScreen extends Component {
    state = {
        search: '',
    };
    render() {
        const { search } = this.state;

        return (
            <View style={styles.container}>
                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 40
    },
    title:{
        color:'#66696B', 
        fontWeight: 'bold', 
        fontSize: 22, 
        padding: 14
      },
  });