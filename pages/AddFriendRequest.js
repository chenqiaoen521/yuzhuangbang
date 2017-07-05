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
    ScrollView,
} from 'react-native';
var {width,height} = Dimensions.get('window');

const host = require('../config.json').url;
import store from 'react-native-simple-store';
import ToastUtil from '../utils/ToastUtil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';

export default class Center extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        nickname:'',
        phone:'',
        avatar:'',
        content:'',
        remark:'',
        type_id:'',
        user_id:'',
        token:''
      };
    }
    static navigationOptions = {
        title:'添加好友',
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
                <ScrollView>
                    <View style={styles.xinxi}>
                        <Image style={{width:60,height:60,borderRadius:30,}} source={{uri:`${host}${this.state.avatar}`}}></Image>
                        <View style={{ height:60, width:width-100,}}>
                            <Text style={{fontSize:16, color:'#cccccc',lineHeight:30}}>{this.state.nickname}</Text>
                            <Text style={{fontSize:12, color:'#858585',marginTop:3}}>{this.state.phone}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.mt}>填写申请信息</Text>
                            <TextInput style={styles.minput} multiline={true} placeholderTextColor="#ccc" onChangeText={(text) => this.setState({content:text}) } underlineColorAndroid="transparent" placeholder='请填写申请信息' >
                            </TextInput>
                        </View>
                        <View>
                            <Text style={styles.mt}>备注</Text>
                            <TextInput style={styles.minput} multiline={true} placeholderTextColor="#ccc" onChangeText={(text) => this.setState({remark:text}) } underlineColorAndroid="transparent" placeholder='备注' >
                            </TextInput>
                        </View>
                    </View>
                </ScrollView>
                {/*<TouchableOpacity onPress={this.GoAdd.bind(this)()}>
                    <View style={styles.add}><Text style={styles.addt}>发送</Text></View>
                </TouchableOpacity>*/}
                <TouchableOpacity onPress={()=>this.send()}>
                    <View style={styles.add}><Text style={styles.addt}>发送</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
    send(){
        let a = this.state.content;
        let token = this.state.token;
        if(!a) {ToastUtil.showShort('申请信息不能为空', false);return;}
        let formData = new FormData();    
        formData.append("token",token);
        formData.append("content",a);  
        formData.append("remark",this.state.remark);  
        formData.append("user_id",this.state.user_id);  
        formData.append("type",this.state.type_id);
        let data = this.submitUrl(formData);
        data.then((data)=>{
            if(data.errorMsg=="success"){
                ToastUtil.showShort(data.errorMsg, false);
                const {goBack} = this.props.navigation;
                goBack(null);  
            }else{
                ToastUtil.showShort(data.errorMsg, false);
            }
        })
    }
    async submitUrl(formData) {
        try {
          // 注意这里的await语句，其所在的函数必须有async关键字声明
          let response = await fetch(`${host}/App/Role/add_follow`,{
            method:'POST',
            body:formData
          });
          let responseJson = await response.json(); 
          return responseJson;
        } catch(error) {
            //ToastUtil.showShort(error, false);
        }
    }
    componentWillMount () {
        let that = this;
        store.get('user').then(
          function(data){
              that.setState({
                  token:data.token
              });           
        })
    }
    componentDidMount () {
        let data = this.props.navigation.state.params;
        this.setState({...data});
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    xinxi: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10
    },
    mt: {
        color:'#535353',
        fontSize:14,
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:5
    },
    minput: {
        backgroundColor:'#1b1b1b',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:15,
        paddingRight:15,
        fontSize:13,
        color:'#ccc'
    },
    add: {
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ae8300',
    },
    addt: {
        color:'#fff',
        fontSize:14,
    },
    
    
    
});
