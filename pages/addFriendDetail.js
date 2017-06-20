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
export default class AddFriendDetail extends Component {
  static navigationOptions = ({ navigation }) => ({ 
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
  })
    
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderHead()}
          <View>
            <Notice titleColor="#333333" bgcolor="#f7f7f7" rightBar="#838383" browserCount="1001" title="变革的基因：移动互联网时代的组织能力创新"/>
          </View>
          <View style={styles.middle}>
            <View style={styles.unit}>
              <Text>账号信息</Text><Text>13203839726</Text>
            </View>
            <View style={styles.unit}>
              <Text>性别</Text><Text>女</Text>
            </View>
            <View style={[styles.unit,{justifyContent : 'flex-start',marginBottom:100}]}> 
              <Text>身份属性</Text><Text style={{fontSize:13,color:'#999999',marginLeft:40}}>设计师</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  renderHead(){
    return(
    <View style={{
      alignItems:'center',
      paddingBottom:36,
      backgroundColor:'#151515'
    }}>
      <Image style={{width:62,height:62,borderRadius:31,marginTop:10,marginBottom:15}} source={require('../imgs/yihan.jpg')}/>
      <View style={{flexDirection : 'column',alignItems:'center'}}>
        <Text style={{color:'#cccccc',fontSize:15}}>罗伯特.德尼罗</Text>
        <Text style={{color:'#858585',fontSize:13,marginTop:5,}}>15023245869</Text>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  headerBottom:{
      width:width/4,
      alignItems:'center',
  },
  middle:{
    backgroundColor:'#f7f7f7',
  },
  unit:{
    flexDirection:'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    height:50,
    backgroundColor:'#fff',
    borderTopColor:'#eeeeee',
    borderTopWidth:1,
    paddingLeft:10,
    paddingRight:10,
  }
});
