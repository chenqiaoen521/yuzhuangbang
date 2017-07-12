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
    ScrollView,
    Modal
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Notice from '../Components/Notice';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
import CenterItem from '../Components/CenterItem';
import ToastUtil from '../utils/ToastUtil';
export default class Center extends Component {
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
            type:'',
            store:'',
            numdata:[],
            onoff:false,
            onoff1:false,
            shenfen:'',
            typecom:true,
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
    
    componentDidMount() {
        this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
    }
    onActionSelected () {
        const {navigate} = this.props.navigation;
        navigate('Message');
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderHead(this)}
                    <View style={{flexDirection:'row',alignItems : 'center',justifyContent : 'center', marginTop:15}}>
                        {this.renderHeadBottom()}
                    </View>
                    <View style={{marginTop:15}}>
                        <Notice popToparent={(id)=>this.popToparent(id)} titleColor="#333333" bgcolor="#f7f7f7" rightBar="#838383" />
                    </View>
                    <View style={styles.middle}>
                        <CenterItem popToCenter={()=>this.tomyhome()} icon={require('../imgs/middle_01.png')} txt="我的主页"/>
                        <CenterItem popToCenter={()=>this.towork()} icon={require('../imgs/middle_07.png')} txt={this.state.type==2? '作品管理' : '商品管理'}/>
                        <CenterItem popToCenter={()=>this.toBlack()} icon={require('../imgs/middle_02.png')} txt="黑名单"/>
                        {this.state.typecom == true ?  
                        <View><CenterItem popToCenter={()=>this.toPartment()} icon={require('../imgs/middle_03.png')} txt="部门管理"/>
                        <CenterItem  popToCenter={()=>this.toSub()} icon={require('../imgs/middle_04.png')} txt="子账号添加"/></View>
                        : null }
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}></View>
                        <CenterItem popToCenter={()=>this.Gokai()} icon={require('../imgs/cicon_06.png')} txt="附近搜索"/>
                        <CenterItem popToCenter={()=>this.Gokai()} icon={require('../imgs/cicon_03.png')} txt="社区"/>
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}></View>
                        <CenterItem popToCenter={()=>this.toFav()} icon={require('../imgs/cicon_11.png')} txt="我的收藏"/>
                        <CenterItem popToCenter={()=>this.Gokai2()} icon={require('../imgs/cicon_10.png')} txt="我的图文"/>
                        <CenterItem popToCenter={()=>this.toMessage()} icon={require('../imgs/middle_05.png')} txt="我的消息"/>
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:10}}></View>
                        <CenterItem popToCenter={()=>this.toSetting()} icon={require('../imgs/middle_06.png')} txt="设置"/>
                        <View style={{borderTopColor:'#eeeeee',borderTopWidth:0.5,height:50}}></View>
                    </View>
                </ScrollView>
                <Modal animationType='slide' transparent={true} style={{height:height}} visible={this.state.onoff}  onRequestClose={() => {this.Goclose()}} >
                    <View style={{ backgroundColor:'rgba(0,0,0,0.4)',height:height,alignItems:'center',justifyContent:'center',}} >
                        <View style={{ backgroundColor:'#fff', borderRadius:10, width:240, backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:240, height:162, borderRadius:10,}} source={require('./../imgs/tippic_07.png')}></Image> 
                            <Text style={{ paddingTop:10, paddingBottom:16}}>您暂时还没有权限！</Text>
                        </View>
                        <TouchableOpacity onPress={ ()=>this.Goclose() }><Image style={{width:30,height:30,marginTop:20}} source={require('./../imgs/closegray.png')}></Image></TouchableOpacity>
                    </View>
                </Modal>
                <Modal animationType='slide' transparent={true} style={{height:height}} visible={this.state.onoff1}  onRequestClose={() => {this.Goclose()}} >
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

    Goquan() {
        ToastUtil.showShort('您暂时还没有权限！')
    }
    Gobuild() {
        ToastUtil.showShort('功能正在建设中，敬请期待！')
    }

    popToparent(id){
        const {navigate} = this.props.navigation;
        navigate('MainDetail',{id:id,title:'公告详情',page:'/App/Index/article_detail'});
    }
    toSetting(){
        const {navigate} = this.props.navigation;
        navigate('Settings');
    }
    tomyhome(){
        const {navigate} = this.props.navigation;
        navigate('MyHome',{title:'我的主页'});
    }
    toSub(){
        const {navigate} = this.props.navigation;
        navigate('account');
    }
    toPartment () {
        const {navigate} = this.props.navigation;
        navigate('MyBranch',{title:'部门管理'});
    }
    toFav(){
        const {navigate} = this.props.navigation;
        navigate('MyCollect',{title:'我的收藏'});
    }
    toBlack(){
        const {navigate} = this.props.navigation;
        navigate('myBlack');
    }
    toMessage () {
        const {navigate} = this.props.navigation;
        navigate('Message');
    }
    towork () {
        const {navigate} = this.props.navigation;
        navigate('WorkManage');
    }
    componentWillMount () {
        let that = this;
        store.get('user').then(
            function(data){
                that.setState({
                    token:data.token
                });  
                that.__init(data.token)     
                that.Getnum(data.token)        
        })
    }
    __init (token) {
        let data = this.getData(token);
        data.then((result)=>{
            this.setState({
                sex: result.user_info.sex,
                avatar:result.user_info.avatar,
                name:result.user_info.name,
                nickname:result.user_info.nickname,
                phone:result.user_info.phone,
                province:result.user_info.province,
                city:result.user_info.city,
                area:result.user_info.area,
                type:result.user_info.type,
            })
            var that= this
            if(result.user_info.type==2){
                if(result.user_info.is_company==1){
                    that.setState({ shenfen:'设计公司' })
                }else{
                    that.setState({ shenfen:'自由设计师',typecom:false })
                }
            }else{
                that.setState({ shenfen:'商家' })
            }
            console.log(this.state.type)
        })
    }
    async getData(token) {
        try {   
            let response = await fetch(`${host}/App/Center/get_user_info?token=${token}`);
            let responseJson = await response.json();
            console.log(responseJson.data)
            return responseJson.data;
        } catch(error) {
            console.error(error);
        }
    }

    Getnum(token) {
        var that = this
        let data = this.Donum(token);
        data.then((result)=>{
            this.setState({
                numdata: result,
            })
        })
    }
    async Donum(token) {
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

    renderHead(obj){
        return(
            <View style={{ alignItems:'center', }}>
                <Image style={{width:62,height:62,borderRadius:31,marginTop:10,marginBottom:15}} source={{uri:`${host}${obj.state.avatar}`}}/>
                <View style={{flexDirection : 'row',alignItems:'center'}}>
                    <Text style={{color:'#cccccc',fontSize:16}}>{obj.state.name}</Text>
                    <Text style={{marginLeft:10,borderRadius:2,padding:1, paddingLeft:3, paddingRight:3, color:'#fff',fontSize:10,backgroundColor:'#ae8300',textAlign:'center'}}>
                    {/*{ToastUtil.getUserType(obj.state.type)}*/}
                    {this.state.shenfen}
                    </Text>
                </View>
            </View>
        )
    }
    renderHeadBottom () {
        var that = this;
        let arr = [];
        let itemData = [
        {'icons':require('../imgs/center_02.png'),myname:'我关心的',cont:that.state.numdata.my_follow,id:1},
        {'icons':require('../imgs/center_04.png'),myname:'关心我的',cont:that.state.numdata.follow_my,id:2},
        {'icons':require('../imgs/center_01.png'),myname:'我的好友',cont:that.state.numdata.my_friend,id:3},
        {'icons':require('../imgs/center_03.png'),myname:'我的客户',cont:that.state.numdata.my_contact,id:4}]
        itemData.map((item,i) => {
            arr.push(
                <View key={i}>
                    <TouchableOpacity TouchableOpacity={0.5} 
                        onPress={()=>{ item.id==4 ? this.props.navigation.navigate('MyClient',{title:'我的客户'}) : this.props.navigation.navigate('Icare',{title:item.myname,id:item.id})}}  
                        style={styles.headerBottom}>
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
