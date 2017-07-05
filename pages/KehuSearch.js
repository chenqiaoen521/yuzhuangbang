/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
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
    ScrollView,
    WebView,
    ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import KehuList from '../Components/KehuList';

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';

export default class Center extends Component {
    static navigationOptions = {
        headerRight: (
            <View style={{ 
                    width:width-80, 
                    borderBottomWidth:1, 
                    borderBottomColor:'#ae8300', 
                    flexDirection:'row', 
                    justifyContent:'space-between',
                    alignItems:'center', 
                    height:40, 
                    marginRight:10, paddingLeft:5, paddingRight:5, }} >

                <TouchableOpacity>
                <View style={{ width:30, height:24, borderRadius:3, marginTop:3, paddingLeft:5, justifyContent:'center',alignItems:'center'}}>
                    <Icons.Button name="md-search" backgroundColor="transparent" underlayColor="transparent" 
                        activeOpacity={0.8} style={{padding:0}} />
                    {/*<Text style={{color:'#fff', fontSize:13, textAlign:'center',}}>搜索</Text>*/}
                </View>
                </TouchableOpacity>

                <TextInput 
                    placeholderTextColor="#777"  
                    //onChangeText={(text) => this.setState({word:text})} 
                    underlineColorAndroid="transparent" placeholder='易烊千玺'
                    style={{ width:width-115, color:'#777', fontSize:15, textAlign:'left', padding:0, }} />

            </View>   
            
        )
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            IsResult: false,      //单选内容
            word:'王三',
            onoff: true,
        };
        
    }
    render() {
        var that = this
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        that.state.IsResult == false ? 
                        <TouchableOpacity onPress={ ()=> that.Gofind() }>
                        <View style={{width:width}}>
                            <Image resizeMode={'center'} style={[styles.bmid,{ width:width},{ marginTop:80}]} source={require('./../imgs/bgtext_03.png')}>
                                <Text style={styles.etext}>输入搜索指定客户以及信息</Text>
                            </Image>
                        </View>
                        </TouchableOpacity>
                        :
                        <KehuList ref='jieguo' popToWatch={ ()=> that.Goxq() } />
                    }
                    {/*<KehuList ref='jieguo' popToWatch={ ()=> that.Goxq() } />*/}
                </ScrollView>    
            </View>
        );
    }
    Goxq (){
        const {navigate} = this.props.navigation;
        navigate('Kehu',{page:'xq',title:'客户详情'});
    }

    Gofind() {
        var that = this
        that.setState({
            IsResult:true
        })
    }

    

}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    bmid: {
        alignItems:'center',
        justifyContent:'center',
    },
    etext: {
        fontSize:15,
        color:'#999',
    },
    
    
    
});
