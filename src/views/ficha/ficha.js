import React, { Component } from 'react';
import { FlatList, StyleSheet, View ,Image, ImageBackground, TouchableHighlight} from 'react-native';
import {Text } from 'react-native-elements'

export default class FichaScreen extends Component {
    state = {
        search: '',
    };

    render() {
        const { search } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Ficha Médica 
                </Text>            
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 40,
  },
  title:{
    color:'#66696B', 
    fontWeight: 'bold', 
    fontSize: 22, 
    padding: 14
  }
});