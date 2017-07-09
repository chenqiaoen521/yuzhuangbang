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
  InteractionManager,
} from 'react-native';
var data = [require('../imgs/screen_01.png'),require('../imgs/screen_02.png'),require('../imgs/screen_03.png')];
var {width,height} = Dimensions.get('window');
import store from 'react-native-simple-store';
export default class Splash extends Component {
  static navigationOptions = {
    header:null
  }
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
            onScrollEndDrag={(e)=>{this.onScrollEndDrag(e)}}
        >
        {this.renderImage()}
        </ScrollView>
       { /*<View style={styles.pageStyle}>
          {this.renderIndicator()}
        </View>*/}
      </View>
    );
  }
  onAnimationEnd(e){
    let offsetX = e.nativeEvent.contentOffset.x
    let currentPage = Math.floor(offsetX / width)
    this.setState({
      activePage:currentPage
    })
  }
  onScrollEndDrag (e) {
    let offsetX = e.nativeEvent.contentOffset.x
    let currentPage = Math.floor(offsetX / width)
    this.setState({
      activePage:currentPage
    })
  }
  renderImage(){
    let screens = []
    let arr = data
    arr.map((item,i) =>{
      if(i == (data.length-1)){
        screens.push(
        <View key={i} style={styles.imgContainerStyle}>
          <Image style={styles.imgStyle} resizeMode={'contain'}  source={item}/>
          <TouchableOpacity TouchableOpacity={0.5}  style={styles.buttonStyle} onPress={()=>this.toIndex()} >
            <Text style={{backgroundColor:'#dcb82a',color:'#fff',fontSize:14,textAlign :'center', padding:7,width:90,borderRadius:5 }}>立即进入</Text>
          </TouchableOpacity>
        </View>
        )
      }else{
        screens.push(
        <View key={i} style={styles.imgContainerStyle}>
          <Image style={styles.imgStyle}  source={item}/>
        </View>
        )
      }
    })
    return screens
  }
  toIndex () {
    store.save('isInit', true);
    const {navigate} = this.props.navigation;
    navigate('Main');
  }
  renderIndicator () {
    let indicatorArr = [];
    let len = data.length;
    for(let i = 0;i<len;i++){
        let style = (i ===this.state.activePage) ? '#ff3139':'#c1c1c1';
      indicatorArr.push(
        <Text key={i} style={{fontSize:25,color:style}}>&bull;</Text>
        );
    }
      return indicatorArr;
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  buttonStyle:{
    position:'absolute',
    bottom:20,
    left:width/2 - 45,
    zIndex:10
  },
  imgContainerStyle:{
    flex:1
  },
  imgStyle:{
    width:width,
    height:height
  },
  pageStyle:{
    position:'absolute',
    bottom:0,
    width:width,
    flexDirection : 'row',
    justifyContent :'center'
  }
});
