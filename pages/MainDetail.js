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
  Image,
  Dimensions,
  WebView,
  Alert
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import IconDetail from '../Components/IconDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class MainDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
    ),
    headerRight: (
      <Ionicons.Button
        name="md-share"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }} />
    )
  });

  render() {
    const {state} = this.props.navigation;
    let page = state.params.page;
    let html = null;
    if(page=='fav'){
      html = require('../fw/my_fav.html')
    }else{
      html = require('../fw/index.html')
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        
        <WebView
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
          source={html}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={this.receiveMessage.bind(this)}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={false} />
      </ScrollView>
    );
  }
  receiveMessage (e) {
    let message = e.nativeEvent.data
    if(message == 'aaa'){
      Alert.alert(message)
    }else{
      const {navigate} = this.props.navigation;
      navigate('SearchPage');
    }
  }
  renderHeader () {
    return (
      <View>
        <Image style={{width:width,height:160}} source={require('../imgs/indeximg_02.jpg')}/>
        <View style={{position:'absolute',justifyContent :'center' , alignItems : 'flex-end',   bottom:0,width:width,backgroundColor:'rgba(0,0,0,0.3)',height:34}}>
          <Text style={{color:'#fff',fontSize:12,marginRight:10}}>移动互联网时代的家装风格能力创新</Text>
        </View>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
});
/*
  {this.renderHeader()}
        <View style={{marginTop:5}}>
          <IconDetail/>
        </View>
*/