/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  Switch,
  popToCSex
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Unit extends Component {
  static defaultProps = {
    title: '',
    rightTxt:'',
    hotTel:'',
    rightBtn:false,
    popToSetting:null,
    bgColor:'#fff',
    txtCol:'#333333',
    icon:null,
    topColor:'#e5e5e5',
  }
  render () {
    return (
      <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.todoEvent()}>
      <View style={[styles.unitStyle,{backgroundColor:this.props.bgColor},{borderTopColor:this.props.topColor}]}>
        <Text style={{color:this.props.txtCol,fontSize:14}}>{this.props.title}</Text>
        {this.renderRight()}
      </View>
      </TouchableOpacity>  
      )
  }
  todoEvent() {
    if(this.props.popToSetting){
      this.props.popToSetting()
    }
  }
  renderRight () {
    if(this.props.rightTxt){
      return (
        <View style={styles.rightBarStyle}>
          <Text style={{color:'#cccccc',marginRight:20}}>{this.props.rightTxt}</Text>
          <Icon name="angle-right" size={25} color="#b6b6b6" />
        </View>
        )
    }
    if(this.props.rightSheet){
      return (
        <View style={styles.rightBarStyle}>
          <Text style={{color:'#cccccc',marginRight:20}}>{this.props.rightTxt}</Text>
          <Icon name="angle-right" size={25} color="#b6b6b6" />
        </View>
        )
    }
    if(this.props.rightInput){
      return (
        <View style={styles.rightBarStyle}>
          <TextInput underlineColorAndroid="transparent" style={{color:'#cccccc',marginRight:20,padding:0,width:100,textAlign:'right'}} defaultValue ={this.props.rightInput}/>
          <Icon name="angle-right" size={25} color="#b6b6b6" />
        </View>
        )
    }
    if(this.props.icon){
      return (
        <View style={styles.rightBarStyle}>
          <Text style={{color:'#cccccc',marginRight:20}}>{this.props.rightTxt}</Text>
          <Image style={{width:38,height:38,borderRadius:19}} source={this.props.icon}/>
        </View>
        )
    }
    if(this.props.hotTel){
      return (
        <View style={styles.rightBarStyle}>
          <Text style={{color:'#cccccc',marginRight:20}}>{this.props.hotTel}</Text>
        </View>
        )
    }
    if(this.props.rightBtn){
      return (
        <View style={styles.rightBarStyle}>
          <Switch value={true} thumbTintColor="#fff"  onTintColor="#ae8300"/>
        </View>
        )
    }else{
      return (
        <View style={styles.rightBarStyle}>
          <Icon name="angle-right" size={25}  color="#b6b6b6" />
        </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  rightBarStyle:{
    flexDirection:'row',
    alignItems:'center'
  },
  unitStyle:{
    flexDirection:'row',
    alignItems :'center',
    justifyContent :'space-between',
    paddingLeft:10,
    paddingRight:10,
    height:50,
    borderTopWidth:0.5
  }
});