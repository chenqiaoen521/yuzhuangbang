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
  Switch
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit'
export default class Settings extends Component {
  static navigationOptions = {
    title:'设置管理',
    headerRight: (
      <Icon.Button
        name="bell-o"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Unit title="个人资料" popToSetting={()=>this.toInfo()}/>
        <Unit title="修改资料"/>
        <View style={{marginTop:10}}>
          <Unit title="帮助中心" popToSetting={()=>this.toHelp()}/>
          <Unit title="关于我们"/>
          <Unit title="意见反馈"/>
        </View>
        <View style={{marginTop:10}}>
          <Unit title="版本更新" rightTxt="V123AW.01"/>
          <Unit title="客服热线"  hotTel="0371-0062887"/>
        </View>
        <View style={{marginTop:10}}>
          <Unit title="接收消息通知" rightBtn="true"/>
        </View>
        <View style={{marginTop:10}}>
          <TouchableOpacity TouchableOpacity={0.5} >
            <View style={[styles.unitStyle,{justifyContent:'center'}]}>
              <Icon name="power-off" color="#ff4141" size={14} style={{marginRight:5}}/>
              <Text style={{color:'#ff4141',fontSize:14}}>退出登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    );
  }
  toInfo () {
    const {navigate} = this.props.navigation;
    navigate('personInfo');
  }
  toHelp () {
    //alert(1)
    const {navigate} = this.props.navigation;
    navigate('HelpCenter');
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f7f7f7'
  },
  unitStyle:{
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems :'center',
    justifyContent :'space-between',
    padding:10,
    paddingTop:12,
    paddingBottom:12,
    borderBottomColor:'#e5e5e5',
    borderBottomWidth:0.5
  }
});
