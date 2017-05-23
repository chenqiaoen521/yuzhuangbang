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
export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Icon style={styles.iconStyle} name="ios-search-outline" size={25}  />
          <TextInput underlineColorAndroid="transparent"  placeholderTextColor="#7c7c7c" placeholder={"输入你想搜索的内容"} style={styles.inputStyle}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent :'center',
    backgroundColor:'#4c4c4c',
    borderRadius:25,
    width:width*0.93,
    height:34,
    alignItems:'center',
  },
  inputStyle:{
    width:width*0.8,
    height:32,
    fontSize:12,
  },
  iconStyle:{
    marginLeft:10
  }
});

