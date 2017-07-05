/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ToastUtil from '../utils/ToastUtil';
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
  Modal
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import store from 'react-native-simple-store';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
const host = require('../config.json').url;
export default class Feedback extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      content:'',
      token:''
    };

  }
  static navigationOptions = {
    headerTitle:'意见反馈',
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
          <TextInput
            placeholderTextColor="#515151"
            placeholder="请输入您的反馈内容"
            onChangeText={(text) => this.setState({content:text}) }
            multiline={true}
            style={styles.inputStyle}
             numberOfLines = {10}
            underlineColorAndroid="transparent"
        />

        <Text style={styles.textStyle}>请详细描述您遇到的问题，有助于我们快速定位并解决问题</Text>
        <TouchableOpacity onPress={()=>{this.submit()}} style={styles.tj}>
          <Text style={{color:'#fff',width:width,textAlign:'center'}}>提交</Text>
        </TouchableOpacity>
      </View>
    );
  }
  componentWillMount () {
    let that = this;
    store.get('user').then(
      function(data){
          that.setState({
              token:data.token,
          });           
    })
  }
  submit () {
    let content = this.state.content;
    this.postData(content).then((data)=>{
      if(data.errorMsg=='success'){
        ToastUtil.showShort('您的意见已经提交成功', false);return;
        this.props.navigation.goBack(null);
      }else{
        ToastUtil.showShort('提交失败请稍后再试', false);return;
      }
    })
  }
  async postData(content) {
    let token = this.state.token;
    let formData = new FormData();
    formData.append('token',token);
    formData.append('content',content);
    let url = `${host}/App/Role/suggest`;
    try {   
        let response = await fetch(url,{
          method:'POST',
          body:formData
        });
        let responseJson = await response.json();
        return responseJson;
      } catch(error) {
          console.error(error);
      }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  tj:{
    justifyContent : 'center',
    alignContent : 'center',
    height:45,
    width:width,
    position:'absolute',
    bottom:0,
    backgroundColor:'rgba(174,131,0,0.9)'
  },
  inputStyle:{
    height:200,
    width:width,
    backgroundColor:'#1b1b1b',
    color:'#515151',
    fontSize: 15,
    padding: 4,
    marginBottom: 10,
    textAlignVertical: "top"
  },
  textStyle:{
    color:'#6b6b6b',
    padding:10,
    lineHeight:20
  }
});
