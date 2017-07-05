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
  DatePickerIOS
} from 'react-native';
var {width,height} = Dimensions.get('window');


import Icon from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';

 
import DateTimePicker from 'react-native-modal-datetime-picker';
//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';

export default class Center extends Component {
    static navigationOptions = {
        title:'添加客户',
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
            text:0,
            index:0,
            text2:0,
            index2:0,
            text3:0,
            index3:0,
            isDateTimePickerVisible: false, 
            riqi:'2016-10-26',
            //传递
            pername:'',
            perphone:'',
            persex:1,
            peradress:'',
            pertime:'',
            pertype:1,
            pershename:'',
            perxiang:'',
            flag:1,
            token:''
        };
        
        //单选框
        this.onSelect = this.onSelect.bind(this)
        this.onSelect2 = this.onSelect2.bind(this)
        this.onSelect3 = this.onSelect3.bind(this)
    }

    //时间选择
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date )
        var result = this.SwitchDate(date)
        this.setState({ riqi: result })
        this._hideDateTimePicker()
    };
    SwitchDate(date) {
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours(); 
        h = h < 1 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        //return y + '-' + m + '-' + d+' '+h+':'+minute;  
        var second = date.getSeconds();  
        second = second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + d+' '+h +':'+minute+':'+second;    
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>姓名</Text>
                        <TextInput style={styles.minput} onChangeText={ (text) => this.setState({pername:text}) } placeholderTextColor="#777" underlineColorAndroid="transparent" placeholder='张嘉译' />
                    </View>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>手机号</Text>
                        <TextInput style={styles.minput} onChangeText={ (text) => this.setState({perphone:text}) } placeholderTextColor="#777" underlineColorAndroid="transparent" placeholder='15845672135' />
                    </View>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>性别</Text>
                        <RadioGroup style={styles.radios} thickness={0} size={12} thickness={1} activeColor='#af8402' color='#fff' selectedIndex={0} onSelect = {(index, value) => this.onSelect(index, value)} >
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'男'}> 
                                <Text style={{fontSize:13,color:'#777'}}>男</Text> 
                            </RadioButton>
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'女'} onPress={()=>alert(2)}> 
                                <Text style={{fontSize:13,color:'#777'}}>女</Text> 
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>需求</Text>
                        <RadioGroup style={styles.radios} thickness={0} size={12} thickness={1} activeColor='#af8402' color='#fff' selectedIndex={0} onSelect = {(index, value) => this.onSelect2(index, value)} >
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'居住型'}> 
                                <Text style={{fontSize:13,color:'#777'}}>居住型</Text> 
                            </RadioButton>
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'商用型'} onPress={()=>alert(2)}> 
                                <Text style={{fontSize:13,color:'#777'}}>商用型</Text> 
                            </RadioButton>
                        </RadioGroup>
                    </View>
                    <View style={styles.sg}>
                        <Text style={styles.sgtext}>接触时间</Text>
                        {/*<TextInput  style={styles.minput}  placeholderTextColor="#777" underlineColorAndroid="transparent" />*/}
                        <TouchableOpacity onPress={()=>this._showDateTimePicker()} >
                            <View style={[styles.minput2,{alignItems:'flex-end'},{justifyContent:'center'}]}>
                                <Text style={{fontSize:14, width:(width-30)*0.75, color:'#777',textAlign:'right'}} >{this.state.riqi}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    { this.state.index2==0 ?
                    (<View style={styles.sg}>
                        <Text style={styles.sgtext}>小区名称</Text>
                        <TextInput style={styles.minput} onChangeText={ (text) => this.setState({pershename:text}) } placeholderTextColor="#777" underlineColorAndroid="transparent" placeholder='欢乐颂小区' />
                    </View>)
                    : 
                    (<View style={styles.sg}>
                        <Text style={styles.sgtext}>项目类型</Text>
                        <RadioGroup style={styles.radios} thickness={0} size={12} thickness={1} activeColor='#af8402' color='#fff' selectedIndex={0} onSelect = {(index, value) => this.onSelect3(index, value)} >
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'酒店'}> 
                                <Text style={{fontSize:13,color:'#777'}}>酒店</Text> 
                            </RadioButton>
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'餐饮'} onPress={()=>alert(2)}> 
                                <Text style={{fontSize:13,color:'#777'}}>餐饮</Text> 
                            </RadioButton>
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'酒吧'} onPress={()=>alert(2)}> 
                                <Text style={{fontSize:13,color:'#777'}}>酒吧</Text> 
                            </RadioButton>
                        </RadioGroup>
                    </View>)
                    }
                    <View style={[styles.sg,{flexDirection:'column'}]}>
                        <Text style={[styles.sgtext,styles.all]}>详细地址</Text>
                        <TextInput style={[styles.minput,styles.all2]}  onChangeText={ (text) => this.setState({peradress:text}) } 
                        multiline={true} placeholderTextColor="#777" 
                        underlineColorAndroid="transparent" 
                        placeholder='河南省郑州市中中州大道郑汴路交叉口建业五栋大楼B座701室' />
                    </View>
                    
                    {/*<Text style={{color:'#999'}}>{this.state.text}{'\n'}{this.state.text2}{'\n'}{this.state.text3}</Text>*/}
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />  
                </ScrollView>
                
                <TouchableOpacity onPress={ ()=> this.addbtn() }>
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
        this.setState({
            index:index,
            text: `Selected index: ${index} , value: ${value}`
        })
        if(index==0){
            this.setState({ persex:1 })
        }else{
            this.setState({ persex:2 })
        }
    }
    onSelect2(index, value){ 
        this.setState({
            index2:index,
            text2: `Selected index: ${index} , value: ${value}`
        })
        if(index==0){
            this.setState({ flag:1,pertype:1 })
        }else{
            this.setState({ flag:2,pertype:2 })
        }
    }
    onSelect3(index, value){ 
        this.setState({
            index3:index,
            text3: `Selected index: ${index} , value: ${value}`,
            perxiang:value
        })

    }

    //添加按钮
    addbtn() {
        var that = this
        store.get('user').then(
            function(data){
                /*that.setState({
                    token:data.token,
                }); */ 
                   
                that.Doadd(
                    data.token,
                    that.state.pername,
                    that.state.perphone,
                    that.state.persex,
                    that.state.peradress,
                    that.state.pertime,
                    that.state.pertype,
                    that.state.pershename,
                    that.state.perxiang
                )
                        
            })
        
    }
    async Doadd(token,name,phone,sex,adress,time,type,area,xiang) {
        var that = this
        if(that.state.flag==1){
            try {
                let response = await fetch(`${url}/App/Role/add_edit_contact`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:`phone=${phone}&token=${token}&contact_name=${name}&sex=${sex}&address=${adress}&touch_time=${time}&contact_type=${type}&area=${area}`
                });
                let responseJson = await response.json();
                if(responseJson.errorCode===0){
                    ToastUtil.showShort('添加成功')
                    console.log(responseJson)
                    return responseJson;
                }else{
                    console.log(responseJson)
                    ToastUtil.showShort(responseJson.errorMsg,true)
                }
            } catch(error) {
                console.error(error);
                ToastUtil.showShort(error,true)
            }

        }else{
            try {
                let response = await fetch(`${url}/App/Role/add_edit_contact`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:`phone=${phone}&token=${token}&contact_name=${name}&sex=${sex}&address=${adress}&touch_time=${time}&contact_type=${type}&project=${xiang}`
                });
                let responseJson = await response.json();
                if(responseJson.errorCode===0){
                    ToastUtil.showShort('添加成功')
                    console.log(responseJson)
                    return responseJson;
                }else{
                    console.log(responseJson)
                    ToastUtil.showShort(responseJson.errorMsg,true)
                }
            } catch(error) {
                console.error(error);
                ToastUtil.showShort(error,true)
            }
        }
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
    radios: {
        width:(width-30)*0.8, 
        height:40, 
        flexDirection:'row',
        justifyContent:'flex-end' 
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
        width:(width-30)*0.25,
        color:'#888',
        fontSize:14,
    },
    minput: {
        width:(width-30)*0.75,
        fontSize:14,
        color:'#777',
        textAlign:'right',
        height:40,
    },
    minput2: {
        width:(width-30)*0.75,
        height:40,
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
