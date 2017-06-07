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
import Icon from 'react-native-vector-icons/Wz';
import Ionicons from 'react-native-vector-icons/FontAwesome';

export default class Center extends Component {
    static navigationOptions = {
        title:'忘记密码',
        tintColor:'red'
    }
    render() {
        return (
          <View style={styles.container}>
                <Image style={{ width:width, height:height,}} resizeMode="stretch" source={require('./../imgs/indexforget.jpg')}>
                <View style={{paddingTop:50,paddingBottom:30,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{ width:202, height:53,}} source={require('./../imgs/loginpng_03.png')}></Image>
                </View>
                <View style={styles.fillFill}>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/loginpng_10.png')}></Image></View>
                        <TextInput style={styles.shuruFill} placeholder='请填写您的手机号' keyboardType={'numeric'} maxLength={11}  underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/loginpng_10.png')}></Image></View>
                        <TextInput style={[styles.shuruFill,styles.small]} placeholder='请输入验证码' underlineColorAndroid="transparent"/>
                        <TouchableOpacity>
                            {/*验证码按钮*/}
                            <View style={styles.yanzheng}>
                                <Text style={styles.ytext}>获取验证码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/loginpng_10.png')}></Image></View>
                        <TextInput style={styles.shuruFill} placeholder='请设置新密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.sgFill}>
                        <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/loginpng_10.png')}></Image></View>
                        <TextInput style={styles.shuruFill} placeholder='请再次输入新密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                    </View>

                   
                    <View style={{paddingTop:30,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity>
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
        height: 40,
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
        height:30,
        color:'#999',
        fontSize:12,
        marginTop: Platform.OS === 'ios' ? 4: 8,
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
