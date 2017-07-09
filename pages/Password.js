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

//存储登录信息
import store from 'react-native-simple-store';
//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'

export default class PasswordPage extends Component {
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
            phone:''
        };
        
    }
    static navigationOptions = {
        headerTitle:'修改密码',
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
                    {/*<TextInput  style={styles.inputStyle} onChangeText={(text) => this.setState({userphone:text})} 
                        placeholderTextColor="#666666" underlineColorAndroid="transparent" placeholder="请输入手机号" />*/}
                        <Text style={[styles.inputStyle,{paddingTop:13},{paddingBottom:13}]} >{this.state.phone}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.txt}>验证码</Text>
                    <TextInput style={[styles.inputStyle,{width:(width-20)*0.5},{marginRight:(width-30)*0.03}]}
                        underlineColorAndroid="transparent" onChangeText={(text) => this.setState({useryan:text})} 
                        placeholder="请输入验证码" placeholderTextColor="#666666" />
                    <TouchableOpacity onPress={()=>this.GoSendNum()}>
                        {/*验证码按钮*/}
                        <View style={[styles.yanzheng,{width:(width-20)*0.24}]}>
                            <Text style={styles.ytext}>获取验证码</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.tipContain}>
                    <Text style={styles.tipStyle}>设置新密码</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.txt}>新密码</Text>
                    <TextInput style={styles.inputStyle} onChangeText={ (text) => this.setState({usermi:text})} 
                        underlineColorAndroid="transparent" placeholder="请输入验证码"
                        placeholderTextColor="#666666" secureTextEntry={true} />
                </View>
                <View style={styles.group}>
                    <Text style={styles.txt}>确认密码</Text>
                    <TextInput style={styles.inputStyle} underlineColorAndroid="transparent"
                      onChangeText={ (text) => this.setState({usermit:text})} placeholder="请输入验证码"
                      placeholderTextColor="#666666" secureTextEntry={true} />
                </View>
                <TouchableOpacity style={styles.tj} onPress={()=>this.submit()}>
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
                    token:data.token
                });  
                that.__init(data.token)     
                that.Getnum(data.token)        
        })
    }
    __init (token) {
        let data = this.getData(token);
        data.then((result)=>{
            this.setState({
                phone:result.user_info.phone,
            })
            console.log(this.state.type)
        })
    }
    async getData(token) {
        try {   
            let response = await fetch(`${url}/App/Center/get_user_info?token=${token}`);
            let responseJson = await response.json();
            console.log(responseJson.data)
            if(responseJson.errorCode==0){
                return responseJson.data;
            }else{
                console.log(responseJson)
                ToastUtil.showShort(responseJson.errorMsg)
            }
        } catch(error) {
            console.error(error);
        }
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
        /*if(that.state.userphone===''){
            ToastUtil.showShort('请先输入手机号')
        }else{*/
            try {
                let response = await fetch(`${url}/App/User/send_code?phone=${that.state.phone}&type=2`,{
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
        /*}*/
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
                    ToastUtil.showShort("修改密码成功,请重新登录")
                    store.save('user', { token: null, type:null })
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
    container:{
        flex:1,
        backgroundColor:'#151515',
    },
    inputStyle:{
        width:(width-20)*0.77,
        color:'#666666',
        textAlign:'left',
        paddingLeft:0
    },
    tipContain:{
        height:36,
        justifyContent:'center',
        paddingLeft:8
    },
    txt:{
        color:'#999999',
        fontSize:14,
        width:(width-20)*0.23
    },
    group:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingRight:10,
        alignItems:'center',
        backgroundColor:'#282828',
        borderBottomWidth:1,
        borderBottomColor:'#151515',
        paddingLeft:10
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
