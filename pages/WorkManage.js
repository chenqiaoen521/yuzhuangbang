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
  Button,
} from 'react-native';
import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WorkManageOne from '../Components/WorkManageOne'
import WorkManageTwo from '../Components/WorkManageTwo'
import WorkManageThree from '../Components/WorkManageThree'

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';

var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class WorkManage extends Component {
    static navigationOptions = {
        headerTitle:'作品管理',
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
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView initialPage={0} renderTabBar={() => <FacebookTabBar/>} onChangeTab={ (obj) => {console.log('index:'+obj.i)} } >
                    <ScrollView tabLabel="ios-paper" style={styles.tabView}>
                        <WorkManageOne popToWatch={ ()=> this.Gojump() } popToBJ={ ()=> this.Goadd() }  />
                    </ScrollView>
                    <ScrollView tabLabel="ios-people" style={styles.tabView}>
                        <WorkManageTwo popToWatch={ ()=> this.Gojump() } popToBJ={ ()=> this.Goadd() }   />
                    </ScrollView>
                    <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
                        <WorkManageThree popToWatch={ ()=> this.Gojump()} popToBJ={ ()=> this.Goadd() } />
                    </ScrollView>    
                </ScrollableTabView>

                <TouchableOpacity onPress={ ()=> this.Goadd() }>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:10, paddingBottom:10,backgroundColor:'#ae8300',}}>
                    <Image style={{width:12,height:12,marginRight:5,}} source={require('./../imgs/addicon.png')}></Image>
                    <Text style={{ fontSize:14, color:'#fff',}}>添加作品</Text>
                </View>
                </TouchableOpacity>

            </View>
        );
    } 
    Goadd() {
        //console.log(id+'和\n'+name+'和\n'+desc+'和\n'+image)
        /*const {navigate} = this.props.navigation;
        navigate('MainDetail',{page:'tjzp',title:'添加作品'});*/
    }


    Gojump() {
        const {navigate} = this.props.navigation;
        navigate('MainDetail',{title:'这是作品详情页'})
    } 

    async Findxq(token,id) {
        var that = this
        try {
            let response = await fetch(`${url}/App/Role/work_up_down?token=${token}&id=${id}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if(responseJson.errorCode===0){
                return responseJson.data;   
            }else{
                ToastUtil.showShort(responseJson,true)
            }
        } catch(error) {
            console.error(error);
            ToastUtil.showShort(error,true)
        } 
    }

    Shanchu(id) {
        var that = this
        console.log(id)
        store.get('user')
        .then(
            function(data){
                that.setState({
                    lingToken:data.token,
                });  
                that.Doshan(data.token,id);
            })
    }
    async Doshan(token,id) {
        var that = this
        console.log(token+'和'+id)
        try {
            let response = await fetch(`${url}/App/Role/del_work_img?token=${token}&id=${id}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if(responseJson.errorCode===0){ 
                ToastUtil.showShort('删除成功',true) 
                console.log(responseJson)
                return responseJson;   
            }else{
                ToastUtil.showShort(responseJson.errorMsg,true)
            }
        } catch(error) {
            console.error(error);
            ToastUtil.showShort(error,true)
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#151515'
    },
    tabView: {
        paddingBottom:8,
    },
    sin: {
        backgroundColor: '#1b1b1b',
        marginTop:8,
        padding:(width*0.02),
        flexDirection:'row'
    },  
    sinmid: {
        width:width*0.50,
        marginLeft:width*0.03,
        marginRight:width*0.03, 
    },
    sinText: {
        flexDirection:'row',
        paddingTop:3,
        width:width*0.50,
        alignItems:'center'
    },
    sinbtn: {      
        flexDirection:'row',
        height:20, 
        width:width*0.50,
        paddingTop:6
    },
    sbtn:{
        flexDirection:'row',
        marginRight:10,
        alignItems:'center',    

    },
    sinTai: {
        width:width*0.2,
        alignItems:'center',
        justifyContent:'center',
        height:width*0.2
    }
});
