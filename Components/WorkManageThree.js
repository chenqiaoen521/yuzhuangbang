

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, Image, View, StyleSheet, TouchableOpacity, Dimensions,
  RefreshControl,
  ActivityIndicator, Alert } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

import ActionSheet from 'react-native-actionsheet';
import LoadingView from './LoadingView';
import * as listActionCreators from '../actions/list';


//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';


var {width,height} = Dimensions.get('window');
export default class WorkManageThree  extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        //对比数据
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            lingToken:'',
            ztai:Object,
            dataSource: ds,
            empty:1,
            activeid:'',
        };
    }
    static defaultProps = {
        popToHome: null
    }
 
    componentDidMount() {
        var that = this
        that.Goget()
    }
    Goget() {
        console.log('THREE')
        var that = this
        store.get('user')
        .then(
            function(data){
                that.setState({
                    lingToken:data.token,
                });  
                that.GetData(data.token);
            })    
    }
    async GetData(token) {
        var that = this
        try {
            let response = await fetch(`${url}/App/Role/check_works?token=${token}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if(responseJson.errorCode===0){
                if(responseJson.data.length==0){
                    that.setState({
                        empty:0
                    }); 
                }else{
                    that.setState({
                        dataSource:that.state.dataSource.cloneWithRows(responseJson.data)
                    }); 
                }    
            }else{
                ToastUtil.showShort(responseJson.errorMsg,true)
            }
        } catch(error) {
            console.error(error);
            ToastUtil.showShort(error,true)
        }
        
    }

    renderMovieList(rowData) {
        return (
            <TouchableOpacity>
            <View style={styles.sin2}>
                <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome(rowData.id)}>
                    <Image style={{width:width*0.18,height:width*0.18,}}  source={{uri:`${url}${rowData.image}`}}></Image>
                </TouchableOpacity>
                <View style={styles.sinmid}>
                    <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome(rowData.id)}>
                        <View style={styles.sinText}>
                            <Image style={{width:16, height:16,marginRight:4,marginTop:3,alignSelf:'flex-start',borderRadius:7}} source={{uri:`${url}${rowData.user_avatar}`}}></Image>
                            <Text style={{fontSize:13,width:width*0.5-20,color:'#fff'}} numberOfLines={2}>{rowData.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.sinbtn}>
                        {/*<TouchableOpacity onPress={ ()=> this.Goadd(rowData.id,rowData.name,rowData.desc,rowData.image)}>*/}
                        <TouchableOpacity onPress={ ()=> this.Goadd(rowData.id)}>
                            <View style={styles.sbtn}>
                                <Icon size={13} color="#898989" name="edit"></Icon>
                                <Text style={{fontSize:12,color:'#898989',marginLeft:2}}>编辑</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.Godel(rowData.id)}>
                            <View style={styles.sbtn}>
                                <Icon size={12} color="#898989" name="trash-o"></Icon>
                                <Text style={{fontSize:12,color:'#898989',marginLeft:2}}>删除</Text>
                            </View>
                        </TouchableOpacity>
                    </View>  
                </View>
                <View style={styles.sinTai}>
                    { rowData.is_recommend == 2 ?
                    (<View style={styles.sinTai}>
                        <Text style={styles.bgbtntext}>待审核</Text>
                    </View>)
                    :
                    (<TouchableOpacity>
                        <View style={[styles.bgbtn,{backgroundColor:'#ae8300'}]}>
                            <Text style={[styles.bgbtntext,{color:'#fff'}]}>审核未通过</Text>
                        </View>
                    </TouchableOpacity>)
                    }
                </View>
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.sglist}>

                { this.state.empty === 0 ? 
                <View style={{ padding:20, alignItems:'center', paddingTop:50,justifyContent:'center'}}>
                    <Text style={{ fontSize:16, color:'#888'}}>暂无数据</Text>
                </View>
                : 
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieList.bind(this)}
                />
                }
            </View>
        );
    }
    //自定义方法
    popToHome (id) {
        if(this.props.popToWatch){
            this.props.popToWatch(id)
        }
    }
    // 删除按钮
    Godel(id) {
        var that = this;
        that.setState({ activeid:id, });  
        Alert.alert(
            '删除',
            '确认删除该作品吗',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => { that.del(that.state.activeid) }  },
            ],
            { cancelable: false }
        )
    }

    //删除作品
    del(id) {
        /*if(this.props.Goshanchu){
            this.props.Goshanchu(id)
        }*/
        var that = this
        console.log(id)
        store.get('user')
        .then(
            function(data){
                that.Doshan(data.token,id);
            })
    }
    async Doshan(token,id) {
        var that = this
        console.log(token+'和33和'+id)
        try {
            let response = await fetch(`${url}/App/Role/del_work?token=${token}&id=${id}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if(responseJson.errorCode===0){ 
                ToastUtil.showShort('删除成功') 
                that.setState({ activeid:'', }); 
                that.Goget()
                //console.log(responseJson)
                //return responseJson;   
            }else{
                ToastUtil.showShort(responseJson.errorMsg,true)
            }
        } catch(error) {
            console.error(error);
            ToastUtil.showShort(error,true)
        }
    }


    Goadd(id) {
        if(this.props.popToBJ){
            this.props.popToBJ(id)
        }
    }  

   
}


const mapStateToProps = (state) => {
  const { list } = state;
  return {
    list
  };
};

const mapDispatchToProps = (dispatch) => {
  const listActions = bindActionCreators(listActionCreators, dispatch);
  return {
    listActions
  };
};

const styles = StyleSheet.create({
    sin: {
        backgroundColor: '#151515',
        marginTop:8,
        padding:(width*0.02),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },  
    sin2: {
        backgroundColor: '#1b1b1b',
        marginTop:8,
        padding:(width*0.02),
        flexDirection:'row',
        alignItems:'center',
    },
    sinmid: {
        width:width*0.50,
        marginLeft:width*0.03,
        marginRight:width*0.03, 
    },
    sinText: {
        flexDirection:'row',
        //paddingTop:5,
        width:width*0.5,
        alignItems:'center'
    },
    sinbtn: {      
        flexDirection:'row',
        height:32, 
        width:width*0.50,
        paddingTop:12
    },
    sbtn:{
        flexDirection:'row',
        marginRight:10,
        alignItems:'center',    

    },
    sinTai: {
        width:width*0.2,
        alignItems:'center',
        justifyContent:'space-around',
        height:width*0.18
    },
    bgbtn: {
        backgroundColor:'#262626',
        height:20,
        borderRadius:13,
        justifyContent:'center',
        alignItems:'center',
        width:width*0.22,
        padding:0,

    },
    bgbtntext: {
        fontSize:11,
        color:'#999'
    }
});

