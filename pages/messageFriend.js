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
import store from 'react-native-simple-store';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
const host = require('../config.json').url;
var {width,height} = Dimensions.get('window');
import ToastUtil from '../utils/ToastUtil';
export default class MessageFriend extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      id: null,
      follow_user_id: null,
      fans_user_id: null,
      follow_type: null,
      fans_type: null,
      created_at: null,
      status: null,
      content: null,
      remark: null,
      fans_name: null,
      avatar: null,
      token:''
    };

  }
  static navigationOptions = {
    headerTitle:'我的消息',
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
  componentWillMount () {
    let that = this;
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
        let {fans_user_id,fans_type} = this.props.navigation.state.params;
        this.getData(fans_user_id,fans_type,token).then(function(data){
            that.setState({
              id: data.id,
              follow_user_id: data.follow_user_id,
              fans_user_id: data.fans_user_id,
              follow_type: data.follow_type,
              fans_type: data.fans_type,
              created_at: data.created_at,
              status: data.status,
              content: data.content,
              remark: data.remark,
              fans_name: data.fans_name,
              avatar: data.avatar
            })
        })
    }
  async getData(user_id,type,token) {
      let formData = new FormData(); 
      formData.append('token',token);   
      formData.append('fans_user_id',user_id);   
      formData.append('fans_type',type);   
      try {   
        let response = await fetch(`${host}/App/Role/follow_msg_info`,{
          method:'POST',
          body:formData
        });
        let responseJson = await response.json();
        return responseJson.data;
      } catch(error) {
          console.error(error);
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{color:'#cccccc',fontSize:16}}>好友申请</Text>
        </View>
        <View style={styles.unit}>
          <Image source={{uri:`${host}${this.state.avatar}`}} style={styles.left}/>
          <View style={styles.middle}> 
            <Text style={{color:'#cccccc',fontSize:15}}>{this.state.fans_name}</Text>
            <Text style={{color:'#999999',fontSize:13,marginTop:4,width:100}}>来自：好友请求</Text>
          </View>
          <TouchableOpacity style={styles.right} onPress={()=>this.chkn()}>
            <Text style={{color:'#292929',fontSize:13,backgroundColor:'#ae8300',padding:3, color:'#fff',width:66,borderRadius:4,textAlign:'center'}}>查看</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.introduce}>
          <Text style={{color:'#999999',fontSize:14}}>请求加您为好友 :</Text>
          <Text style={{color:'#666666',fontSize:12,marginTop:5,marginLeft:10}}>{this.state.content}</Text>
          <Text style={{color:'#666666',fontSize:12,marginTop:5,marginLeft:10}}>{this.state.remark}</Text>
        </View>
        {
          this.state.status == 0 ?
        <View style={styles.btns}>
          <TouchableOpacity onPress={()=>this.submit(0)} style={styles.btn}><Text style={[styles.btnTxt,{marginBottom:14, backgroundColor:'#1b1b1b',color:'#999999'}]}>拒绝</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.submit(1)} style={styles.btn}><Text style={styles.btnTxt}>同意</Text></TouchableOpacity>
        </View>
        :
         <View style={styles.btns}>
          <View onPress={()=>this.submit(1)} style={styles.btn}><Text style={styles.btnTxt}>{`已${ToastUtil.friendType(this.state.status)}`}</Text></View>
        </View> 
        }
      </View>
    );
  }
  chkn (){
    const {navigate} = this.props.navigation;
    navigate('addFriendDetail',{user_id:this.state.fans_user_id,type:this.state.fans_type});
  }
  submit (index){
    let token = this.state.token;
    let formData = new FormData(); 
    formData.append('token',token);   
    formData.append('id',this.state.id);   
    if(index == 1) {
      formData.append('status',1); 
    }else{
      formData.append('status',2); 
    }
    this.submitData(formData).then((data)=>{
      if(data == 'success'){
        ToastUtil.showShort('操作成功', false);
        this.props.navigation.goBack(null);
      }
    })
  }
  async submitData(formData) {
      
    try {   
      let response = await fetch(`${host}/App/Role/edit_follow`,{
        method:'POST',
        body:formData
      });
      let responseJson = await response.json();
      return responseJson.errorMsg;
    } catch(error) {
        console.error(error);
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  btns:{
    marginTop :60
  },
  btn:{
   alignItems:'center'
  },
  btnTxt:{
    width:width*0.95,
    borderRadius:5,
    padding:10,
    textAlign:"center",
    backgroundColor:'#ae8300',
    color:'#fff'
  },
  introduce:{
    marginTop:30,
    paddingLeft:10,
    paddingRight:10,

  },
  title:{
    alignItems:'flex-start',
    paddingLeft:12,
    paddingRight:12,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#292929',
  },
  unit:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:25
  },
  left:{
    width:50,height:50,borderRadius:25
  }
});
