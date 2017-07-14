/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
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
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import ToastUtil from '../utils/ToastUtil';
import {request} from '../utils/asyncRequest';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
var swipeoutBtns = [
  {
    text: '删除',
    color:'#fff',
    backgroundColor:'#eb0b0b',
    onPress:function(){ alert('button pressed') }
  },
  {
    text: '编辑',
    color:'#fff',
    backgroundColor:'#ae8300'
  }
];
export default class Account extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      data:[]
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle:'子账号添加',
    headerRight: (<View></View>),
  });
  componentDidMount () {
    let that = this;
    this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
    store.get('user').then(
      function(data){
          that.setState({
              token:data.token
          });  
          let formData = new FormData(); 
          formData.append('token',data.token);
          request(`${host}/App/Department/get_department`,'POST',formData).then((data)=>{
            that.setState({
              data:data.data
            })
          })      
    })
  }
  onActionSelected () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
  render () {
    return (
      <View style={styles.container}>
        <ListView
           dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
           renderRow={(rowdata)=>this.renderRow(rowdata)}
           contentContainerStyle={styles.contentViewStyle}
           enableEmptySections={true}
           initialListSize ={1}
        />
      </View>
      )
  }
  /*render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            {this.renderItem()}
          </ScrollView>
          <TouchableOpacity onPress={this.toSetting.bind(this)} style={styles.add}>
            <Text style={{color:'#fff'}}>
              添加子账号
            </Text>
          </TouchableOpacity>
        </View>                                               
    );
  }*/
  renderRow(rowdata){
    let that = this;
        return (
          <Swipeout  right={[
          /*{
            text: '删除',
            color:'#fff',
            backgroundColor:'#eb0b0b',
            },*/
          {
            text: '添加',
            color:'#fff',
            backgroundColor:'#ae8300',
            onPress () {that.toAdd(rowdata.id)}
          }    
            ]} style={styles.swipe} autoClose={true} backgroundColor="#1b1b1b">
          <View style={[styles.unitStyle,{backgroundColor:'#1b1b1b'}]}>
            <Text style={{color:'#cccccc',fontSize:14}}>{rowdata.dt_name}</Text>
            <View style={styles.rightBarStyle}>
              <TouchableOpacity  onPress={()=>{that.toAdd(rowdata.id)}} style={{ backgroundColor:'#ae8300',height:30,alignItems:'center',justifyContent:'center',width:70,borderRadius:5}}>
                <Text style={{color:'#fff'}}>添加</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swipeout>
        )
  }
  toAdd(id){
    const {navigate} = this.props.navigation;
    navigate('accountAdd',{title:'添加子账号',isAdd:true,id:id});
  }
  toBian(id){
    const {navigate} = this.props.navigation;
    navigate('accountAdd',{title:'编辑子账号',isAdd:false});
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  contentViewStyle:{

  },
  add:{
    backgroundColor:'#ae8300',
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  swipe:{
    marginBottom :5
  },
  unit:{
    flexDirection:'row',
    height:50,
    alignItems:'center',
  },
  img:{
    width:40,
    height:40,
    borderRadius:20,
    marginLeft:10,
    marginRight:10
  },
  txt:{
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10,
    color:'#cccccc'
  },
  unitStyle:{
    flexDirection:'row',
    alignItems :'center',
    justifyContent :'space-between',
    paddingLeft:10,
    paddingRight:10,
    height:50,
    borderTopWidth:0.5,
    backgroundColor:'red'
  },
  rightBarStyle:{
    flexDirection:'row',
    alignItems:'center'
  },
});
