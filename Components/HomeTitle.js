/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
export default class HomeTitle extends Component {
  static defaultProps = {
    name: '找灵感'
  }
  render() {
    return (
      <View style={styles.container}>
         <View style={{width:3,height:15,backgroundColor:'#ae8300',marginLeft:5}}></View>
         <Text style={{color:'#fff'}}>{this.props.name}</Text>
         <View style={{width:width*0.77,height:1,backgroundColor:'#242424'}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent : 'space-around',
    alignItems:'center',
    height:40
  },
});

