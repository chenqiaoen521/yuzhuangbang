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
  Platform,
  ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class AddressPage extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      addrList: []
    };
  }
  static navigationOptions = {
    headerTitle:'我的地址',
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
    const data = require('../pages/message.json')
    this.setState({
      addrList:data.addrs
    })
    
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.state.addrList)}
          renderRow={(rowdata)=>this.renderRow(rowdata)}
          contentContainerStyle={styles.contentViewStyle}
          enableEmptySections={true}
        />
        <TouchableOpacity style={styles.tj}>
          <Text style={{color:'#fff',width:width,textAlign:'center'}}>添加我的地址</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderRow(rowdata){
    let wH = rowdata.isDefault?{width:width*0.73}:{width:width*0.88}
    return (
      <TouchableOpacity style={styles.unit} onPress={()=>this.toDetail()}>
        <View style={[styles.left,wH]}>
          {
            this.renderDefault(rowdata.isDefault)
          }
          <Text style={styles.txt}>{rowdata.title}</Text>
        </View>
        <View style={styles.right}>
          <Icon name="angle-right" size={25} color="#b6b6b6" />
        </View>
      </TouchableOpacity>
      )
  }
  toDetail(){
    const {navigate} = this.props.navigation;
    navigate('detailAddr');
  }
  renderDefault(flag) {
    if(flag){
      return (
        <Text style={styles.isMoren}>[默认]</Text>
        )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  contentViewStyle:{

  },
  unit:{
    flexDirection:'row',
    justifyContent : 'space-between',
    alignItems:'center',
    padding:10,
    backgroundColor:'#282828',
    borderBottomWidth:1,
    borderBottomColor:'#151515'
  },
  tj:{
    justifyContent : 'center',
    alignContent : 'center',
    height:45,
    width:width,
    position:'absolute',
    bottom:0,
    backgroundColor:'rgba(174,131,0,0.9)'
  },
  isMoren:{
    color:'#ae8300',
    lineHeight:22,
    fontSize:14,
    marginRight:6
  },
  left:{
    width:width*0.73,
    flexDirection:'row',
    alignItems : 'flex-start'
  },
  txt:{
    color:'#666666',
    fontSize:13,
    lineHeight:22
  }
});
