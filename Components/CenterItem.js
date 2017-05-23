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
  TouchableOpacity,
  Image
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
export default class CenterItem extends Component {
  static defaultProps = {
    icon: null,
    txt:'',
    popToCenter:null
  }
  render() {
    return (
      <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.todoTouch()}   style={styles.container}>
        <View style={{flexDirection:'row',
                      justifyContent : 'flex-start',
                      alignItems:'center'}}>
            <Image source={this.props.icon} style={{width:20,height:20,borderRadius:10}}/>
            <Text style={{fontSize:15,marginLeft:10}}>{this.props.txt}</Text>
        </View>
        <Icon name="angle-right" size={18}/>
      </TouchableOpacity>
    );
  }
  todoTouch () {
    if(this.props.popToCenter){
      this.props.popToCenter()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent : 'space-between',
    alignItems:'center',
    padding:13,
    borderTopColor:'#eeeeee',
    borderTopWidth:0.5
  },
});
