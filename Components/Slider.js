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
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {data} from './bannerData'
export default class Slider extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activePage:0
    };
  }
  static defaultProps = {
    duration: 2000
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref="myscoll"
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator ={false}
          iosonScrollAnimationEnd ={(e) => this.onAnimationEnd(e)}
          onScrollBeginDrag={(e)=>this.onScrollBeginDrag(e)}
          onScrollEndDrag={()=>this.onScrollEndDrag()}
        >
          {this.renderBannerView()}
        </ScrollView>
        <View style={styles.pageStyle}>
          {this.renderIndicator()}
        </View>
      </View>
    );
  }
  onScrollBeginDrag () {
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
  renderBannerView (){
    //组件数组
    let itemArr = [];
    data.map((item,i)=>{
      itemArr.push(
        <Image style={styles.imgStyle} key={i} source={item.icon}/>
        )
    })
    return itemArr
  }
  renderIndicator () {
    let indicatorArr = [];
    let len = data.length;
    for(let i = 0;i<len;i++){
        let style = (i ===this.state.activePage) ? '#ae8300':'#f3f3f3';
      indicatorArr.push(
        <Text key={i} style={{fontSize:20,color:style}}>&bull;</Text>
        );
    }
    return indicatorArr;
  }
  onAnimationEnd (e) {
    let offsetX = e.nativeEvent.contentOffset.x
    let currentPage = Math.floor(offsetX / width)
    this.setState({
      activePage:currentPage
    })
  }
  startTimer () {
    let Scroll = this.refs.myscoll
    this.timer = setInterval(() => {
      let activePage = this.state.activePage;
      if((this.state.activePage+1)>= data.length){
        activePage = 0;
      }else{
        activePage = this.state.activePage+1 ;
      }
      this.setState({
        activePage:activePage
      })
      Scroll.scrollTo({x:activePage*width,y:0,animated:true})
    },this.props.duration)
  }
  componentDidMount() {
    this.startTimer()
  }
  componentWillUnMount(){
    clearInterval(this.timer)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imgStyle:{
    width:width,
    height:150,
  },
  pageStyle:{
    position:'absolute',
    bottom:0,
    width:width,
    flexDirection : 'row',
    justifyContent :'center'

  }
});

