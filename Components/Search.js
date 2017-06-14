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
  Dimensions,
  TouchableOpacity
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
export default class Search extends Component {
  static defaultProps = {
    popToHome: null
  }
  render() {
    return (
      <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.toSearch()}>
        <View style={styles.container}>
            <Icon style={styles.iconStyle} name="ios-search-outline" size={23} color='#888'  />
            <Text style={styles.inputStyle}>
              输入你想搜索的内容
            </Text>
        </View>
      </TouchableOpacity>
    );
  }
  toSearch () {
    if(this.props.popToHome){
      this.props.popToHome()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent :'center',
    backgroundColor:'#4c4c4c',
    borderRadius:25,
    width:width*0.82,
    height:34,
    alignItems:'center',
  },
  inputStyle:{
    width:width*0.66,
    fontSize:12,
    color:'#7c7c7c',
    marginLeft:10,
  },
  iconStyle:{
    marginLeft:5
  }
});

