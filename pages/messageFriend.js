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
  Modal,
  Platform
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class MessageFriend extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };

  }
  static navigationOptions = {
    headerTitle:'我的消息',
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
        <View style={styles.title}>
          <Text style={{color:'#cccccc',fontSize:24}}>好友申请</Text>
        </View>
        <View style={styles.unit}>
          <Image source={require('../imgs/yihan.jpg')} style={styles.left}/>
          <View style={styles.middle}> 
            <Text style={{color:'#cccccc',fontSize:15}}>东易力天装饰公司</Text>
            <Text style={{color:'#999999',fontSize:13,marginTop:4}}>业务员：王大锤</Text>
          </View>
          <TouchableOpacity style={styles.right}>
            <Text style={{color:'#292929',fontSize:13,backgroundColor:'#ae8300',padding:3,width:66,borderRadius:4,textAlign:'center'}}>查看</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.introduce}>
          <Text style={{color:'#999999',fontSize:14}}>请求加您为好友 :</Text>
          <Text style={{color:'#999999',fontSize:14,marginTop:5}}>我是东易力天装饰的业务员,我叫王大水。</Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn}t><Text style={[styles.btnTxt,{marginBottom:14, backgroundColor:'#1b1b1b',color:'#999999'}]}>拒绝</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn}><Text style={styles.btnTxt}>同意</Text></TouchableOpacity>
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
  btns:{
    marginTop :60
  },
  btn:{
   alignItems:'center'
  },
  btnTxt:{
    width:width*0.95,
    borderRadius:5,
    padding:10,
    textAlign:"center",
    backgroundColor:'#ae8300',
    color:'#fff'
  },
  introduce:{
    marginTop:30,
    paddingLeft:10,
    paddingRight:10,

  },
  title:{
    height:50,
    alignItems:'flex-start',
    paddingLeft:10,
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor:'#292929'
  },
  unit:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:25
  },
  left:{
    width:50,height:50,borderRadius:25
  }
});
