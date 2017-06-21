/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
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
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var swipeoutBtns = [
  {
    text: '删除',
    color:'#fff',
    backgroundColor:'#eb0b0b',
    onPress:function(){ alert('button pressed') }
  },
  {
    text: '编辑',
    color:'#fff',
    backgroundColor:'#ae8300'
  }
]
export default class Account extends Component {
  static navigationOptions = {
    headerTitle:'子账号管理',
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
  componentDidMount () {

  }
  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            {this.renderItem()}
          </ScrollView>
          <TouchableOpacity onPress={this.toSetting.bind(this)} style={styles.add}>
            <Text style={{color:'#fff'}}>
              添加子账号
            </Text>
          </TouchableOpacity>
        </View>                                               
    );
  }
  renderItem(){
    let that = this;
    let arr = [];
    for(let i=0;i<5;i++){
      arr.push(
        <Swipeout key={i} right={[
          {
            text: '删除',
            color:'#fff',
            backgroundColor:'#eb0b0b',
            },
          {
            text: '编辑',
            color:'#fff',
            backgroundColor:'#ae8300',
            onPress:function(){ that.toBian() }
          }    
            ]} style={styles.swipe} autoClose={true} backgroundColor="#1b1b1b">
          <View style={styles.unit}>
            <Image
              style={styles.img}
              source={require('../imgs/yihan.jpg')}
            />
            <Text style={styles.txt}>陈晓明{i}</Text>
          </View>
        </Swipeout>
        )
    }
    return arr;
  }
  toSetting(){
    const {navigate} = this.props.navigation;
    navigate('accountAdd',{title:'添加子账号',isAdd:true});
  }
  toBian(){
    const {navigate} = this.props.navigation;
    navigate('accountAdd',{title:'编辑子账号',isAdd:false});
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  add:{
    backgroundColor:'#ae8300',
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  swipe:{
    marginBottom :5
  },
  unit:{
    flexDirection:'row',
    height:50,
    alignItems:'center',
  },
  img:{
    width:40,
    height:40,
    borderRadius:20,
    marginLeft:10,
    marginRight:10
  },
  txt:{
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10,
    color:'#cccccc'
  }
});
