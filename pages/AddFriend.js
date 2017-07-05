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
  ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
import ToastUtil from '../utils/ToastUtil';
export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      cont:'',
      dataSource: ds,
      contList:[],
    };
  }
  static navigationOptions = {
    headerTitle:'添加好友'
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSearch()}
        <ListView 
          contentContainerStyle={styles.sendpro}
          dataSource={this.state.dataSource.cloneWithRows(this.state.contList)}
          renderRow={(rowdata, sectionID, rowID)=>this.renderRow(rowdata,sectionID,rowID)}
          initialListSize ={1}
        />
      </View>
    );
  }
  renderSearch () {
    return (
      <View style={styles.search}>
        <Ionicons.Button
          name="ios-search" 
          color='#666666'
          size={25}
          backgroundColor="transparent"
          underlayColor="transparent"
          onPress={() => {
            this.search();
          }}
          activeOpacity={0.8}/>
          <TextInput 
            underlineColorAndroid="transparent" 
            style={{color:'#cccccc',marginLeft:10,padding:0,width:200,textAlign:'left',fontSize:15,}} 
            placeholder  = {'输入对方账号进行查找'}
            onChangeText={(text) => this.setState({cont:text}) }
            placeholderTextColor = '#666666'
          />
      </View>
      )
  }
  search () {
    let a = this.state.cont
    if(!a) {ToastUtil.showShort('请输入搜索内容', false);return;}
    this.getData().then((data)=>{
      this.setState({
        contList:data
      })
    })
  }
  async getData() {
    let key = this.state.cont;
      try {   
        let response = await fetch(`${host}/App/User/search_user?key=${key}`);
        let responseJson = await response.json();
        return responseJson.data;
      } catch(error) {
          console.error(error);
      }
  }
  renderRow (rowdata,sectionID,rowID) {
    return (
      <TouchableOpacity onPress={()=>this.go(rowdata.id,rowdata.role_type) } >
          <View style={{flexDirection:"row",alignItems:'center',padding:10,marginBottom:1,backgroundColor:'#151515'}}>
            <Image style={{width:44,height:44,borderRadius:22,marginRight:10}} source={{uri:`${host}${rowdata.avatar}`}}/>
            <Text style={{fontSize:12,color:'#cccccc'}}>{rowdata.nickname}</Text>
          </View>
        </TouchableOpacity>
      )
  }

  go (id,type) {
     this.props.navigation.navigate('addFriendDetail',{user_id:id,type:type});
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  search:{
    flexDirection:'row',
    alignItems:'center',
    height:55,
    paddingLeft:10,
    backgroundColor:'#1b1b1b',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderBottomColor:'#262626',
    borderTopColor:'#262626',
    marginBottom :20
  }
});
