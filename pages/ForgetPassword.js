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
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
var {width,height} = Dimensions.get('window');
//图标插件
import Icon from 'react-native-vector-icons/Wz';
import Ionicons from 'react-native-vector-icons/FontAwesome';
//存储登录信息
import store from 'react-native-simple-store';
//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'

export default class Center extends Component {
    static navigationOptions = {
        headerTitle:'找回密码',
        headerRight: (<View></View>),
    }
    // 构造
    constructor(props) {
        super(props);
        var that = this;
        // 初始状态
        that.state = {
            userphone:'',
            useryan:'',
            usermi:'',
            usermit:'',
        };
        
    }
    render() {
        return (
          <View style={styles.container}>
                <Image style={{ width:width, height:height,}} resizeMode="stretch" source={require('./../imgs/indexforget.jpg')}>
                <View style={{paddingTop:30,paddingBottom:10,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{ width:100, height:110,}} source={require('./../imgs/yu.png')}></Image>
                </View>
                <View style={styles.fillFill}>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon012.png')}></Image></View>
                        <TextInput style={styles.shuruFill} onChangeText={(text) => this.setState({userphone:text})} placeholder='请填写您的手机号' placeholderTextColor="#888" keyboardType={'numeric'} maxLength={11}  underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon014.png')}></Image></View>

                        <TextInput style={[styles.shuruFill,styles.small]} onChangeText={(text) => this.setState({useryan:text})}  placeholderTextColor="#888" placeholder='请输入验证码' keyboardType="number-pad" underlineColorAndroid="transparent"/>

                        <TouchableOpacity onPress={()=>this.GoSendNum()}>
                            {/*验证码按钮*/}
                            <View style={styles.yanzheng}>
                                <Text style={styles.ytext}>获取验证码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon013.png')}></Image></View>
                        <TextInput style={styles.shuruFill} onChangeText={ (text) => this.setState({usermi:text})} placeholderTextColor="#888" placeholder='请设置新密码(字母和数字的组合)' secureTextEntry={true} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon013.png')}></Image></View>
                        <TextInput style={styles.shuruFill} onChangeText={ (text) => this.setState({usermit:text})} placeholderTextColor="#888" placeholder='请确认新密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                    </View>

                    <View style={{paddingTop:30,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>this.submit()}>
                            {/*登录按钮*/}
                            <View style={styles.fillbtn}>
                                <Text style={styles.filltext}>提交修改</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </Image>
          </View>
        );
    }

    //注册-发送验证码
    GoSendNum() {
        var that = this;
        let datanum = this.DoSendnum();
        datanum.then(
            (result)=>{
                console.log(result)
            }
        )    
    }
    async DoSendnum() {
        var that = this
        //console.log('type:'+that.state.type)
        if(that.state.userphone===''){
            ToastUtil.showShort('请先输入手机号')
        }else{
            try {
                let response = await fetch(`${url}/App/User/send_code?phone=${that.state.userphone}&type=2`,{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                let responseJson = await response.json();
                if(responseJson.errorCode===0){
                    ToastUtil.showShort('验证码发送成功')
                    return responseJson;
                }else{
                    console.log(responseJson)
                    ToastUtil.showShort(responseJson.errorMsg)
                }
            } catch(error) {
                console.error(error);
                ToastUtil.showShort(error)
            }
        }
    }

    //提交修改
    submit() {
        var that = this;
        let data = that.DoReset();
        data.then(
            ()=>{ }
        )  
    }

    async DoReset() {
        var that = this;
        if(that.state.userphone===''){
            ToastUtil.showShort('手机号不能为空')
        }else if(that.state.useryan===''){
            ToastUtil.showShort('验证码不能为空')
        }else if(that.state.usermi===''){
            ToastUtil.showShort('密码不能为空')
        }else if(that.state.usermit===''){
            ToastUtil.showShort('确认密码不能为空')
        }else{
            try {
                let response = await fetch(`${url}/App/User/update_password`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:'phone='+that.state.userphone+'&password_one='+that.state.usermi+'&password_two='+that.state.usermit+'&code='+that.state.useryan
                });
                let responseJson = await response.json();
                //return responseJson.data;
                if(responseJson.errorCode === 0){
                    ToastUtil.showShort("修改密码成功")
                    const {navigate} = this.props.navigation;
                    navigate('Main')
                    return responseJson     
                }else{
                    ToastUtil.showShort(responseJson.errorMsg)
                }    
            }catch(error) {
                console.error(error);
                ToastUtil.showShort(error)
            }
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    img: {
        width:0.06*(width-30),
        height:0.06*(width-30),
    },
    popmsgFill: {
        height:0.6*height,
        backgroundColor:'white',
        borderRadius:10,
    },
    sgFill: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:3,
        paddingBottom:3,
        borderBottomWidth:1,
        borderBottomColor:'#454545',     
        width:width-30,
    },
    fillbtn: {
        width: width-30,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:0,
        paddingBottom:0,
        backgroundColor:'#ae8300',
        borderRadius:20,
    },
    //登录Text文本样式
    filltext: {
        fontSize: 15,
        color: '#fff',
    },   
    nonebaFill: {
        borderBottomWidth:0,
        paddingTop:8,
        paddingBottom:0,
    },
    fillFill: {
        alignItems:'center',
        paddingTop:5,
    },
    shuruFill: {
        width:0.9*(width-30),
        height:38,
        color:'#999',
        fontSize:12,
        //marginTop: Platform.OS === 'ios' ? 4: 8,
    },
    small: {
        width:0.7*(width-30),
    },
    yanzheng: {
        width:0.2*(width-30),
        backgroundColor:'rgba(255, 255, 255, 0.4)',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        height:26
    },
    ytext: {
        color:'#fff',
        fontSize:10,
    }
    
});
