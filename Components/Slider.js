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
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {data} from './bannerData'

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:0,
            dataarr:[],
        };
    }
    static defaultProps = {
        duration: 2000
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView ref="myscoll" horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator ={false}
                    iosonScrollAnimationEnd ={(e) => this.onAnimationEnd(e)} onScrollBeginDrag={(e)=>this.onScrollBeginDrag(e)}
                    onScrollEndDrag={()=>this.onScrollEndDrag()} >
                    {this.renderBannerView()}
                </ScrollView>
                <View style={styles.pageStyle}>
                    {this.renderIndicator()}
                </View>
            </View>
        );
    }
    onScrollBeginDrag (e) {
        //停止定时器
        console.log('begin')
        clearInterval(this.timer);
        let offsetX = e.nativeEvent.contentOffset.x
        let currentPage = Math.floor(offsetX / width)
        this.setState({
            activePage:currentPage
        })
    }
    onScrollEndDrag () {
        console.log('end')
        this.startTimer();
    }
    renderBannerView (){
        //组件数组
        let itemArr = [];
        this.state.dataarr.map((item,i)=>{
            itemArr.push(
                <Image style={styles.imgStyle} key={i} source={{uri:`${url}${item.pic}`}} />
            )
        })
        return itemArr
    }
    renderIndicator () {
        var that = this
        let indicatorArr = [];
        let len = this.state.dataarr.length;
        for(let i = 0;i<len;i++){
            let style = (i ===that.state.activePage) ? '#ae8300':'#f3f3f3';
            indicatorArr.push(
                <Text key={i} style={{fontSize:20,color:style}}>&bull;</Text>
            );
        }
        return indicatorArr;
    }
    onAnimationEnd (e) {
        let offsetX = e.nativeEvent.contentOffset.x
        let currentPage = Math.floor(offsetX / width)
        this.setState({
            activePage:currentPage
        })
    }
    startTimer () {
      var that = this
        let Scroll = this.refs.myscoll
        this.timer = setInterval(() => {
            let activePage = this.state.activePage;
            if((this.state.activePage+1)>= that.state.dataarr.length){
                activePage = 0;
            }else{
                activePage = this.state.activePage+1 ;
            }
            this.setState({
                activePage:activePage
            })
            Scroll.scrollTo({x:activePage*width,y:0,animated:true})
        },this.props.duration)
    }
    componentDidMount() {
        this.startTimer()
        this.Getimage(3)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    Getimage(type){
        var that = this
        let datanum = this.Doimage(type);
        datanum.then(
            (result)=>{
                console.log(result)
                that.setState({
                    dataarr:result
                })
            }
        )     
    }
    async Doimage(type){
        try {
            let response = await fetch(`${url}/App/Index/index_image?type=`+ type,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if(responseJson.errorCode===0){
                return responseJson.data;
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    imgStyle:{
        width:width,
        height:width*0.55,
    },
    pageStyle:{
        position:'absolute',
        bottom:0,
        width:width,
        flexDirection : 'row',
        justifyContent :'center'
    }
});

