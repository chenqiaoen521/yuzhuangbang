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
            <Notice titleColor="#333333" bgcolor="#f7f7f7" rightBar="#838383" browserCount="1001" title="变革的基因：移动互联网时代的组织能力创新"/>
          </View>
          <View style={styles.middle}>
            <CenterItem icon={require('../imgs/middle_01.png')} txt="我的主页"/>
            <CenterItem icon={require('../imgs/middle_02.png')} txt="商品管理"/>
            <CenterItem icon={require('../imgs/middle_02.png')} txt="黑名单"/>
            <CenterItem icon={require('../imgs/middle_03.png')} txt="部门管理"/>
            <CenterItem icon={require('../imgs/middle_04.png')} txt="子账号管理"/>
            <CenterItem popToCenter={()=>this.toMessage()} icon={require('../imgs/middle_05.png')} txt="我的消息"/>
            <CenterItem popToCenter={()=>this.toSetting()} icon={require('../imgs/middle_06.png')} txt="设置"/>
          </View>
        </ScrollView>
      </View>
    );
  }
  toSetting(){
    const {navigate} = this.props.navigation;
    navigate('Settings');
  }
  toMessage () {
    const {navigate} = this.props.navigation;
    navigate('Message');
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
    {'icons':require('../imgs/center_02.png'),myname:'我关心的',cont:52},
    {'icons':require('../imgs/center_04.png'),myname:'关心我的',cont:103},
    {'icons':require('../imgs/center_01.png'),myname:'我的好友',cont:152},
    {'icons':require('../imgs/center_03.png'),myname:'我的客户',cont:11}]
    itemData.map((item,i) => {
      arr.push(
        <View key={i}>
          <TouchableOpacity TouchableOpacity={0.5}  style={styles.headerBottom}>
            <Image resizeMode={Image.resizeMode.center} style={{width:width/4,height:20}} source={item.icons}/>
            <Text style={{color:'#cccccc',fontSize:14,marginTop:6,marginBottom:6}}>{item.myname}</Text>
            <Text style={{color:'#cccccc',fontSize:12}}>{item.cont}</Text>
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
    backgroundColor:'#fff'
  }
});
