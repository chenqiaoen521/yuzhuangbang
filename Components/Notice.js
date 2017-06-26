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
  ScrollView
} from 'react-native';

const data = require('../data/notice.js')
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
export default class Notice extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activePage:0
    };
  }
  static defaultProps = {
    iconText: '公告',
    title:'',
    browserCount:1100,
    time:'2017-05-02',
    bgcolor:'#1b1b1b',
    titleColor:'#ffffff',
    rightBar:'#ffffff'
  }
   componentDidMount() {
    //this.startTimer()
  }
  componentWillUnMount(){
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
          {this.renderBannerView()}
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
    console.log('end')
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
    let itemarr = [];
    data.data.map((item,i)=>{
      itemarr.push(
          <View key={i} style={[styles.container,{backgroundColor:this.props.bgcolor}]}>
            <View style={styles.bounce}>
              <Text style={[styles.titleStyle,{fontSize:12},{backgroundColor:'#ff3d2c'},{paddingLeft:4},{paddingRight:4}]}>{item.iconText}</Text>
              <Text style={[styles.titleStyle,{color:this.props.titleColor},{fontSize:14},{marginLeft:10}]}>{item.title}</Text>
            </View>
            <View style={styles.bounce}>
              <Text style={{color:'#ae8300'}}>&bull;</Text>
              <Text style={[styles.subFontStyle,{marginLeft:8},{fontSize:13}]}>{item.browserCount}人浏览</Text>
              <Text style={[styles.subFontStyle,{marginLeft:20},{fontSize:13}]}>时间:{item.time}</Text>
            </View>
            <Icon name="ios-arrow-dropright-outline" size={25} style={{color:this.props.rightBar,position:'absolute',right:4,bottom:15}}/>
        </View>
        )
    })
    return itemarr;
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




