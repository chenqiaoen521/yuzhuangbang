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
  Modal,
  Platform
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class PasswordPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };

  }
  static navigationOptions = {
    title:'修改密码',
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
        <View style={styles.tipContain}>
          <Text style={styles.tipStyle}>通过你绑定的手机号更改密码</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.txt}>手机号</Text>
          <TextInput 
            style={styles.inputStyle}  
            underlineColorAndroid="transparent"
            defaultValue="158****3201"
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.txt}>验证码</Text>
          <TextInput 
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            placeholder="请输入验证码"
            placeholderTextColor="#666666"
          />
          <TouchableOpacity>
            {/*验证码按钮*/}
            <View style={styles.yanzheng}>
                <Text style={styles.ytext}>获取验证码</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tipContain}>
          <Text style={styles.tipStyle}>设置新密码</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.txt}>新密码</Text>
          <TextInput 
            style={styles.inputStyle}  
            underlineColorAndroid="transparent"
            placeholder="请输入验证码"
            placeholderTextColor="#666666"
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.txt}>再次输入</Text>
          <TextInput 
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            placeholder="请输入验证码"
            placeholderTextColor="#666666"
          />
        </View>
        <TouchableOpacity style={styles.tj}>
          <Text style={{color:'#fff',width:width,textAlign:'center'}}>提交</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  inputStyle:{
    width:150,
    color:'#666666'
  },
  tipContain:{
    height:36,
    justifyContent:'center',
    paddingLeft:8
  },
  txt:{
    color:'#999999',
    fontSize:14,
    marginRight :15
  },
  group:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#282828',
    borderBottomWidth:1,
    borderBottomColor:'#151515',
    height:50,
    paddingLeft:8
  },
  tipStyle:{
    color:'#666666',
    fontSize:13,
  },
  yanzheng: {
    width:66,
    backgroundColor:'rgba(255, 255, 255, 0.4)',
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    height:30
  },
  ytext: {
      color:'#fff',
      fontSize:10,
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
});
