/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
const host = require('../config.json').url;
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import store from 'react-native-simple-store';
import ToastUtil from '../utils/ToastUtil';
var {width,height} = Dimensions.get('window');
import {request} from '../utils/asyncRequest';
import Ionicons from 'react-native-vector-icons/FontAwesome';
export default class searchPage extends Component {
  static navigationOptions = {
    headerRight: (
      <Ionicons.Button
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
   constructor(props) {
    super(props);
  
    this.state = {
      activePage:0,
      content:'',
      history:[],
      hot:[]
    };
  }
  componentWillUnmount () {
    let data = this.state.history;
    store.save('words', data);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={{flexDirection:'row',padding:8,alignItems:'center',justifyContent : 'space-between'}}>
              <View style={styles.searchStyle}>
                <TextInput underlineColorAndroid="transparent"  onChangeText={(text) => this.setState({content:text}) }  placeholderTextColor="#7c7c7c" placeholder={"请输入您想要搜索的内容"} style={styles.inputStyle}/>
              </View>
              <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.search()}>
                <Text style={{color:'#fff',fontSize:14}}>搜索</Text>
              </TouchableOpacity>
            </View>
            <Text style={{color:'#fff',marginTop:5,paddingLeft:8,fontSize:12}}>热门搜索</Text>
            <View style={styles.hotStyle}>
                {this.renderHot()}
            </View>
          </View>
          <View style={[styles.section,{marginTop:10,paddingTop:7}]}>
            <Text style={{color:'#fff',marginTop:5,paddingLeft:8,fontSize:12}}>历史搜索</Text>
            <View style={[styles.history,{borderTopColor:'#353535',borderTopWidth:0.5}]}>
              {this.renderHistory()}
            </View>
            <View style={{flexDirection:'row', justifyContent:'center',marginTop:20,marginBottom:30}}>
            <TouchableOpacity style={{}} onPress={()=>this.clear()} TouchableOpacity={0.5} >
              <Text style={{padding:7,width:130, textAlign:'center', borderRadius:5,color:'#999999',fontSize:12,backgroundColor:'#252525'}}>清空历史搜索记录</Text>
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  clear () {
    this.setState({
      history:[]
    })
    store.save('words', []);
  }
  search () {
    let a = this.state.content;
     if(!a) {ToastUtil.showShort('请填入搜索内容', false);return;}
     let data = this.state.history;
     data.push(a);
     this.setState({
      history:data
     })
     const {navigate} = this.props.navigation;
     navigate('SearchDetail',{word:a});
  }
  componentDidMount() { 
    let that = this;
    request(`${host}/App/Index/hot`).then((data)=>{
      that.setState({
        hot:data.data
      })
    });
    store.get('words').then((data)=>{
      if(data){
        that.setState({
          history:data
        })
      }else{
        that.setState({
          history:[]
        })
      }
     })
  }
  renderHot(){
    let itemArr = [];
    let arr = this.state.hot;
    arr.map((item,i) =>{
      itemArr.push(
        <TouchableOpacity onPress={()=>this.hotSearch(item)} style={{backgroundColor:'#252525', height:28,borderRadius:4, padding:6,margin:5}} key={i}>
          <Text style={{color:'#999999',fontSize:14}}>{item}</Text>
        </TouchableOpacity>
        )
    })
    return itemArr
  }
  hotSearch (word) {
    const {navigate} = this.props.navigation;
     navigate('SearchDetail',{word:word});
  }
  renderHistory(){
    let itemArr = []
    let data =this.state.history;
    data.map((item,i) =>{
      itemArr.push(
          <TouchableOpacity onPress={()=>this.hotSearch(item)} style={{backgroundColor:'#252525', height:28,borderRadius:4, padding:6,margin:5,justifyContent:'center'}} key={i}>
          <Text style={{color:'#666666',fontSize:14,margin:5}}>{item}</Text>
          </TouchableOpacity>
        )
    })
    return itemArr
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515'
  },
  hotStyle:{
    flexDirection:'row',
    flexWrap :'wrap',
    padding:10,
    paddingTop:0,
    marginTop:10
  },
  history:{
    flexDirection:'row',
    flexWrap :'wrap',
    justifyContent:'flex-start',
    alignItems :'center'
  },
  section:{
    backgroundColor:'#1b1b1b'
  },
  searchStyle: {
    flexDirection:'row',
    justifyContent :'center',
    backgroundColor:'#4c4c4c',
    borderRadius:25,
    width:width*0.82,
    height:32,
    alignItems:'center',
  },
  inputStyle:{
    width:width*0.7,
    fontSize:11,
    color:'#7c7c7c',
  },
});
