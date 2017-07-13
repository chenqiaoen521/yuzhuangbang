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
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
const host = require('../config.json').url;
import ToastUtil from '../utils/ToastUtil';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import store from 'react-native-simple-store';
import ModalDropdown from 'react-native-modal-dropdown';
export default class Icare extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
    ),
    headerRight: navigation.state.params.id===3 ? (
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Icons.Button name="ios-add" backgroundColor="transparent" underlayColor="transparent" size={30}
        activeOpacity={0.8}  onPress={() => {  navigation.navigate('addFriend'); }} />
        {/*<Icon.Button
        name="bell-o"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }}
      />*/}

      </View>
    ): null /*(
      <Icon.Button
        name="bell-o"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }}
      />
    )*/
   });
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
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      data:[],
      token:'',
      temp:[]
    };
  }
  onActionSelected () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
  __init (token) {
    //const data = require('../data/friend.js')
    const {navigation} = this.props;
    navigation.setParams({ handleShare: ()=>this.onActionSelected() });
    let id = navigation.state.params.id;
    let that = this;
    this.getData(id,token).then(function (data) {
      if(data.length == 0){
        ToastUtil.showShort('您还没有好友', false);
      }
      that.setState({
        data:data,
        temp:data
      })
    })
  }
  async getData(id,token) {
    let formData = new FormData();
    formData.append('token',token);
    let url = '';
    if(id==1){
      url = `${host}/App/Role/my_guanZhu`;
    }else if (id==2) {
      url = `${host}/App/Role/my_fans`;
    }else if (id==3) {
      url = `${host}/App/Role/get_follow_my_request`;
    }
    try {   
        let response = await fetch(url,{
          method:'POST',
          body:formData
        });
        let responseJson = await response.json();
        return responseJson.data;
      } catch(error) {
          console.error(error);
      }
  }
  renderOptionRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={{flexDirection:'row',alignItems: 'center',height:40, justifyContent : 'center',backgroundColor:highlighted ? '#ae8300':'#333333'}}>
        <Text style={{color:'#fff',fontSize:14}}>{rowData}</Text>
      </TouchableOpacity>
      )
  } 
  renderSeparator(){
    return (
      <View style={{width:width,height:1,backgroundColor:'#555555'}}></View>
      )
  }
  onSelect(e){
    e = 1+parseInt(e);
    e = e + '';
    let arr = [];
    let data = this.state.temp;
    for(let i=0;i<data.length;i++){
      if(data[i].type == e){
        arr.push(data[i])
      }
    }
    this.setState({
      data:arr
    })
  }
  render() {
    return (
        <View style={styles.container}>  
          <ModalDropdown 
          style={styles.dropdowns} 
          textStyle ={styles.dropdowntxt} 
          dropdownStyle={styles.dropdownd}
          defaultIndex={-1}
          options={['客户', '设计师','商户']}
          onSelect= {(e)=>this.onSelect(e)}
          renderSeparator={()=>this.renderSeparator()}
          renderRow={(rowData, rowID, highlighted)=>this.renderOptionRow(rowData, rowID, highlighted)}
          >
            <View style={styles.title}>
              <View style={styles.left}>
                <Image style={{width:15,height:15,marginRight:10}} source={require('../imgs/shaixuan.png')}/>
                <Text style={{color:'#adadad',fontSize:14}}>筛选</Text>
              </View>
              <View style={styles.right}>
                <Icon name="angle-down" size={20}  color="#b6b6b6" />
              </View>
            </View>
          </ModalDropdown>
          <ListView
               dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
               renderRow={(rowdata)=>this.renderRow(rowdata)}
               contentContainerStyle={styles.contentViewStyle}
               enableEmptySections={true}
               initialListSize ={1}
          />
        </View>                                               
    );
  }
  renderRow(rowdata) {
    return (
      <TouchableOpacity onPress={()=>this.toDetail(rowdata.user_id,rowdata.type)} style={{flexDirection:"row",alignItems:'center',padding:5,marginBottom:1,backgroundColor:'#1b1b1b'}}>
        <Image style={{width:36,height:36,borderRadius:18,marginRight:10}} source={{uri:`${host}${rowdata.avatar}`}}/>
        <Text style={{fontSize:12,color:'#cccccc'}}>{rowdata.user_name}</Text>
      </TouchableOpacity>
      )
  }
  toDetail (id,type){
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    let friendid = navigation.state.params.id;
    if(friendid == 3){
      navigate('AddFriendAlready',{user_id:id,type:type}); 
    }else{
      navigate('addFriendDetail',{user_id:id,type:type});
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  contentViewStyle:{
    marginTop:8
  },
  title:{
    flexDirection:'row',
    height:60,
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#1b1b1b',
    paddingLeft:10,
    paddingRight:10
  },
  left:{
    flexDirection:'row',
    alignItems:'center'
  },
  dropdowns:{
    
  },
  dropdowntxt:{
   
  },
  dropdownd:{
    width:width,
    borderColor:'#000',
    backgroundColor:'transparent'
  }
});
