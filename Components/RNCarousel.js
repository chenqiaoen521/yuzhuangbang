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
    Dimensions,Image
}from 'react-native';

var {width,height} = Dimensions.get('window');
var Carousel = require('react-native-carousel');

export default class RNCarousel extends Component{
  
    render() {
        return (
            <Carousel 
                width={width} height={width*0.5} indicatorSize={36} 
                indicatorSpace={15} indicatorOffset={width+5}
                indicatorColor={'#ae8300'} inactiveIndicatorColor={'#ccc'} 
                style={{ backgroundColor:'#999'}}>
                <View style={{backgroundColor:'green'}}>
                    <Image style={{width:width, height:width*0.5}} source={require('./../imgs/indeximg_02.jpg')}></Image>
                </View>
                <View style={{backgroundColor:'blue'}}>
                    <Image style={{width:width, height:width*0.5}} source={require('./../imgs/indeximg_02.jpg')}></Image>
                </View>
                <View style={{backgroundColor:'yellow'}}>
                    {/*<Text style={{color:'red',fontSize:22}}>这是第三页啊</Text>*/}
                    <Image style={{width:width, height:width*0.5}} source={require('./../imgs/indeximg_02.jpg')}></Image>
                </View>
            </Carousel>
        );
    }
};

var styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



