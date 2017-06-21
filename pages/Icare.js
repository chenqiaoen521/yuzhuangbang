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
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
export default class Icare extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
    ),
    headerRight: navigation.state.params.id===3 ? (
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Icons.Button
        name="ios-add"
        backgroundColor="transparent"
        underlayColor="transparent"
        size={30}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('addFriend');
        }}
      />
        <Icon.Button
        name="bell-o"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }}
      />

      </View>
    ):(
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
   });
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }
  componentDidMount () {
    const data = require('../data/friend.js')
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(data.data)
    })
    
  }
  renderOptionRow (rowData, rowID, highlighted) {
    return (
      <View style={{flexDirection:'row',alignItems: 'center',height:40, justifyContent : 'center',backgroundColor:highlighted ? '#ae8300':'#333333'}}>
        <Text style={{color:'#fff',fontSize:14}}>{rowData}</Text>
      </View>
      )
  } 
  renderSeparator(){
    return (
      <View style={{width:width,height:1,backgroundColor:'#555555'}}></View>
      )
  }
  render() {
    return (
        <View style={styles.container}>  
          <ModalDropdown 
          style={styles.dropdowns} 
          textStyle ={styles.dropdowntxt} 
          dropdownStyle={styles.dropdownd}
          defaultIndex={-1}
          options={['客户', '设计师','商户']}
          renderSeparator={()=>this.renderSeparator()}
          renderRow={(rowData, rowID, highlighted)=>this.renderOptionRow(rowData, rowID, highlighted)}
          >
            <View style={styles.title}>
              <View style={styles.left}>
                <Image style={{width:15,height:15,marginRight:10}} source={require('../imgs/shaixuan.png')}/>
                <Text style={{color:'#adadad',fontSize:14}}>筛选</Text>
              </View>
              <View style={styles.right}>
                <Icon name="angle-down" size={20}  color="#b6b6b6" />
              </View>
            </View>
          </ModalDropdown>
          <ListView
               dataSource={this.state.dataSource}
               renderRow={(rowdata)=>this.renderRow(rowdata)}
               contentContainerStyle={styles.contentViewStyle}
               enableEmptySections={true}
               initialListSize ={1}
          />
        </View>                                               
    );
  }
  renderRow(rowdata) {
    return (
      <View style={{flexDirection:"row",alignItems:'center',padding:10,marginBottom:1,backgroundColor:'#1b1b1b'}}>
        <Image style={{width:44,height:44,borderRadius:22,marginRight:10}} source={rowdata.icon}/>
        <Text style={{fontSize:12,color:'#cccccc'}}>{rowdata.name}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  contentViewStyle:{
    marginTop:8
  },
  title:{
    flexDirection:'row',
    height:60,
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#1b1b1b',
    paddingLeft:10,
    paddingRight:10
  },
  left:{
    flexDirection:'row',
    alignItems:'center'
  },
  dropdowns:{
    
  },
  dropdowntxt:{
   
  },
  dropdownd:{
    width:width,
    borderColor:'#000',
    backgroundColor:'transparent'
  }
});
