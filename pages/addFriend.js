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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class AddFriend extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
  }
  static navigationOptions = {
    headerTitle:'添加好友'
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderSearch()}
        {this.renderResult()}
      </View>
    );
  }
  renderSearch () {
    return (
      <View style={styles.search}>
        <Ionicons 
          name="ios-search" 
          color='#666666'
          size={25}
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.8}/>
          <TextInput 
            underlineColorAndroid="transparent" 
            style={{color:'#cccccc',marginLeft:10,padding:0,width:200,textAlign:'left',fontSize:15,}} 
            placeholder  = {'输入对方账号进行查找'}
            placeholderTextColor = '#666666'
          />
      </View>
      )
  }

  renderResult () {
    return (
      <TouchableOpacity onPress={this._abc.bind(this)} >
        <View style={{flexDirection:"row",alignItems:'center',padding:10,marginBottom:1,backgroundColor:'#151515'}}>
          <Image style={{width:44,height:44,borderRadius:22,marginRight:10}} source={require('../imgs/yihan.jpg')}/>
          <Text style={{fontSize:12,color:'#cccccc'}}>{'艾若溪河(7558484939)'}</Text>
        </View>
      </TouchableOpacity>
      )
  }
  _abc () {
     const {navigate} = this.props.navigation;
    navigate('addFriendDetail');
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  search:{
    flexDirection:'row',
    alignItems:'center',
    height:55,
    paddingLeft:10,
    backgroundColor:'#1b1b1b',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderBottomColor:'#262626',
    borderTopColor:'#262626',
    marginBottom :20
  }
});
