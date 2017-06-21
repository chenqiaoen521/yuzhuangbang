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
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';
import CenterItem from '../Components/CenterItem';
export default class Center extends Component {
  static navigationOptions = {
    headerTitle:'个人中心',
    title:'个人中心',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
    ),
    headerRight: (
      <Ionicons.Button
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
          {this.renderHead()}
          <View style={{flexDirection:'row',alignItems : 'center',justifyContent : 'center',
          marginTop:15}}>
            {this.renderHeadBottom()}
          </View>
          <View style={{marginTop:15}}>
            <Notice titleColor="#333333" bgcolor="#f7f7f7" rightBar="#838383" />
          </View>
          <View style={styles.middle}>
            <CenterItem popToCenter={()=>this.tomyhome()} icon={require('../imgs/middle_01.png')} txt="我的主页"/>
            <CenterItem popToCenter={()=>this.towork()} icon={require('../imgs/middle_07.png')} txt="商品管理"/>
            <CenterItem popToCenter={()=>this.toBlack()} icon={require('../imgs/middle_02.png')} txt="黑名单"/>
            <CenterItem popToCenter={()=>this.toPartment()} icon={require('../imgs/middle_03.png')} txt="部门管理"/>
            <CenterItem  popToCenter={()=>this.toSub()} icon={require('../imgs/middle_04.png')} txt="子账号管理"/>
            <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}>
            </View>
            <CenterItem popToCenter={()=>this.toMessage()} icon={require('../imgs/middle_05.png')} txt="我的消息"/>
            <CenterItem popToCenter={()=>this.toFav()} icon={require('../imgs/middle_05.png')} txt="我的收藏"/>
            <CenterItem popToCenter={()=>this.toSetting()} icon={require('../imgs/middle_06.png')} txt="设置"/>
            <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:50}}>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  toSetting(){
    const {navigate} = this.props.navigation;
    navigate('Settings');
  }
  tomyhome(){
    const {navigate} = this.props.navigation;
    navigate('MainDetail',{page:'myhome',title:'我的主页'});
  }
  toSub(){
    const {navigate} = this.props.navigation;
    navigate('account');
  }
  toPartment () {
    const {navigate} = this.props.navigation;
    navigate('MainDetail',{page:'part',title:'部门管理'});
  }
  toFav(){
    const {navigate} = this.props.navigation;
    navigate('MainDetail',{page:'fav',title:'我的收藏'});
  }
  toBlack(){
    const {navigate} = this.props.navigation;
    navigate('blackList');
  }
  toMessage () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
  towork () {
    const {navigate} = this.props.navigation;
    navigate('WorkManage');
  }
  renderHead(){
    return(
    <View style={{
      alignItems:'center',
    }}>
      <Image style={{width:62,height:62,borderRadius:31,marginTop:10,marginBottom:15}} source={require('../imgs/yihan.jpg')}/>
      <View style={{flexDirection : 'row',alignItems:'center'}}>
        <Text style={{color:'#cccccc',fontSize:16}}>东易力天装饰公司</Text>
        <Text style={{marginLeft:10,width:36,borderRadius:2,padding:1, color:'#fff',fontSize:10,backgroundColor:'#ae8300',textAlign:'center'}}>商户</Text>
      </View>
    </View>
    )
  }
  renderHeadBottom () {
    let arr = [];
    let itemData = [
    {'icons':require('../imgs/center_02.png'),myname:'我关心的',cont:52,id:1},
    {'icons':require('../imgs/center_04.png'),myname:'关心我的',cont:103,id:2},
    {'icons':require('../imgs/center_01.png'),myname:'我的好友',cont:152,id:3},
    {'icons':require('../imgs/center_03.png'),myname:'我的客户',cont:11,id:4}]
    itemData.map((item,i) => {
      arr.push(
        <View key={i}>
          <TouchableOpacity TouchableOpacity={0.5} onPress={()=>{item.id==4? this.props.navigation.navigate('MainDetail',{page:'custom',title:item.myname}): this.props.navigation.navigate('Icare',{title:item.myname,id:item.id})}}  style={styles.headerBottom}>
            <Image resizeMode={Image.resizeMode.center} style={{width:width/4,height:20}} source={item.icons}/>
            <Text style={{color:'#ccc',fontSize:14,marginTop:6,marginBottom:6}}>{item.myname}</Text>
            <Text style={{color:'#ccc',fontSize:12}}>{item.cont}</Text>
          </TouchableOpacity>
        </View>
        )
    })
    return arr
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  headerBottom:{
      width:width/4,
      alignItems:'center',
  },
  middle:{
    backgroundColor:'#f7f7f7',
  }
});
