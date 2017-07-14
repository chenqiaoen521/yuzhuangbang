/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
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
import ToastUtil from '../utils/ToastUtil';

import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';

export default class AddFriendDetail extends Component {
    static navigationOptions = {
        title:'好友详情',
        headerRight: (<View></View>),
        /*headerRight: (
            <Icon.Button
                name="bell-o"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={ () => {  navigation.state.params.handleShare(); } }
            />
        )*/
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
      };
    }
    componentDidMount () {
        let that = this;
        this.getData().then(function(data){
            that.setState({
                nickname:data.nickname,
                sex:data.sex,
                phone:data.phone,
                avatar:data.avatar,
                type:ToastUtil.getUserType(data.type)
            })
        })
    }
    async getData() {
        let {user_id,type} = this.props.navigation.state.params;
        this.setState({
            user_id:user_id,
            type_id:type
        })
      try {   
        let response = await fetch(`${host}/App/User/other_user_info?user_id=${user_id}&type=${type}`);
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
                    <View style={{ backgroundColor:'#151515',}}>
                    <Image source={require('./../imgs/friend_02.png')} style={{width:width,height:150,justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:70,height:70,borderRadius:35,}} source={{uri:`${host}${this.state.avatar}`}}></Image>
                        <Text style={{fontSize:16, color:'#cccccc',lineHeight:30}}>{this.state.nickname}</Text>
                        <Text style={{fontSize:12, color:'#858585',marginTop:3}}>{this.state.phone}</Text>
                    </Image>
                    </View>
                    <Notice popToparent={(id)=>this.popToparent(id)} bgcolor={'#f7f7f7'} titleColor={'#333'} rightBar={'#999'} />
                    <View style={styles.mbox}>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>账号信息</Text>
                        <Text style={styles.rtext}>{this.state.phone}</Text>
                    </View>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>性别</Text>
                        <Text style={styles.rtext}>{this.state.sex}</Text>
                    </View>
                    <View style={styles.mation}>
                        <Text style={styles.ltext}>身份属性</Text>
                        <Text style={styles.rtext}>{this.state.type}</Text>
                    </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.GoAdd()}>
                    <View style={styles.add}><Text style={styles.addt}>添加好友</Text></View>
                </TouchableOpacity>

            </View>
        );
    }
    GoAdd (){
        const {navigate} = this.props.navigation;
        navigate('AddFriendRequest',{...this.state}) 
    }
     popToparent(id){
    const {navigate} = this.props.navigation;
    navigate('MainDetail',{id:id,page:'/App/Index/article_detail'});
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7',
    },
    ltext: {
        width:0.3*(width-30),
        fontSize:13,
        color:'#444'
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
        borderColor:'#eee',
        backgroundColor:'#fff',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    mbox: {
        borderTopWidth:1,
        borderColor:'#eee',

    }
});
