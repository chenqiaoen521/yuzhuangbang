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
  Modal
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class About extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };

  }
  static navigationOptions = {
    headerTitle:'关于我们',
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
        <View style={{alignItems : 'center',marginTop:20,marginBottom:20, paddingLeft:12, paddingRight:12,}}>
          <Image 
           source={require('../imgs/yu.png')}
           style={styles.img}/>
        </View>
        <Text style={styles.title}>简单介绍</Text>
        <Text style={styles.introduce}>豫装帮浏览自己的个人主页的产品瀑布显示（标题简介、
转载次数、收藏次数、主页申请红色按钮、编辑、删除、以发
布\未发布，（未发布的产品，他人不可查看，
已发布的产品，要有浏览量的显示）   浏览他人的个人主页，查看到的产品瀑布中</Text>
        <View style={styles.bg}>
          <Image style={{width:width,height:150}}
           source={require('../imgs/bg.png')}
           />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  title:{
    color:'#ae8300',
    textAlign:'center',
    fontSize:18 ,
    paddingLeft:12, 
    paddingRight:12,
  },
  bg:{
    position:'absolute',
    bottom:0
  },
  img:{
    width:130,
    height:135,
  },
  introduce:{
    color:'#636363',
    textAlign : 'center',
    fontSize:12,
    lineHeight :22,
    marginTop :20 ,
    paddingLeft:12, 
    paddingRight:12,
  }
});
