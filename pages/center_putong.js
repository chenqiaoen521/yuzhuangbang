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
    TouchableOpacity,
    Alert,
    ScrollView,Modal
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';

import Ionicons from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';
import CenterItem from '../Components/CenterItem';
import store from 'react-native-simple-store';
import ToastUtil from '../utils/ToastUtil';
const host = require('../config.json').url;
export default class CenterPT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex:null,
            avatar:null,
            name:null,
            nickname:null,
            phone:null,
            province:null,
            city:null,
            area:null,

            role_type:'',
            agree:'',
            token:'',
            numdata:[],
            onoff:false,
            onoff1:false,
        };
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle:'个人中心',
        title:'个人中心',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        ),
        headerRight: (
            <Ionicons.Button name="bell-o" backgroundColor="transparent" underlayColor="transparent" activeOpacity={0.8}
                onPress={() => { navigation.state.params.handleShare(); }} />
        )
    });
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderHead()}
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around', marginTop:15}}>
                        {this.renderHeadBottom()}
                    </View>
                    <View style={{marginTop:15}}>
                       <Notice popToparent={(id)=>this.popToparent(id)} titleColor="#333333" bgcolor="#f7f7f7" rightBar="#838383" />
                    </View>
                    <View style={styles.middle}>
                        <CenterItem popToCenter={()=>this.toOpen()} icon={require('../imgs/middle_08.png')} txt="我要开店"/>
                        <CenterItem popToCenter={()=>this.toFav()} icon={require('../imgs/middle_09.png')} txt="我的收藏"/>
                        <CenterItem popToCenter={()=>this.toMessage()} icon={require('../imgs/middle_05.png')} txt="我的消息"/>
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}></View>
                        <CenterItem popToCenter={()=>this.Gokai()} icon={require('../imgs/cicon_06.png')} txt="附近搜索"/>
                        <CenterItem popToCenter={()=>this.Gokai()} icon={require('../imgs/cicon_03.png')} txt="社区"/>
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}></View>
                        <CenterItem popToCenter={()=>this.toSetting()} icon={require('../imgs/middle_06.png')} txt="设置"/>
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:50}}>
                        </View>
                    </View>
                </ScrollView>
                <Modal animationType='slide' transparent={true} style={{height:height}} visible={this.state.onoff}  onRequestClose={() => {this.Goclose()}}>
                    <View style={{ backgroundColor:'rgba(0,0,0,0.4)',height:height,alignItems:'center',justifyContent:'center',}} >
                        <View style={{ backgroundColor:'#fff', borderRadius:10, width:240, backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:240, height:162, borderRadius:10,}} source={require('./../imgs/tippic_07.png')}></Image> 
                            <Text style={{ paddingTop:10, paddingBottom:16}}>您暂时还没有权限！</Text>
                        </View>
                        <TouchableOpacity onPress={ ()=>this.Goclose() }><Image style={{width:30,height:30,marginTop:20}} source={require('./../imgs/closegray.png')}></Image></TouchableOpacity>
                    </View>
                </Modal>
                <Modal animationType='slide' transparent={true} style={{height:height}} visible={this.state.onoff1}  onRequestClose={() => {this.Goclose()}}>
                    <View style={{ backgroundColor:'rgba(0,0,0,0.4)',height:height,alignItems:'center',justifyContent:'center',}} >
                        <View style={{ backgroundColor:'#fff', borderRadius:10, width:240, backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:240, height:190, borderRadius:10,}} source={require('./../imgs/tippic_03.png')}></Image>
                            <Text style={{ paddingTop:10, paddingBottom:16}}>功能正在建设中，敬请期待！</Text>
                        </View>
                        <TouchableOpacity onPress={ ()=>this.Goclose() }><Image style={{width:30,height:30,marginTop:20}} source={require('./../imgs/closegray.png')}></Image></TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
    Gokai() {
        this.setState({onoff:true})
    }
    Gokai2() {
        this.setState({onoff1:true})
    }
    Goclose() {
        this.setState({onoff:false,onoff1:false})
    }

    toSetting(){
        const {navigate} = this.props.navigation;
        navigate('Settings');
    }
    toFav(){
        const {navigate} = this.props.navigation;
        navigate('MyCollect',{title:'我的收藏'});
    }
    popToparent(id){
        const {navigate} = this.props.navigation;
        navigate('MainDetail',{id:id,title:'公告详情',page:'/App/Index/article_detail'});
    }


    toMessage () {
        const {navigate} = this.props.navigation;
        navigate('Message');
    }
    toOpen () {
        let agree = this.state.agree;
        let role_type = this.state.role_type;
        if(role_type=="2"){
            role_type = "设计师"
        }
        if(role_type=="3"){
            role_type = "商家"
        }

        const {navigate} = this.props.navigation;
        if(agree&&agree=="1"){
            navigate('CreatShop');
        }else if (agree&&agree=="2"||agree&&agree=="3"){
            navigate('CreatShopWait',{idcard:role_type});
        }else if(!agree){
            Alert.alert('提示','开店申请已同意,请退出重新登录')
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
    }
    onActionSelected () {
        const {navigate} = this.props.navigation;
        navigate('Message');
    }
    componentWillMount () {
        let that = this;
        store.get('user').then(
            function(data){
                that.setState({
                    token:data.token,
                });
                that.__init(data.token)     
                that.Getnum(data.token)     
            });
    }
    __init (token) {
        let data = this.getData(token);
        data.then((result)=>{
            console.log(result)
            this.setState({
                sex: result.user_info.sex,
                avatar:result.user_info.avatar,
                name:result.user_info.name,
                nickname:result.user_info.nickname,
                phone:result.user_info.phone,
                province:result.user_info.province,
                city:result.user_info.city,
                area:result.user_info.area,
                role_type:result.user_info.role_type,
                agree:result.user_info.agree,
            })
        })
    }
    async getData(token) {
        try {   
            let response = await fetch(`${host}/App/Center/get_user_info?token=${token}`);
            let responseJson = await response.json();
            if(responseJson.errorCode==4000){
                ToastUtil.showShort('您的角色已经重置请重新登陆', true);
                store.save('user',{token:null,type:null})
                this.props.navigation.navigate('Main')
            }
            //console.log(responseJson.data)
            return responseJson.data;
        } catch(error) {
            console.log(responseJson.data)
            console.error(error);
        }
    }

    Getnum(token) {
        var that = this
        let data = this.Donum(token);
        data.then((result)=>{
            //console.log(token)
            //console.log(result)
            this.setState({
                numdata: result,
            })
        })
    }
    async Donum(token) {
        console.log(`${host}/App/Center/get_count?token=${token}`)
        try {   
            let response = await fetch(`${host}/App/Center/get_count?token=${token}`);
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
    toInfo () {
        const {navigate} = this.props.navigation;
        navigate('personInfo');
    }
    renderHead(){
        return(
            <TouchableOpacity style={{ alignItems:'center', }} onPress={()=>this.toInfo()}>
                <Image   style={{width:70,height:70,borderRadius:35,marginTop:10,marginBottom:10}} source={{uri:`${host}${this.state.avatar}`}}/>
                <View style={{flexDirection : 'column',alignItems:'center'}}>
                    <Text style={{color:'#cccccc',fontSize:16}}>{this.state.name}</Text>
                    <Text style={{textAlign:'center',color:'#999999',fontSize:13,marginTop:5}}>{this.state.phone}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    renderHeadBottom () {
        var that = this
        let arr = [];
        let itemData = [
            {'icons':require('../imgs/center_02.png'),myname:'我关心的',cont:that.state.numdata.my_follow,id:1},
            {'icons':require('../imgs/center_04.png'),myname:'关心我的',cont:that.state.numdata.follow_my,id:2},
            {'icons':require('../imgs/center_01.png'),myname:'我的好友',cont:that.state.numdata.my_friend,id:3}]
        itemData.map((item,i) => {
            arr.push(
                <View key={i}>
                    <TouchableOpacity TouchableOpacity={0.5} onPress={()=>{item.id==4? this.props.navigation.navigate('Kehu',{page:'custom',title:item.myname}): this.props.navigation.navigate('Icare',{title:item.myname,id:item.id})}}  style={styles.headerBottom}>
                        <Image style={{width:26,height:22}} source={item.icons}/>
                        <Text style={{color:'#ccc',fontSize:14,marginTop:6,marginBottom:6}}>{item.myname}</Text>
                        <Text style={{color:'#ccc',fontSize:12}}>{item.cont}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
        return arr
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    headerBottom:{
        width:width/4,
        alignItems:'center',
    },
    middle:{
        backgroundColor:'#f7f7f7',
    }
});
