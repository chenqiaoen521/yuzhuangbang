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
  Image
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Wz from 'react-native-vector-icons/Wz';
export default class IconDetail extends Component {
  static defaultProps = {
    icons: [
      {
        icon:require('../imgs/indexpng_18.png'),
        name:'转载'
      },
      {
        icon:require('../imgs/indexpng_17.png'),
        name:'收藏'
      },
      {
        icon:require('../imgs/indexpng_15.png'),
        name:'举报'
      }
    ]
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderIcons()}
      </View>
    );
  }
  renderIcons () {
    let arr = [];
    this.props.icons.map((item,i)=>{
      arr.push(
        <View key={i} style={styles.itemStyle}>
          <Image style={{width:11,height:11,marginLeft:8,marginRight:8}} source={item.icon} />
          <Text style={styles.fontStyle}>{item.name}</Text>
          </View>
        )
    })
    return arr;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems :'center',
    backgroundColor:'#1b1b1b',
    borderBottomColor:'#2d2d2d',
    borderBottomWidth:0.5,
    height:40
  },
  fontStyle:{
    fontSize:10,
    color:'#999999',
  },
  itemStyle:{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center'
  }
  
});

