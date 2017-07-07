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
  Linking
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit'
export default class MyBlack extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:'我的黑名单'
  });
  componentDidMount() {
    this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
  }
  onActionSelected () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="客户黑名单" popToSetting={()=>this.toBlack(1)}/>
        <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="好友黑名单" popToSetting={()=>this.toBlack(2)}/>
      </ScrollView>
      </View>
    );
  }
  tel () {
    let url = 'tel:0371-0062887'
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      }else{
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  toBlack (flag) {
      const {navigate} = this.props.navigation;
    if(flag==1){
      navigate('blackList',{url:'/App/Center/my_contact_defriend'});
    }else{
      navigate('blackList',{url:'/App/Center/my_follow_defriend'});
    }
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515'
  },
  unitStyle:{
    backgroundColor:'#282828',
    flexDirection:'row',
    alignItems :'center',
    justifyContent :'space-between',
    padding:10,
    paddingTop:18,
    paddingBottom:18,
    borderBottomColor:'#151515',
    borderBottomWidth:0.5,
    marginBottom:100
  }
});
