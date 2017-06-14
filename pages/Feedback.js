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
export default class Feedback extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };

  }
  static navigationOptions = {
    title:'意见反馈',
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
  render() {
    return (
      <View style={styles.container}>

          <TextInput
            placeholderTextColor="#515151"
            placeholder="请输入您的反馈内容"
            multiline={true}
            style={styles.inputStyle}
             numberOfLines = {10}
            underlineColorAndroid="transparent"
            onEndEditing={(event) => this.updateText(
              'onEndEditing text: ' + event.nativeEvent.text
            )}
        />

        <Text style={styles.textStyle}>请详细描述您遇到的问题，有助于我们快速定位并解决问题</Text>
        <TouchableOpacity style={styles.tj}>
          <Text style={{color:'#fff',width:width,textAlign:'center'}}>提交</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
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
    height:200,
    width:width,
    backgroundColor:'#1b1b1b',
    color:'#515151',
    fontSize: 15,
    padding: 4,
    marginBottom: 10,
    textAlignVertical: "top"
  },
  textStyle:{
    color:'#6b6b6b',
    padding:10,
    lineHeight:20
  }
});
