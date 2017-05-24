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
  Switch
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit'
export default class PersonInfo extends Component {
  static navigationOptions = {
    title:'个人资料',
    headerRight: (
      <Icon.Button
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
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Unit topColor="#5a5a5a" bgColor="#282828" txtCol="#999999" icon={require('../imgs/yihan.jpg')} title="头像"/>
        <Unit topColor="#5a5a5a" bgColor="#282828" txtCol="#999999" title="姓名" rightTxt="刘德华"/>
        <Unit topColor="#5a5a5a" bgColor="#282828" txtCol="#999999" title="昵称" rightTxt="北七"/>
          <Unit topColor="#5a5a5a" bgColor="#282828" txtCol="#999999" title="手机号" rightTxt="158****2135"/>
        <View style={{marginTop:10}}>
          <Unit topColor="#5a5a5a" bgColor="#282828" txtCol="#999999" title="性别" rightTxt="男"/>
          <Unit topColor="#5a5a5a" bgColor="#282828" txtCol="#999999" title="地区" rightTxt="北京 朝阳区"/>
        </View>
      </ScrollView>
      </View>
    );
  }
  toInfo () {
    const {navigate} = this.props.navigation;
    navigate('personInfo');
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515'
  },
  unitStyle:{
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems :'center',
    justifyContent :'space-between',
    padding:10,
    paddingTop:12,
    paddingBottom:12,
    borderBottomColor:'#e5e5e5',
    borderBottomWidth:0.5
  }
});
