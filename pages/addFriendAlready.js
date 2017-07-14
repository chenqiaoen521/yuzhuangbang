/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
const host = require('../config.json').url;
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
    Switch
} from 'react-native';
var {width,height} = Dimensions.get('window');
import ToastUtil from '../utils/ToastUtil';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';

export default class AddFriendDetail extends Component {
    static navigationOptions = {
        title:'好友详情',
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
        nickname:'',
        sex:'',
        phone:'',
        avatar:'',
        type:'',
        user_id:'',
        type_id:'',
        name:'',
        province:'',
        city:'',
        area:'',
        remark:'',
        trueSwitchIsOn:false,
        token:''
      };
    }
    componentWillMount () {
        let that = this ;
        store.get('user').then(
        function(data){
          that.setState({
              token:data.token,
          });   
          that.__init(data.token);      
        })
    }
    __init (token) {
        let that = this;
        let {user_id,type} = this.props.navigation.state.params;
        this.getData(user_id,type,token).then(function(data){
            that.setState({
                nickname:data.nickname?data.nickname:'',
                name:data.name?data.name:'',
                sex:data.sex,
                phone:data.phone?data.phone:'',
                avatar:data.avatar,
                type:ToastUtil.getUserType(data.type),
                province:data.province?data.province:'',
                city:data.city?data.city:'',
                area:data.area?data.area:'',
                remark:data.remark,
                trueSwitchIsOn:data.is_share == 1? true:false
            })
        })
    }
    async getData(user_id,type,token) {
      try {   
        let response = await fetch(`${host}/App/Role/friend_user_info?user_id=${user_id}&type=${type}&token=${token}`);
        let responseJson = await response.json();
        return responseJson.data;
      } catch(error) {
          console.error(error);
      }
  }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ backgroundColor:'#1b1b1b',alignItems :'center', flexDirection:'row',padding:20,marginBottom:20}}>
                        <Image style={{width:70,height:70,borderRadius:35,marginRight:20}} source={{uri:`${host}${this.state.avatar}`}}></Image>
                        <View>
                            <View style={{ flexDirection:'row',alignItems : 'center',justifyContent:'flex-start'}}>
                                <Text style={{fontSize:16, color:'#cccccc'}}>{this.state.name}</Text>
                                <Text style={{fontSize:10,paddingLeft:3,paddingRight:3,marginLeft:10,borderRadius:3, color:'#fff',backgroundColor:'#ae8300'}}>{this.state.type}</Text>
                            </View>
                            <View style={{ flexDirection:'row'}}>
                                <Text style={{fontSize:12, color:'#858585',marginTop:3}}>昵称:</Text>
                                <Text style={{fontSize:12, color:'#858585',marginTop:3}}>{this.state.nickname}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>设置备注</Text>
                        <Text style={styles.rtext}>{this.state.remark}</Text>
                    </View>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>电话号码</Text>
                        <Text style={styles.rtext}>{this.state.phone}</Text>
                    </View>
                    <View style={{marginTop:6}}>
                        <View style={styles.mation}>
                            <Text style={styles.ltext}>地区</Text>
                            <Text style={styles.rtext}>{`${this.state.province}${this.state.city}${this.state.area}`}</Text>
                        </View>
                        {/*<View style={styles.mation}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:13,color:'#cccccc',marginRight:10}}>客户共享</Text>
                                <Text style={{fontSize:11,color:'#cccccc'}}>{this.state.trueSwitchIsOn  ? '允许对方服务我的客户':'拒绝对方服务我的客户'}</Text>
                            </View>
                            <Switch value={this.state.trueSwitchIsOn} onValueChange={(value) => this.setState({trueSwitchIsOn: value})} thumbTintColor="#fff"  onTintColor="#ae8300"/>
                        </View>*/}
                    </View>
                </ScrollView>
                

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    ltext: {
        width:0.3*(width-30),
        fontSize:13,
        color:'#cccccc'
    },
    rtext: {
        width:0.7*(width-30),
        color:'#bbb',
        textAlign:'right',
        fontSize:13,
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
    mation: {
        borderBottomWidth:1,
        borderColor:'#151515',
        backgroundColor:'#1b1b1b',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
});
