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
} from 'react-native';
var {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';

export default class Center extends Component {
    static navigationOptions = {
        title:'客户添加',
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
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:'',
            index:0,
            textadr:'请选择公司所在地区'
        };
        
        //单选框
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>姓名</Text>
                        <TextInput style={styles.minput} placeholderTextColor="#777" underlineColorAndroid="transparent" placeholder='张嘉译' />
                    </View>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>手机号</Text>
                        <TextInput style={styles.minput} placeholderTextColor="#777" underlineColorAndroid="transparent" placeholder='15845672135' />
                    </View>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>性别</Text>
                        <RadioGroup style={{width:(width-30)*0.8,flexDirection:'row',justifyContent:'flex-end'}} thickness={0} size={12} thickness={1} activeColor='#af8402' color='#fff' selectedIndex={0} onSelect = {(index, value) => this.onSelect(index, value)} >
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'男'}> 
                                <Text style={{fontSize:13,color:'#777'}}>男</Text> 
                            </RadioButton>
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'女'} onPress={()=>alert(2)}> 
                                <Text style={{fontSize:13,color:'#777'}}>女</Text> 
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <View style={[styles.sg,{flexDirection:'column'}]}>
                        <Text style={[styles.sgtext,styles.all]}>详细地址</Text>
                        <TextInput style={[styles.minput,styles.all2]} multiline={true} placeholderTextColor="#777" 
                        underlineColorAndroid="transparent" 
                        placeholder='河南省郑州市中中州大道郑汴路交叉口建业五栋大楼B座701室' />
                    </View>
                </ScrollView>
                
                <TouchableOpacity>
                    <View style={styles.add}><Text style={styles.addt}>添加</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
    /*GoAdd (){
        const {navigate} = this.props.navigation;
        navigate('CreatShopWait') 
    }*/
    onSelect(index, value){
        if(index==0)
        {
            
        }
        
        this.setState({
            index:index,
            text: `Selected index: ${index} , value: ${value}`
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515',
    },
    xinxi: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10
    },
    sg: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:2,
        paddingBottom:2,
        paddingLeft:15,
        paddingRight:15,
        borderBottomWidth:1,
        borderBottomColor:'#222',
        backgroundColor:'#1b1b1b'
    },
    sgtext: {
        width:(width-30)*0.2,
        color:'#888',
        fontSize:14,
    },
    minput: {
        width:(width-30)*0.8,
        fontSize:14,
        color:'#777',
        textAlign:'right'
    },
    all: {
        width:width-30,
        paddingTop:8,
        textAlign:'left',
    },
    all2: {
        width:width-30,
        paddingTop:8,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:8,
        height:60,
        textAlign:'left',
        fontSize:13,
    },
    add: {
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ae8300',
    },
    addt: {
        color:'#fff',
        fontSize:14,
    }
    
    
    
});
