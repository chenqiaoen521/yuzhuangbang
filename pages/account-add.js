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
  Alert,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AccountAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:navigation.state.params.title,
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
  componentDidMount () {

  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.unit}>
            <Text style={styles.txt}>姓名</Text>
            <TextInput  underlineColorAndroid="transparent" placeholder='请输入姓名' placeholderTextColor={'#888'} 
            style={{color:'#888888',fontSize:13,marginRight:20,padding:0,width:100,textAlign:'right'}}/>
          </View>
          {this.renderPhone.bind(this)()}
          {this.renderBottom.bind(this)()}
          {this.renderBtn.bind(this)()}  
        </View>                                               
    );
  }
  renderPhone () {
     const {state} = this.props.navigation;
     let flag = state.params.isAdd;
     if(flag){
      return (
        <View style={styles.phone}>
            <View style={{flexDirection:'row',alignItems : 'center'}}>
              <Text style={styles.txt}>手机号</Text>
              <TextInput  underlineColorAndroid="transparent" placeholder='请输入手机号' placeholderTextColor={'#888'}  
                  style={{color:'#888888',fontSize:13, marginLeft:20,padding:0,width:100,textAlign:'left'}}/>
            </View>
            <View style={{flexDirection:'row',alignItems : 'center'}}>
              <TouchableOpacity>
                <Text style={{fontSize:12,color:'#cccccc',backgroundColor:'#454545',paddingTop:6,paddingBottom:6,paddingLeft:10,paddingRight:10,borderRadius:6}}>获取验证码</Text>
              </TouchableOpacity>
            </View>
        </View>
        )
     }else{
        return (
          <View style={styles.unit}>
            <Text style={styles.txt}>手机号</Text>
            <TextInput  underlineColorAndroid="transparent" placeholder='请输入手机号' placeholderTextColor={'#888'}  
                style={{color:'#888888',fontSize:13,marginRight:20,padding:0,width:100,textAlign:'right'}}/>
          </View>
        )
     }
  }
  renderBottom() {
    const {state} = this.props.navigation;
     let flag = state.params.isAdd;
     if(flag){
      return (
        <View style={styles.unit}>
            <Text style={styles.txt}>验证码</Text>
            <TextInput  underlineColorAndroid="transparent" placeholder='请输入验证码' placeholderTextColor={'#888'}  
                style={{color:'#888888',fontSize:13,marginRight:20,padding:0,width:100,textAlign:'right'}}/>
          </View>
        )
     }else{
        return (
          <View style={styles.unit}>
            <Text style={styles.txt}>状态</Text>
            <Text style={{color:'#888888',marginLeft:35}}>已激活</Text>
          </View>
        )
     }
  }
  renderBtn () {
    const {state} = this.props.navigation;
     let flag = state.params.isAdd;
     if(flag){
      return (
        <TouchableOpacity style={styles.add}>
          <Text style={{color:'#fff'}}>
            提交添加
          </Text>
        </TouchableOpacity>
        )
     }else{
      return (
        <TouchableOpacity style={styles.add}>
          <Text style={{color:'#fff'}}>
            提交修改
          </Text>
        </TouchableOpacity>
        )
     }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  unit:{
    backgroundColor:'#1b1b1b',
    flexDirection:'row',
    alignItems:'center',
    height:50,
    marginTop:1,
    paddingLeft:10
  },
  phone:{
    backgroundColor:'#1b1b1b',
    flexDirection:'row',
    alignItems:'center',
    justifyContent : 'space-between',
    height:50,
    marginTop:1,
    paddingLeft:10,
    paddingRight:10
  },
  txt:{
    color:'#999999'
  },
  add:{
    backgroundColor:'#ae8300',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:0,
    width:width
  },
});
