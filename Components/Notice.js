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
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
const host = require('../config.json').url;
const token = require('../config.json').token;
const data = require('../data/notice.js')
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
export default class Notice extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activePage:0,
      data:null
    };
  }
  static defaultProps = {
    iconText: '公告',
    title:'',
    browserCount:1100,
    time:'2017-05-02',
    bgcolor:'#1b1b1b',
    titleColor:'#ffffff',
    rightBar:'#ffffff',
    popToparent:null
  }
   componentWillMount() {
    let data = this.getData();
    data.then((result)=>{
      this.setState({
        data:result
      })
      this.startTimer();
    })
  }
  async getData() {
    try {   
      let response = await fetch(`${host}/App/Index/notice?token=${token}`);
      let responseJson = await response.json();
      return responseJson.data;
    } catch(error) {
      console.error(error);
    }
  }
  componentWillUnmount(){

    clearInterval(this.timer)
  }
  startTimer () {
    let Scroll = this.refs.noticeScroll
    this.timer = setInterval(() => {
      let activePage = this.state.activePage;
      if((this.state.activePage+1)>= data.data.length){
        activePage = 0;
      }else{
        activePage = this.state.activePage+1 ;
      }
      this.setState({
        activePage:activePage
      })
      Scroll.scrollTo({x:activePage*width,y:0,animated:true})
    },5000)
  }
  render() {

  /*  return (
      <View style={[styles.container,{backgroundColor:this.props.bgcolor}]}>
          <View style={styles.bounce}>
            <Text style={[styles.titleStyle,{fontSize:9},{backgroundColor:'#ff3d2c'},{paddingLeft:2},{paddingRight:2}]}>{this.props.iconText}</Text>
            <Text style={[styles.titleStyle,{color:this.props.titleColor},{fontSize:12},{marginLeft:10}]}>{this.props.notice.list}</Text>
          </View>
          <View style={styles.bounce}>
            <Text style={{color:'#ae8300'}}>&bull;</Text>
            <Text style={[styles.subFontStyle,{marginLeft:8}]}>{this.props.browserCount}人浏览</Text>
            <Text style={[styles.subFontStyle,{marginLeft:20}]}>时间:{this.props.time}</Text>
          </View>
          <Icon name="ios-arrow-dropright-outline" size={24} style={{color:this.props.rightBar,position:'absolute',right:4,bottom:15}}/>
      </View>
    );*/

      return (
        <ScrollView
          ref="noticeScroll"
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator ={false}
          contentContainerStyle={styles.scroll}
          iosonScrollAnimationEnd ={(e) => this.onAnimationEnd(e)}
          onScrollBeginDrag={(e)=>this.onScrollBeginDrag(e)}
          onScrollEndDrag={()=>this.onScrollEndDrag()}
        >
          {this.renderBannerView.bind(this)()}
        </ScrollView>
      )
  }
  onScrollBeginDrag (e) {
    //停止定时器
    console.log('begin')
    clearInterval(this.timer);
    let offsetX = e.nativeEvent.contentOffset.x
    let currentPage = Math.floor(offsetX / width)
    this.setState({
      activePage:currentPage
    })
  }
  onScrollEndDrag () {
    this.startTimer();
  }
  onAnimationEnd (e) {
    let offsetX = e.nativeEvent.contentOffset.x
    let currentPage = Math.floor(offsetX / width)
    this.setState({
      activePage:currentPage
    })
  }
  renderBannerView() {
    let that = this;
    let itemarr = [];
    if(this.state.data){
      this.state.data.map((item,i)=>{
      itemarr.push(
          <TouchableOpacity onPress={()=>this.goDetail(item.id)} key={i} style={[styles.container,{backgroundColor:this.props.bgcolor}]}>
            <View style={styles.bounce}>
              <Text style={[styles.titleStyle,{fontSize:12},{backgroundColor:'#ff3d2c'},{paddingLeft:4},{paddingRight:4}]}>{'公告'}</Text>
              <Text style={[styles.titleStyle,{color:this.props.titleColor},{fontSize:14},{marginLeft:10}]}>{item.title}</Text>
            </View>
            <View style={styles.bounce}>
              <Text style={{color:'#ae8300'}}>&bull;</Text>
              <Text style={[styles.subFontStyle,{marginLeft:8},{fontSize:13}]}>{item.view}人浏览</Text>
              <Text style={[styles.subFontStyle,{marginLeft:20},{fontSize:13}]}>时间:{item.c_time}</Text>
            </View>
            <Icon name="ios-arrow-dropright-outline" size={25} style={{color:this.props.rightBar,position:'absolute',right:4,bottom:15}}/>
        </TouchableOpacity>
        )
    })
    return itemarr;
    }
    
  }
  goDetail (id) {
    if(this.props.popToparent){
      this.props.popToparent(id);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width:width,
    padding:8,
    alignItems:'center',
  },
  bounce:{
    width:width-16,
    paddingTop:2,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent :'flex-start',
  },
  subFontStyle:{
    fontSize:10,
    color:'#777777'
  },
  titleStyle:{
    color:'#fff'
  }
});




