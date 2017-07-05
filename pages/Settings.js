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
  Linking,
  Alert
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit'

//存储登录信息
import store from 'react-native-simple-store';

export default class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:'设置管理',
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
  });
  componentDidMount() {
    this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
  }
  onActionSelected () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="个人资料" popToSetting={()=>this.toInfo()}/>
        <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="修改密码" popToSetting={()=>this.toPassword()}/>
        <View style={{marginTop:6}}>
          <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="帮助中心" popToSetting={()=>this.toHelp()}/>
          <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="关于我们" popToSetting={()=>this.toAbout()}/>
          <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="意见反馈" popToSetting={()=>this.toFeedback()}/>
        </View>
        <View style={{marginTop:6}}>
          <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="版本更新" rightTxt="v1.01"/>
          <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="客服热线"  hotTel="0371-0062887" popToSetting={()=>this.tel()}/>
        </View>
        <View style={{marginTop:6}}>
          <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="接收消息通知" rightBtn="true"/>
        </View>
        <View style={{marginTop:6}}>
          <TouchableOpacity TouchableOpacity={0.5} onPress={ ()=> this.Goout() } >
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
  tel () {
    let url = 'tel:0371-0062887'
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      }else{
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  toAbout () {
    const {navigate} = this.props.navigation;
    navigate('About');
  }
  toPassword () {
    const {navigate} = this.props.navigation;
    navigate('password');
  }
  toInfo () {
    const {navigate} = this.props.navigation;
    navigate('personInfo');
  }
  toFeedback () {
    const {navigate} = this.props.navigation;
    navigate('Feedback');
  }
  toHelp () {
    //alert(1)
    const {navigate} = this.props.navigation;
    navigate('HelpCenter');
  }
  Goout() {
    var that = this
      Alert.alert(
      '退出登录',
      '确认要退出当前账号吗',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确定', onPress: () => that.Doout() },
      ],
      { cancelable: false }
    )
   
  }
  Doout() {
    store
      .save('user', {
          token: null,
          type:null
      })
      const {navigate} = this.props.navigation;
      navigate('Main');
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515'
  },
  unitStyle:{
    backgroundColor:'#282828',
    flexDirection:'row',
    alignItems :'center',
    justifyContent :'space-between',
    padding:10,
    paddingTop:18,
    paddingBottom:18,
    borderBottomColor:'#151515',
    borderBottomWidth:0.5,
    marginBottom:100
  }
});
