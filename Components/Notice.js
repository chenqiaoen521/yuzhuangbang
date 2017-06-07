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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noticeCreators from '../actions/notice';
class Notice extends Component {
  static defaultProps = {
    iconText: '公告',
    title:'',
    browserCount:1100,
    time:'2017-05-02',
    bgcolor:'#1b1b1b',
    titleColor:'#ffffff',
    rightBar:'#ffffff'
  }
  render() {
    return (
      <View style={[styles.container,{backgroundColor:this.props.bgcolor}]}>
          <View style={styles.bounce}>
            <Text style={[styles.titleStyle,{fontSize:9},{backgroundColor:'#ff3d2c'},{paddingLeft:2},{paddingRight:2}]}>{this.props.iconText}</Text>
            <Text style={[styles.titleStyle,{color:this.props.titleColor},{fontSize:12},{marginLeft:10}]}>{this.props.notice.list}</Text>
          </View>
          <View style={styles.bounce}>
            <Text style={{color:'#ae8300'}}>&bull;</Text>
            <Text style={[styles.subFontStyle,{marginLeft:8}]}>{this.props.browserCount}人浏览</Text>
            <Text style={[styles.subFontStyle,{marginLeft:20}]}>时间:{this.props.time}</Text>
          </View>
          <Icon name="ios-arrow-dropright-outline" size={25} style={{color:this.props.rightBar,position:'absolute',right:4,bottom:15}}/>
      </View>
    );
  }
  componentDidMount() {
    const { noticeActions } = this.props;
    noticeActions.requestTypeList();
  }
}

const styles = StyleSheet.create({
  container: {
    width:width,
    padding:8,
    alignItems:'center',
  },
  bounce:{
    width:width-16,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent :'flex-start',
  },
  subFontStyle:{
    fontSize:10,
    color:'#777777'
  },
  titleStyle:{
    color:'#fff'
  }
});

const mapStateToProps = (state) => {
  const { notice } = state;
  return {
    notice
  };
};

const mapDispatchToProps = (dispatch) => {
  const noticeActions = bindActionCreators(noticeCreators, dispatch);
  return {
    noticeActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notice);

