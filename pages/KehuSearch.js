/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
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
    ScrollView,
    WebView
} from 'react-native';
var {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import KehuList from '../Components/KehuList';

export default class Center extends Component {
    static navigationOptions = {
        headerRight: (
            <View style={{ width:width-60, borderBottomWidth:1, borderBottomColor:'#ae8300', flexDirection:'row', justifyContent:'space-between',
                alignItems:'center', height:40, }}>
                <View style={{ width:30, paddingLeft:5, justifyContent:'center',alignItems:'center'}}>
                    <Icons.Button name="md-search" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8} 
                        style={{padding:0}} />
                </View>
                <TextInput placeholderTextColor="#777" underlineColorAndroid="transparent" placeholder='请输入关键字'
                    style={{ width:width-95, color:'#777', fontSize:15, textAlign:'left', padding:0, }} />
            </View>   
        )
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            IsResult: true,      //单选内容
        };
        
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.IsResult===false ? 
                        <View style={{width:width,}}>
                            <Image resizeMode={'center'} style={[styles.bmid,{ width:width},{ marginTop:80}]} source={require('./../imgs/bgtext_03.png')}>
                                <Text style={styles.etext}>输入搜索指定客户以及信息</Text>
                            </Image>
                        </View>
                        :
                        <KehuList popToWatch={ ()=> this.Goxq() } />
                    }
                </ScrollView>    
            </View>
        );
    }
    Goxq (){
        const {navigate} = this.props.navigation;
        navigate('Kehu',{page:'xq',title:'客户详情'});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    bmid: {
        alignItems:'center',
        justifyContent:'center',
    },
    etext: {
        fontSize:15,
        color:'#999',
    }
    
    
    
});
