

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, Image, View, StyleSheet, TouchableOpacity, Dimensions,
  RefreshControl,
  ActivityIndicator } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

import ActionSheet from 'react-native-actionsheet';
import LoadingView from './LoadingView';
import * as listActionCreators from '../actions/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


var {width,height} = Dimensions.get('window');
export default class WorkManageOne  extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        //对比数据
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'1简约清新小户型一居室的好房子啊',
                    'state':'未发布'
                },
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'2简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },     
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'3简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },     
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'4简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },     
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'5简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },     
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'6简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },     
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'7简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },     
                {
                    'img':require('../imgs/indeximg_07.jpg'),
                    'smallImg':require('./../imgs/detailicon_36.png'),
                    "title":'8简约清新小户型一居室的好房子啊',
                    'state':'已下架'
                },      
            ])
        };
    }
    static defaultProps = {
        popToHome: null
    }
    
    componentDidMount () {
        /*const {listActions} = this.props;
        listActions.requestArticleList(false,true,false)*/
    }

    renderMovieList(rowData) {
        return (
            <TouchableOpacity TouchableOpacity={0.5} onPress={()=>this.popToHome()}  >
            <View style={styles.sin2}>
                <TouchableOpacity>
                    <Image style={{width:width*0.2,height:width*0.2,}} source={rowData.img}></Image>
                </TouchableOpacity>
                <View style={styles.sinmid}>
                    <TouchableOpacity>
                        <View style={styles.sinText}>
                            <Image style={{width:14, height:14,marginRight:4,marginTop:3,alignSelf:'flex-start'}} source={rowData.smallImg}></Image>
                            <Text style={{fontSize:12,width:width*0.5-18,color:'#fff'}} numberOfLines={2}>{rowData.title}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.sinbtn}>
                        <TouchableOpacity>
                            <View style={styles.sbtn}>
                                <Icon size={12} color="#898989" name="edit"></Icon>
                                <Text style={{fontSize:10,color:'#898989',marginLeft:2}}>编辑</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.sbtn}>
                                <Icon size={11} color="#898989" name="trash-o"></Icon>
                                <Text style={{fontSize:10,color:'#898989',marginLeft:2}}>删除</Text>
                            </View>
                        </TouchableOpacity>
                    </View>  
                </View>
                <TouchableOpacity>
                    <View style={styles.sinTai}>
                        <Text style={{fontSize:11,color:'#999999'}}>{rowData.state}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.sglist}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieList.bind(this)}
                />
            </View>
        );
    }
    popToHome () {
        if(this.props.popToWatch){
            this.props.popToWatch()
        }
    }
    onEndReached(){
        /*const {listActions} = this.props;
        listActions.requestArticleList(false,false,true);*/
    }
    onRefresh(){
        /*const {listActions} = this.props;
        listActions.requestArticleList(true,false,false);*/
    }
    renderRow(rowdata){
        return (
            <TouchableOpacity style={styles.unit}>
                <View style={styles.item}>
                    <View style={styles.icon}>
                        <Icon name="bell-o"  style={{fontSize:14,color:'#fff'}}/>
                    </View>
                    <Text style={styles.date}>{rowdata.date}</Text>
                </View>
                <Text style={styles.title}>{rowdata.title}</Text>
                <Text style={styles.info}>{rowdata.info}</Text>
            </TouchableOpacity>
        )
    }
    renderFooter(){
        if(this.props.list.isLoadMore){
            return (
                <View style={styles.footerContainer}>
                    <ActivityIndicator size="small" color="#3e9ce9" />
                    <Text style={styles.footerText}>
                        数据加载中……
                    </Text>
                </View>
            );
        }else{
            return (
                <View/>
            )
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
        flexDirection:'row'
    },  
    sin2: {
        backgroundColor: '#1b1b1b',
        marginTop:8,
        padding:(width*0.02),
        flexDirection:'row'
    },
    sinmid: {
        width:width*0.50,
        marginLeft:width*0.03,
        marginRight:width*0.03, 
    },
    sinText: {
        flexDirection:'row',
        paddingTop:5,
        width:width*0.50,
        alignItems:'center'
    },
    sinbtn: {      
        flexDirection:'row',
        height:20, 
        width:width*0.50,
        paddingTop:6
    },
    sbtn:{
        flexDirection:'row',
        marginRight:10,
        alignItems:'center',    

    },
    sinTai: {
        width:width*0.2,
        alignItems:'center',
        justifyContent:'center',
        height:width*0.2
    }
});

