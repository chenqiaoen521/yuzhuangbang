/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
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

import ToastUtil from '../utils/ToastUtil';
const host = require('../config.json').url;
import store from 'react-native-simple-store';

export default class AccountEdit extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle:navigation.state.params.title,
        headerRight: (<View></View>),
    });

    constructor(props) {
        super(props);
    
        this.state = {
            token:'',
            zhangid:'',
            dataarr:[],
            onactive:'',
            user_name:''
        };
        //单选框
        this.onSelect = this.onSelect.bind(this)
    }
    componentWillMount () {
        let that = this;

        const {state} = this.props.navigation;
        let page = state.params.url;
        that.Getmation(page);

        
    }

    Getmation(url) {
        var data = this.Domation(url)
        data.then((result)=>{
            this.setState({
                dataarr: result,
            })
        })
    }
    async Domation(url) {
        try {   
              let response = await fetch(`${host}${url}`);
              let responseJson = await response.json();
              if(responseJson.errorCode===0){
                  console.log(responseJson.data)
                  return responseJson.data;
              }else {
                  console.log(errorMsg);
              }
          } catch(error) {
              console.error(error);
          }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.unit}>
                    <Text style={styles.txt}>姓名</Text>
                    <TextInput  underlineColorAndroid="transparent" defaultValue={this.state.dataarr.user_name} 
                        placeholderTextColor={'#888'} 
                        style={{color:'#888888',fontSize:13, padding:0,width:width-100,}}
                        onChangeText={(text) => this.setState({user_name:text}) }
                    />
                </View>
                {/*{this.renderPhone.bind(this)()}
                {this.renderBottom.bind(this)()}*/}
                <View style={styles.unit}>
                    <Text style={styles.txt}>状态</Text>
                    <RadioGroup style={styles.radios} size={12} thickness={1} activeColor='#af8402' color='#fff' 
                        selectedIndex={this.state.dataarr.status} onSelect = {(index, value) => this.onSelect(index, value)} >
                        <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'未激活'}> 
                            <Text style={{fontSize:13,color:'#777'}}>未激活</Text> 
                        </RadioButton>
                        <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'已激活'}> 
                            <Text style={{fontSize:13,color:'#777'}}>已激活</Text> 
                        </RadioButton>
                    </RadioGroup>
                  </View>
                <TouchableOpacity style={styles.add} onPress={ ()=> this.Gosubmit(this.state.dataarr.id) }>
                    <Text style={{color:'#fff'}}>提交修改</Text>
                </TouchableOpacity>
            </View>                                               
        );
    }

    

    onSelect(index, value){
        this.setState({ onactive:index })   
    }

    Gosubmit(id) {
        var that = this;
        store.get('user').then(
            function(data){
                that.Dosubmit(id,data.token,that.state.onactive,that.state.user_name);   
            })
    }
    async Dosubmit(id,token,status,name) {
        try {
            let response = await fetch(`${host}/App/Department/edit_child`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'id='+id+'&user_name='+name+'&status='+status+'&token='+token
            });
            let responseJson = await response.json();
           
            if(responseJson.errorCode === 0){
                ToastUtil.showShort("修改子账号成功")

                const {navigate} = this.props.navigation;
                navigate('MyBranch',{title:'部门管理'});
                console.log(responseJson)     
            }else{
                ToastUtil.showShort(responseJson.errorMsg,false)
            }    
        }catch(error) {
            console.error(error);
            ToastUtil.showShort(error,true)
        }
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#151515',
    },
    unit:{
        backgroundColor:'#1b1b1b',
        flexDirection:'row',
        alignItems:'center',
        height:50,
        marginTop:1,
        paddingLeft:10
    },
    phone:{
        backgroundColor:'#1b1b1b',
        flexDirection:'row',
        alignItems:'center',
        justifyContent : 'space-between',
        height:50,
        marginTop:1,
        paddingLeft:10,
        paddingRight:10
    },
    txt:{
        color:'#999999',
        width:60,
    },
    add:{
        backgroundColor:'#ae8300',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:0,
        width:width
    },
    radios: {
        width:width-100, 
        height:40, 
        flexDirection:'row',
    }
});
