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
import ToastUtil from '../utils/ToastUtil';
import {request} from '../utils/asyncRequest';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
export default class AccountAdd extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      token:'',
      phone:'',
      code:'',
      user_name:'',
      dt_id:''
    };
  }
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
  componentWillMount () {
    let that = this;
    const {state} = this.props.navigation;
    let dt_id = state.params.id;
    store.get('user').then(
      function(data){
        that.setState({
            token:data.token,
            dt_id:dt_id
        });        
    })
  }
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
          <View style={styles.unit}>
            <Text style={styles.txt}>姓名</Text>

            <TextInput
             onChangeText={(text) => this.setState({user_name:text}) }
             underlineColorAndroid="transparent" 
             placeholderTextColor ='#888888'  
             placeholder={'请输入姓名'} 
             defaultValue={this.state.user_name} 
             style={{color:'#888888',fontSize:13,marginRight:20,padding:0,width:100,textAlign:'right'}}/>

          </View>
          {this.renderPhone.bind(this)()}
          {this.renderBottom.bind(this)()}
          {this.renderBtn.bind(this)()}  
        </View>                                               
    );
  }
  getCode () {
    let phone = this.state.phone;
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
        ToastUtil.showShort('手机号格式错误', false);
        return; 
    }else{
      this.sendCode(1,phone).then((data)=>{
        if(data=='success'){
          ToastUtil.showShort('手机号发送成功', false);
        }else{
          ToastUtil.showShort(data, false);
        }
      })
    }
  }
  async sendCode(type,phone) {
      try {   
        let response = await fetch(`${host}/App/User/send_code?type=${type}&phone=${phone}`);
        let responseJson = await response.json();
        return responseJson.errorMsg;
      } catch(error) {
          console.error(error);
      }
  }
  renderPhone () {
     const {state} = this.props.navigation;
     let flag = state.params.isAdd;
     if(flag){
      return (
        <View style={styles.phone}>
            <View style={{flexDirection:'row',alignItems : 'center'}}>
              <Text style={styles.txt}>手机号</Text>

              <TextInput onChangeText={(text) => this.setState({phone:text}) }  underlineColorAndroid="transparent" placeholderTextColor ='#888888'  placeholder={'请输入手机号'} style={{color:'#888888',fontSize:13,  marginRight:20,padding:0,width:100,textAlign:'right'}}/>

            </View>
            <View style={{flexDirection:'row',alignItems : 'center'}}>
              <TouchableOpacity onPress={()=>this.getCode()}>
                <Text style={{fontSize:12,color:'#cccccc',backgroundColor:'#454545',paddingTop:6,paddingBottom:6,paddingLeft:10,paddingRight:10,borderRadius:6}}>获取验证码</Text>
              </TouchableOpacity>
            </View>
        </View>
        )
     }else{
        return (
          <View style={styles.unit}>
            <Text style={styles.txt}>手机号</Text>

            <TextInput underlineColorAndroid="transparent" 
             placeholderTextColor ='#888888'  
             placeholder={'请输入手机号'} 
             defaultValue={this.state.phone} 
             onChangeText={(text) => this.setState({phone:text}) }
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

            <TextInput 
            onChangeText={(text) => this.setState({code:text}) }  
            underlineColorAndroid="transparent" 
            placeholderTextColor ='#888888'  
            placeholder={'请输入验证码'} 
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
  add () {
    const {goBack} = this.props.navigation;
    let a = this.state.phone;
    let b = this.state.code;
    let c = this.state.user_name;
    if(!a) {ToastUtil.showShort('电话不能为空', false);return;}
    if(!b) {ToastUtil.showShort('验证码不能为空', false);return;}
    if(!c) {ToastUtil.showShort('姓名不能为空', false);return;}
    let formData = new FormData();    
    formData.append("phone",a);
    formData.append("code",b);
    formData.append("user_name",c);
    formData.append("dt_id",this.state.dt_id);
    formData.append("token",this.state.token);
    request(`${host}/App/Department/add_seller_child`,'POST',formData).then(function(data){
      if(data.errorMsg=='success'){
        ToastUtil.showShort('添加成功', false);
        goBack(null);
      }else{
        ToastUtil.showShort(data.errorMsg, false);
      }
    });
  }

  renderBtn () {
    const {state} = this.props.navigation;
     let flag = state.params.isAdd;
     if(flag){
      return (
        <TouchableOpacity style={styles.add} onPress={()=>this.add()}>
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
