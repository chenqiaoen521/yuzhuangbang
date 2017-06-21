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
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
var {width,height} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Center extends Component {
    static navigationOptions = {
        headerTitle:'资料提交',
        headerRight: (
            <Icon.Button
                name="bell-o"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={ () => {  navigation.state.params.handleShare(); } }
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>姓名：</Text>
                    <TextInput style={styles.input} selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的名字' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>公司名称：</Text>
                    <TextInput style={styles.input} selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的公司名称' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>公司地址：</Text>
                    <TextInput style={styles.input} selectionColor="#fff" placeholderTextColor="#888" underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <TextInput style={styles.textinput} selectionColor="#fff" multiline={true} placeholderTextColor="#888" placeholder='请输入您公司的详细地址' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single2}>
                    <Text style={styles.midtext}>上传营业执照</Text>
                    
                </View>
            </View>
        );
    }
    //跳转
    Gocreat() {
        
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515'
    },
    single: {
        marginBottom:3,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'space-between',
        backgroundColor:'#1b1b1b',
        flexDirection:'row',  
        alignItems:'center',
        width:width,
    },
    lefttext: {
        color:'#ccc',
        fontSize:14,
        width:(width-30)*0.28,
    },
    midtext: {
        color:'#ccc',
        width:width-30,
        textAlign:'center'
    },
    input: {
        textAlign :'left',
        color:'#888',
        fontSize:13,
        width:(width-30)*0.72,
        height:34,
        paddingLeft:5,

    },
    textinput: {
        width:(width-30),
        fontSize:13,
        color:'#ccc',
        height:60,
        paddingLeft:0,
        paddingRight:0,

    },
    single2: {
        marginBottom:3,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        backgroundColor:'#1b1b1b',
        alignItems:'center',
    },
    
});
