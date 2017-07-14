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
  Alert,
  TouchableOpacity,
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import IconDetail from '../Components/IconDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingView from '../Components/LoadingView';
const host = require('../config.json').url;
export default class MainDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
    headerRight: (<View></View>),
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
    ),
    //headerRight:null
  });

  render() {
    const {state} = this.props.navigation;
    let {id,page} = state.params;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        
        <WebView
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
          source={{uri:`${host}${page}?id=${id}`}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={this.receiveMessage.bind(this)}
          decelerationRate="normal"
          renderLoading={this.renderLoading}
          startInLoadingState={true}
          scalesPageToFit={false} />
      </ScrollView>
    );
  }
  renderLoading() {
        return <LoadingView />;
    }
  receiveMessage (e) {
    let message = e.nativeEvent.data
    if(message == 'aaa'){
      Alert.alert(message)
    }else if(message == 'xq'){
      const {navigate} = this.props.navigation;
      navigate('MainDetail',{page:'xq',title:'客户详情'});
    }else if(message == 'cadd'){
      const {navigate} = this.props.navigation;
      navigate('MainDetail',{page:'cadd',title:'客户详情'});
    }else if(message == 'hmd'){
      const {navigate} = this.props.navigation;
      navigate('MainDetail',{page:'hmd',title:'加入黑名单'});
    }else if(message == 'lhlist'){
      const {navigate} = this.props.navigation;
      navigate('blackList');
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