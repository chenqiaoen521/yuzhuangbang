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

import Icon from 'react-native-vector-icons/FontAwesome';
//存储登录信息
import store from 'react-native-simple-store';
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
const host = require('../config.json').url;
//const token = require('../config.json').token;

export default class CreatShopWait extends Component {
    static navigationOptions = {
        title:'我要开店',
        headerRight: (
            <Icon.Button
                name="bell-o"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={ () => {  navigation.state.params.handleShare(); } }
            />
        )
    }
    constructor(props) {
        super(props);
      
        this.state = {
            roletype:null,
            shenhe:-1,
            text:''
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width:width, height:height,}} resizeMode="stretch" source={require('./../imgs/shenfen_02.jpg')}>
                    {this.state.roletype==2 ?  
                    <TouchableOpacity>
                    <View style={styles.circle}>
                        <Image style={styles.bgtu}  source={require('./../imgs/openbg_06.png')}>
                            <Image style={styles.bgtu}  source={require('./../imgs/opentbg_06.png')}>
                                <View style={styles.center}>
                                    <Text style={styles.text}>我是</Text>
                                    <Text style={styles.text}>设计团队</Text>
                                </View>
                            </Image>
                        </Image>
                    </View>
                    </TouchableOpacity>
                    :  
                    <TouchableOpacity>
                    <View style={styles.circle}>
                        <Image style={styles.bgtu}  source={require('./../imgs/openbg_03.png')}>
                            <Image style={styles.bgtu}  source={require('./../imgs/opentbg_03.png')}>
                                <View style={styles.center}>
                                    <Text style={styles.text}>我是</Text>
                                    <Text style={[styles.text]}>{this.props.navigation.state.params.idcard}</Text>
                                </View>
                            </Image>
                        </Image>
                    </View>
                    </TouchableOpacity>
                    }

                    { this.state.shenhe==2 ? 
                    <View style={{padding:15,alignItems:'center',tejustifyContent:'center'}}>
                        <Text style={{fontSize:15, color:'#fff', textAlign:'center',lineHeight:30}}>您提交的{this.props.navigation.state.params.idcard}信息正在审核中…{'\n'}请您耐心等待</Text>
                    </View>
                    : null }

                    { this.state.shenhe==3 ? 
                    
                      <View>
                      <View style={{padding:15,alignItems:'center',tejustifyContent:'center', marginBottom:10}}>
                          <Text style={{fontSize:15, color:'#fff', textAlign:'center',lineHeight:30}}>很遗憾！{'\n'}您提交的开店申请已被拒绝</Text>
                      </View>
                      <TouchableOpacity onPress={ () => this.Goagain() }>
                      <View style={{alignItems:'center', padding:8, marginLeft: width*0.2, borderRadius:25, width:width*0.6,tejustifyContent:'center',backgroundColor:'#ae8300'}}>
                          <Text style={{fontSize:15, color:'#fff', textAlign:'center'}}>重新申请</Text>
                      </View>
                      </TouchableOpacity>
                      </View>
                    : null  }

                    { this.state.shenhe==-1 ? 
                      <View>
                      <View style={{padding:15,alignItems:'center',tejustifyContent:'center', marginBottom:10}}>
                          <Text style={{fontSize:15, color:'#fff', textAlign:'center',lineHeight:30}}>恭喜！您提交的开店申请已通过</Text>
                      </View>
                      <TouchableOpacity onPress={ () => this.Gonew() }>
                      <View style={{alignItems:'center', padding:8, marginLeft: width*0.2, borderRadius:25, width:width*0.6,tejustifyContent:'center',backgroundColor:'#ae8300'}}>
                          <Text style={{fontSize:15, color:'#fff', textAlign:'center'}}>{this.state.text}</Text>
                      </View>
                      </TouchableOpacity>
                      </View>
                    :  null   }

                </Image>
            </View>
        );
    }


    //重新申请
    Goagain() {
        const {navigate} = this.props.navigation;
        navigate('CreatShop')
    }

    //去新的个人中心
    Gonew() {
        const {navigate} = this.props.navigation;
        navigate('Center')  
    }

    componentWillMount () {
        var that = this
        that.Goget()
    }

    Goget() {
        console.log(1)
        var that = this
        store.get('user')
        .then(
            function(data){
                that.getData(data.token);
            })  
    }
    async getData(token) {
        console.log(3)
        try {   
            let response = await fetch(`${host}/App/Center/get_user_info?token=${token}`);
            let responseJson = await response.json();
            if(responseJson.errorCode==0){

                var result = responseJson.data;
                this.setState({
                    roletype: result.user_info.role_type,
                })
                console.log('审核信息:'+result.user_info.agree)
                if(result.user_info.agree){
                    this.setState({  shenhe:result.user_info.agree })
                }else{
                    store.save('user', { type:result.user_info.role_type } )    //更新身份
                }

                if(this.state.roletype==2){
                    this.setState({  text:'进入设计师个人中心' })
                }else if(this.state.roletype==3){
                    this.setState({  text:'进入商家个人中心'  })
                }

                return responseJson.data;

            }else{
                ToastUtil.showShort(responseJson.errorMsg,true)
            }
        } catch(error) {
            console.error(error);
        }
    }
    //跳转
    Gocreat(num) {
        const {goBack} = this.props.navigation;
        goBack(null);

    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    circle: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,

    },
    text: {
        fontSize:18,
        color:'#fff',
    },
    center: {
        alignItems:'center',
        justifyContent:'center',
        height:width*0.54
    },
    bgtu: {
        width:width*0.54,
        height:width*0.54
    }
    
});
