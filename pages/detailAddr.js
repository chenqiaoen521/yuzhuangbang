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
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
export default class DetailAddr extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      modalVisible:false,
      trueSwitchIsOn:false
    };
    //三级联动
    this.rowIndex0 = 0;
    this.rowIndex1 = 0;
    this.rowIndex2 = 0;
  }
  static navigationOptions = {
    headerTitle:'地址详情',
    headerRight: (<View></View>),
    /*headerRight: (
      <Icon.Button
        name="bell-o"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => {
          navigation.state.params.handleShare();
        }}
      />
    )*/
  }
  checkArea(){
    this.setState({
      modalVisible:true
    })
  }
  render() {
    let that = this 
    return (
      <View style={styles.container}>
        <View style={styles.unit}> 
          <TouchableOpacity onPress={()=>this.checkArea()} style={styles.left}>
            <TextInput
              placeholderTextColor="#cccccc"
              editable={false}
              placeholder="所在地区"
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
            />
          </TouchableOpacity>
          <View style={styles.right}>
            <Icon name="angle-right" size={25} color="#b6b6b6" />
          </View>
        </View>
        {that.renderItem("十里铺街")}
        {that.renderItem("商都路与中州大道交叉口建业五栋大...")}
        {this.renderDefault()}
        {this.renderPicker()}
      </View>
    );
  }
  renderDefault () {
    return (
      <View style={[styles.unit,{paddingLeft:10,height:50,marginTop:10}]}> 
          <View style={styles.left}>
            <Text style={{color:'#cccccc'}}>设为默认地址</Text>
          </View>
          <View style={styles.right}>
            <Switch value={this.state.trueSwitchIsOn} thumbTintColor="#ffffff"  onValueChange={(value) => this.setState({trueSwitchIsOn: value})} onTintColor="#c9c9c9"/>
          </View>
        </View>
      )
  }
  renderItem(name){
    return (
      <View style={styles.unit}> 
          <View style={styles.left}>
            <TextInput
              placeholderTextColor="#cccccc"
              placeholder={name}
              style={styles.inputStyle}
              multiline={true}
              underlineColorAndroid="transparent"
              onEndEditing={(event) => {event.nativeEvent.text}}
            />
          </View>
          <View style={styles.right}>
            <Icon name="angle-right" size={25} color="#b6b6b6" />
          </View>
        </View>
      )
  }
  renderPicker () {
    return (
       <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.popmsg}>
            <View style={styles.biao}>
              <TouchableOpacity onPress={()=>this.cancelModal()}><Text style={styles.biaoti}>取消</Text></TouchableOpacity>
              <Text style={styles.biaoti}>所在地区选择</Text>
              <TouchableOpacity onPress={()=>this.cancelModal()}><Text style={styles.biaoti}>确定</Text></TouchableOpacity>
            </View>
              <View style = {styles.kinda}>
                  <View style = {styles.ktext}><Text style = {styles.ktxt}>省份</Text></View>
                  <View style = {styles.ktext}><Text style = {styles.ktxt}>市/区</Text></View>
                  <View style = {styles.ktext}><Text style = {styles.ktxt}>区县</Text></View>
              </View>
              <View style = {{height: height*0.55-144, flexDirection: 'row'}}>
                <View style = {{flex: 1}}>
                  <Picker 
                    data = {cityCode.CityZoneCode.China.Province}
                    ref = '_Picker0'
                    name = 'name'
                    onRowChange = {index => {
                        this.rowIndex0 = index; 
                        this.rowIndex1 = 0; 
                        this.rowIndex2 = 0; 
                        this.refs._Picker1.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City); 
                        this.refs._Picker2.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City[0].Area)}}
                  />
                </View>
                <View style = {{flex: 1}}>
                    <Picker 
                        data = {cityCode.CityZoneCode.China.Province[0].City} 
                        ref = '_Picker1'
                        name = 'name'
                        onRowChange = {index => {
                            this.rowIndex1 = index; 
                            this.rowIndex2 = 0; 
                            this.refs._Picker2.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area)}}
                    />
                </View>
                <View style = {{flex: 1}}>
                    <Picker 
                        data = {cityCode.CityZoneCode.China.Province[0].City[0].Area}
                        ref = '_Picker2'
                        name = 'name'
                        onRowChange = {index => this.rowIndex2 = index}
                    />
                </View>
              </View>
            </View>
        </Modal>
      )
  }
  cancelModal () {
    this.setState({
      modalVisible:false
    })
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  unit:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:8,
    backgroundColor:'#282828',
    borderBottomColor:'#151515',
    borderBottomWidth:1
  },
  left:{

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
  inputStyle:{
    width:width*0.9,
    color:'#cccccc',
  },
  popmsg: {
    height:0.55*height,
    backgroundColor:'#fff',
    borderRadius:10,
    position:'absolute',
    bottom:0
    },
  biao: {
      flexDirection:'row',
      justifyContent : 'space-around',
      alignItems:'center',
      borderBottomWidth:1,
      borderBottomColor:'#eee',
      paddingTop:12,
      paddingBottom:12,
      width:width,
  },
  biaoti: {
        fontSize:16,
        color:'#666',
  },
  kinda: {
        height:34,
        flexDirection: 'row',
    },
    ktext: {
        flex:1,
        width:width%3,
        alignItems:'center',
        justifyContent:'center',
    },
    ktxt: {
        color:'#333',
        fontSize:15,
    },
});
