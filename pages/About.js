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
    Modal
} from 'react-native';
var {width,height} = Dimensions.get('window');
//获取公共域名
var url = require('../config.json').url

import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about:[]
        };
    }
    static navigationOptions = {
        headerTitle:'关于我们',
        headerRight: (<View></View>),
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems :'center',marginTop:20,marginBottom:20, paddingLeft:12, paddingRight:12,}}>
                    <Image source={require('../imgs/yu.png')} style={styles.img}/>
                </View>
                <Text style={styles.title}>{this.state.about.title}</Text>
                <Text style={styles.introduce}>{this.state.about.content}</Text>
                <View style={styles.bg}>
                    <Image style={{width:width,height:150}} source={require('../imgs/bg.png')} />
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.GetData();
    }

    GetData() {
        var that = this;
        let datanum = this.Doget();
        datanum.then(
            (result)=>{
                that.setState({about:result})
            }
        )    
    }
    async Doget() {
        try {
                let response = await fetch(`${url}/App/Index/about`,{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                let responseJson = await response.json();
                if(responseJson.errorCode===0){
                    console.log(responseJson)
                    return responseJson.data;
                }else{
                    console.log(responseJson)
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
        backgroundColor:'#151515',
    },
    title:{
        color:'#ae8300',
        textAlign:'center',
        fontSize:18 ,
        paddingLeft:12, 
        paddingRight:12,
    },
    bg:{
        position:'absolute',
        bottom:0
    },
    img:{
        width:100,
        height:110,
    },
    introduce:{
        color:'#636363',
        textAlign : 'center',
        fontSize:12,
        lineHeight :22,
        marginTop :20 ,
        paddingLeft:12, 
        paddingRight:12,
    }
});
