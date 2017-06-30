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
import store from 'react-native-simple-store';
const host = require('../config.json').url;
const token = require('../config.json').token;
export default class CenterPT extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sex:null,
      avatar:null,
      name:null,
      nickname:null,
      phone:null,
      province:null,
      city:null,
      area:null
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle:'个人中心',
    title:'个人中心',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
    ),
    headerRight: (
      <Ionicons.Button name="bell-o" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
        onPress={() => { navigation.state.params.handleShare(); }} />
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderHead()}
          <View style={{flexDirection:'row',alignItems : 'center',justifyContent : 'space-around',
          marginTop:15}}>
            {this.renderHeadBottom()}
          </View>
          <View style={{marginTop:15}}>
            <Notice titleColor="#333333" bgcolor="#f7f7f7" rightBar="#838383" />
          </View>
          <View style={styles.middle}>
            <CenterItem popToCenter={()=>this.toOpen()} icon={require('../imgs/middle_08.png')} txt="我要开店"/>
            <CenterItem popToCenter={()=>this.toMessage()} icon={require('../imgs/middle_05.png')} txt="我的消息"/>
            <CenterItem popToCenter={()=>this.toFav()} icon={require('../imgs/middle_09.png')} txt="我的收藏"/>
            <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}>
            </View>
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
  toFav(){
    const {navigate} = this.props.navigation;
    navigate('MainDetail',{page:'fav',title:'我的收藏'});
  }

  toMessage () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
  toOpen () {
    const {navigate} = this.props.navigation;
    navigate('CreatShop');
  }
  componentDidMount() {
    this.props.navigation.setParams({ handleShare: this.onActionSelected });
  }
  onActionSelected () {
    alert();
  }
  componentWillMount () {
    let data = this.getData();
    data.then((result)=>{
        this.setState({
            sex: result.user_info.sex,
            avatar:result.user_info.avatar,
            name:result.user_info.name,
            nickname:result.user_info.nickname,
            phone:result.user_info.phone,
            province:result.user_info.province,
            city:result.user_info.city,
            area:result.user_info.area
        })
    })
    }
    async getData() {
        try {   
          let response = await fetch(`${host}/App/Center/get_user_info?token=${token}`);
          let responseJson = await response.json();
          return responseJson.data;
        } catch(error) {
            console.error(error);
        }
    }
  renderHead(){
    return(
    <View style={{
      alignItems:'center',
    }}>
      <Image style={{width:62,height:62,borderRadius:31,marginTop:10,marginBottom:15}} source={{uri:`${host}${this.state.avatar}`}}/>
      <View style={{flexDirection : 'column',alignItems:'center'}}>
        <Text style={{color:'#cccccc',fontSize:16}}>{this.state.name}</Text>
        <Text style={{textAlign:'center',color:'#999999',fontSize:13,marginTop:5}}>{this.state.phone}</Text>
      </View>
    </View>
    )
  }
  renderHeadBottom () {
    let arr = [];
    let itemData = [
    {'icons':require('../imgs/center_02.png'),myname:'我关心的',cont:52,id:1},
    {'icons':require('../imgs/center_04.png'),myname:'关心我的',cont:103,id:2},
    {'icons':require('../imgs/center_01.png'),myname:'我的好友',cont:152,id:3}]
    itemData.map((item,i) => {
      arr.push(
        <View key={i}>
          <TouchableOpacity TouchableOpacity={0.5} onPress={()=>{item.id==4? this.props.navigation.navigate('Kehu',{page:'custom',title:item.myname}): this.props.navigation.navigate('Icare',{title:item.myname,id:item.id})}}  style={styles.headerBottom}>
            <Image style={{width:26,height:22}} source={item.icons}/>
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