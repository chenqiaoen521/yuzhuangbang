/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';


//import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
      InteractionManager,
    TextInput,
    Platform,
    WebView,
    Keyboard,
} from 'react-native';
import Search from '../Components/Search';
import Slider from '../Components/Slider';
import Notice from '../Components/Notice';
import HomeTitle from '../Components/HomeTitle';
import DesignList from '../Components/DesignList';
import SharePage from '../Components/SharePage';

import Icon from 'react-native-vector-icons/Wz';

//ios轮播图
import RNCarousel from '../Components/RNCarousel';
//调整键盘
import KeyboardSpacer from 'react-native-keyboard-spacer';
//存储登录信息
import store from 'react-native-simple-store';
//三级联动
import Picker from 'react-native-roll-picker/lib/Picker2'
import cityCode from '../Components/ChinaCityCode'
//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'

var {width,height} = Dimensions.get('window');
export default class Main extends Component {
    static navigationOptions = {
        header:null,
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="homeicon" size={25} color={tintColor} />
        )
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isModal:false, //登录框是否显示
            isZhuce:false, //注册框1是否显示
            text: '',      //单选内容
            isArea:false, //注册2选择地区
            isFill:false, //注册3填写信息
            isFinish:false, //注册成功
            token:false,
            popNum:1,
            mode:false, //灵感
            //登录的表单
            LoginNum:'13838370175',
            LoginWord:'123456',
            //注册的表单
            ZhuNum:'',
            ZhuMa:'',
            ZhuWord:'',
            ZhuWordYZ:'',
            zhuNc:'',
            //三级联动
            province:'',
            city:'',
            area:'',
            lingToken:'',
            lingType:'',
            htmlsrc:'http://192.168.0.188/App/Index/work_list?token=51_2_2_59_337&type=3',
            datatype:3,
            //
            upnum:width*0.45

        };
        //三级联动
        this.rowIndex0 = 0;
        this.rowIndex1 = 0;
        this.rowIndex2 = 0;
        this.onIconClicked = this.onIconClicked.bind(this);
        //单选框
        //this.onSelect = this.onSelect.bind(this)
    }
    onIconClicked() {
    this.drawer.openDrawer();
  }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => { 
            let that =this;
            //store.save('words', []);
            store.get('user').then(function(data){
                if(data.token){
                    that.setState({
                        token:true,
                    });
                }else{
                    that.setState({
                        token:false,
                    });
                }
            })
        //this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);  
        //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);  
            this.Goread()
        });
    }
    receiveMessage (e) {
        let message = e.nativeEvent.data
    }
    render() {      
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center', flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>
                        <Search popToHome={()=>this.toSearchPage()}  />
                        <View style={{width:0.15*width, alignItems: 'center',justifyContent:'center'}} >
                            { this.state.token === false ?    
                            <TouchableOpacity onPress={()=>this.onRequestOpen()}>
                                <View><Text style={{fontSize:13,color:'#fff'}}>登录</Text></View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this.Gocenter()}>
                                <Image style={{width:22, height:22}} source={require('./../imgs/yonghu.png')}></Image>
                            </TouchableOpacity>
                            }
                        </View>
                        
                    </View>
                <ScrollView onScroll={()=>this.GoPop()}>
                    {/*<View style={{alignItems: 'center', flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingLeft:10,paddingTop:3,paddingBottom:3}}>
                        <Search popToHome={()=>this.toSearchPage()}  />
                        <View style={{width:0.15*width, alignItems: 'center',justifyContent:'center'}} >
                            { this.state.token === false ?    
                            <TouchableOpacity onPress={()=>this.onRequestOpen()}>
                                <View><Text style={{fontSize:13,color:'#fff'}}>登录</Text></View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this.Gocenter()}>
                                <Image style={{width:22, height:22}} source={require('./../imgs/yonghu.png')}></Image>
                            </TouchableOpacity>
                            }
                        </View>
                    </View>*/}
                    
                    <View style={{marginTop:5}}>
                        <Slider ref='slide' />
                    </View>
                    <View style={{marginTop:5}}>
                        <Notice popToparent={(id)=>this.popToparent(id)}/>
                    </View>
                    <HomeTitle name={ this.state.mode ? '找灵感':'找优品' } />
                    <WebView
                          automaticallyAdjustContentInsets={false}
                          style={{ height:600}}
                          source={{uri:this.state.htmlsrc}}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          onMessage={this.receiveMessage.bind(this)}
                          decelerationRate="normal"
                          startInLoadingState={false}
                          scalesPageToFit={false} />
                </ScrollView>
                <TouchableOpacity onPress={()=>this.GoFind() }>                                      
                    <View style={{width:width, height:48, justifyContent:'center', alignItems:'center',backgroundColor:'#2a2a2a'}}>
                        <Icon name={ this.state.mode ? 'mindicon':'goodicon'}  size={22} color={'#fff'} />
                        <Text style={{fontSize:14,color:'#fff'}}>{this.state.mode ? '找优品':'找灵感'}</Text>
                    </View>
                </TouchableOpacity>
                <Modal  
                    animationType='slide'          // 从底部滑入
                    transparent={true}             // 不透明
                    visible={this.state.isModal}   // 根据isModal决定是否显示
                    onRequestClose={() => {this.onRequestClose()}}  // android必须实现
                    >
                    <View style={styles.modalpage}>
                        <TouchableOpacity style={[styles.modalViewStyle,{ height:this.state.upnum}]} onPress={() => this.onRequestClose()}><View></View></TouchableOpacity>
                        <View style={styles.popmsg}>
                            <View style={styles.biao}><Text style={styles.biaoti}>用户登录</Text></View>
                            <View style={styles.fill}>
                                <View style={styles.sg}>
                                    <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon02.png')}></Image></View>
                                    <TextInput style={styles.shuru}  onChangeText={ (text) => this.setState({LoginNum:text}) } 
                                    placeholder='手机号' keyboardType={'numeric'} maxLength={11} underlineColorAndroid="transparent"/>
                                </View>
                                <View style={styles.sg}>
                                    <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon03.png')}></Image></View>
                                    <TextInput style={styles.shuru} onChangeText={ (text) => this.setState({LoginWord:text}) } placeholder='密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                                </View>
                                <View style={[styles.sg , styles.noneb]} >
                                    <TouchableOpacity onPress={() => this.GoArea()}><Text style={styles.link}>注册账号</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.Goreset()}><Text style={styles.link}>忘记密码？</Text></TouchableOpacity>
                                </View>
                                <View style={[styles.sg , styles.noneba]}>
                                    <TouchableOpacity onPress={()=>this.GoLogin() }>                                       
                                        <View style={styles.textLoginViewStyle}>
                                            <Text style={styles.textLoginStyle}>登录</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <KeyboardSpacer/>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.modalViewBStyle} onPress={() => this.onRequestClose()}><View></View></TouchableOpacity>
                    </View>  
                </Modal>   
                <Modal animationType='slide' transparent={true} visible={this.state.isArea} onRequestClose={() => {this.onRequestClose()}} >
                    <View style={styles.modalpage}>
                        <TouchableOpacity style={[styles.modalViewStyle,{ height:this.state.upnum}]} onPress={() => this.onRequestClose()}><View></View></TouchableOpacity>
                        <View style={styles.popmsg}>
                            <View style={styles.biao}><Text style={styles.biaoti}>所在地区选择</Text></View>
                            <View>
                                <View style = {styles.kinda}>
                                    <View style = {styles.ktext}><Text style = {styles.ktxt}>省份</Text></View>
                                    <View style = {styles.ktext}><Text style = {styles.ktxt}>市/区</Text></View>
                                    <View style = {styles.ktext}><Text style = {styles.ktxt}>区县</Text></View>
                                </View>
                                <View style = {{/*height: height*0.55-144,*/ height:200, flexDirection: 'row'}}>
                                    
                                    <View style = {{flex: 1}}>
                                        <Picker 
                                            data = {cityCode.CityZoneCode.China.Province}
                                            ref = '_Picker0'
                                            name = 'name'
                                            onRowChange = {index => {
                                                this.rowIndex0 = index; 
                                                this.rowIndex1 = 0; 
                                                this.rowIndex2 = 0; 
                                                this.refs._Picker1.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City); 
                                                this.refs._Picker2.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City[0].Area)}}
                                        />
                                    </View>
                                    <View style = {{flex: 1}}>
                                        <Picker 
                                            data = {cityCode.CityZoneCode.China.Province[0].City} 
                                            ref = '_Picker1'
                                            name = 'name'
                                            onRowChange = {index => {
                                                this.rowIndex1 = index; 
                                                this.rowIndex2 = 0; 
                                                this.refs._Picker2.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area)}}
                                        />
                                    </View>
                                    <View style = {{flex: 1}}>
                                        <Picker 
                                            data = {cityCode.CityZoneCode.China.Province[0].City[0].Area}
                                            ref = '_Picker2'
                                            name = 'name'
                                            onRowChange = {index => this.rowIndex2 = index}
                                        />
                                    </View>
                                </View>

                                <View style={styles.allWidth}>
                                    <TouchableOpacity>
                                        <View style={[styles.jun,styles.jtu]}>
                                            <Text style={styles.jtext}>一键获取</Text>
                                            <Image style={{width:16, height:16,marginLeft:5}} source={require('./../imgs/dlweizhi.png')}></Image>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.Gofill()}>
                                        <View style={[styles.jun,styles.jright]}><Text style={styles.jtext}>下一步</Text></View>
                                    </TouchableOpacity>
                                </View>
                             </View>
                        </View>
                        <TouchableOpacity style={styles.modalViewBStyle} onPress={() => this.onRequestClose()}><View></View></TouchableOpacity>
                    </View>
                </Modal>   
                <Modal animationType='slide' transparent={true} visible={this.state.isFill} onRequestClose={() => {this.onRequestClose()}}  >
                    <View style={styles.modalpage}>
                        <TouchableOpacity style={[styles.modalViewStyle,{ height:this.state.upnum}]} onPress={() => this.onRequestClose()}><View></View></TouchableOpacity>
                        <View style={styles.popmsgFill}>
                            <View style={styles.biao}><Text style={styles.biaoti}>注册信息</Text></View>
                            <View style={styles.fillFill}>
                                <View style={styles.sgFill}>
                                    <View style={styles.imgb}>
                                        <Image style={styles.img} source={require('./../imgs/dlicon02.png')}></Image>
                                    </View>
                                    <TextInput style={styles.shuruFill} onChangeText={(text) => this.setState({ZhuNum:text})} placeholder='请填写您的手机号' keyboardType={'numeric'} maxLength={11}  underlineColorAndroid="transparent"/>
                                </View>
                                <View style={styles.sgFill}>
                                    <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon04.png')}></Image></View>
                                    <TextInput style={[styles.shuruFill,styles.small]} onChangeText={(text) => this.setState({ZhuMa:text})} placeholder='请输入验证码' underlineColorAndroid="transparent"/>
                                    <TouchableOpacity onPress={()=>this.GoSendNum()}>
                                        {/*验证码按钮*/}
                                        <View style={styles.yanzheng}>
                                            <Text style={styles.ytext}>获取验证码</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.sgFill}>
                                    <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon03.png')}></Image></View>
                                    <TextInput style={styles.shuruFill} onChangeText={(text) => this.setState({ZhuWord:text})} placeholder='请设置您的密码(字母和数字的组合)' secureTextEntry={true} underlineColorAndroid="transparent"/>
                                </View>
                                <View style={styles.sgFill}>
                                    <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon03.png')}></Image></View>
                                    <TextInput style={styles.shuruFill} onChangeText={(text) => this.setState({ZhuWordYZ:text})} placeholder='请确认您的密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                                </View>
                                <View style={styles.sgFill}>
                                    <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon05.png')}></Image></View>
                                    <TextInput style={styles.shuruFill} onChangeText={(text) => this.setState({zhuNc:text})} placeholder='请输入您的昵称' underlineColorAndroid="transparent"/>
                                </View>
                                
                                <View style={[styles.sgFill , styles.nonebaFill,{marginTop:5}]}>
                                    <TouchableOpacity onPress={()=>this.GoFinish()}>
                                        {/*登录按钮*/}
                                        <View style={styles.fillbtn}>
                                            <Text style={styles.filltext}>立即注册</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.modalViewBStyle} onPress={() => this.onRequestClose()}><View></View></TouchableOpacity>
                    </View>
                </Modal>  
            </View>
        );
    }
    //滚动事件
    GoPop() {
        if( this.state.token==false && this.state.popNum==1){
            //打开登录弹窗
            this.setState({
                isModal:true,
                isArea:false,
                isFill:false,
                isFinish:false,
                popNum:0
            });
        }
    }
    popToparent(id){
        const {navigate} = this.props.navigation;
        navigate('MainDetail',{id:id,title:'公告详情',page:'/App/Index/article_detail'});
    }
    //登录按钮
    GoLogin() {
        let data = this.DoLogin();
        data.then(
            (result)=>{
                //console.log(result.token) 
                //console.log(result.type)   
                //存储
                if(result){
                    console.log(result) 
                    store.save('user', { token: result.token, type:result.type } )   
                }else{
                    console.log('登录无返回')
                }

            }
        )    
    }
    async DoLogin() {
        var that = this
        if(that.state.LoginNum===''){
            ToastUtil.showShort('手机号不能为空',true)
        }else if(that.state.LoginWord===''){
            ToastUtil.showShort('验证码不能为空',true)
        }else{
            try {
                let response = await fetch(`${url}/App/User/login`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:'phone='+that.state.LoginNum+'&password='+that.state.LoginWord
                });
                let responseJson = await response.json();
                //console.error(responseJson);
                if(responseJson.errorCode === 0){
                    ToastUtil.showShort('登录成功')
                    that.setState({
                        token:true,
                        isModal:false
                    });
                    return responseJson.data;
                }else{
                    ToastUtil.showShort(responseJson.errorMsg,true)
                }    

                //console.error(responseJson);
            } catch(error) {
                console.error(error);
                ToastUtil.showShort(error,true)
            }
        }
    }


    //注册-发送验证码
    GoSendNum() {
        let datanum = this.DoSendnum();
        datanum.then(
            (result)=>{
                console.log(result) 
            }
        )    
    }
    async DoSendnum() {
        var that = this
        store.get('user').then(
            function(data){
                that.setState({
                    type:data.type,
                });           
            })
        if(that.state.ZhuNum===''){
            ToastUtil.showShort('请先输入手机号',true)
        }else{
            try {
                let response = await fetch(`${url}/App/User/send_code?phone=${that.state.ZhuNum}&type=1`,{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                let responseJson = await response.json();
                if(responseJson.errorCode===0){
                    ToastUtil.showShort('验证码发送成功')
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

    
    componentWillUnmount () {  
       // this.keyboardDidShowListener.remove();  
       // this.keyboardDidHideListener.remove();  
    }

    _keyboardDidShow () {  
        /*var that = this
        that.setState({
            upnum:0
        }) */ 
    }  
  
    _keyboardDidHide () {  
       /* var that = this
        //alert('Keyboard Hidden');  
        that.setState({
            upnum:width*0.45
        })*/  
    }  

    Goread() {
        var that = this
        store.get('user').then(function(data){
            if(data.token){
                //console.log(`${url}/App/Index/work_list?token=${data.token}&type=${that.state.datatype}`)
                that.setState({
                    htmlsrc:`${url}/App/Index/work_list?token=${data.token}&type=${that.state.datatype}`,
                }); 
            }else{
                //console.log(`${url}/App/Index/work_list?type=${that.state.datatype}`)
                that.setState({
                    htmlsrc:`${url}/App/Index/work_list?type=${that.state.datatype}`,
                }); 
            }
        })
    }

    //调取列表
    GoFind() {
        var that = this;
        this.setState({
            mode: !this.state.mode,
        });
        if(that.state.datatype==2){
            that.setState({ datatype:3 });
            that.refs.slide.Getimage(3);
        }else if(that.state.datatype==3){
            that.setState({ datatype:2 });
            that.refs.slide.Getimage(2);
        }
        that.Goread()
    }

    //去详情页
    toDesignView (data) {
        this.onRequestClose();
        const {navigate} = this.props.navigation;
        navigate('MainDetail',{title:'时尚简约风格'})
    }
    //跳转到搜索页面
    toSearchPage () {
        this.onRequestClose();
        const {navigate} = this.props.navigation;
        navigate('SearchPage')
    }
    Goreset () {
        this.onRequestClose();
        const {navigate} = this.props.navigation;
        navigate('ForgetPassword')
    }
    GoWork () {
        const {navigate} = this.props.navigation;
        navigate('WorkManage')
    }

    //打开登录框
    onRequestOpen() {    
        this.setState({
            isModal:true,
            isArea:false,
            isFill:false,
            isFinish:false,
        });
    }
    //关闭所有弹窗
    onRequestClose() {
        this.setState({
            isModal:false,
            isArea:false,
            isFill:false,
            isFinish:false,
        });
    }

    //注册页面02-选择地址
    GoArea () {
        this.setState({
            isModal:false,
            isArea:true,
        });      
    }


    //去填注册表
    Gofill() {
        let p = cityCode.CityZoneCode.China.Province[this.rowIndex0].name;
        let c = cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].name;
        let a = cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area[this.rowIndex2].name;
        this.setState({
            province:p,
            city:c,
            area:a,
        })
        this.setState({
            isModal:false,
            //isZhuce:false,
            isArea:false,
            isFill:true,
        });     
    }

    //完成注册
    GoFinish() {
        let data = this.DoZhuce();
        data.then(
            (result)=>{
                if(result){
                    //存储
                    console.log(result)
                    store.save('user', { token: result.token, type:result.type })   
                }else{
                    console.log('注册无返回')
                }
            }
        )  
    }
    async DoZhuce() {
        var that = this
        if(that.state.ZhuNum===''){
            ToastUtil.showShort('手机号不能为空')
        }else if(that.state.ZhuMa===''){
            ToastUtil.showShort('验证码不能为空')
        }else if(that.state.ZhuWord===''){
            ToastUtil.showShort('密码不能为空')
        }else if(that.state.ZhuWordYZ===''){
            ToastUtil.showShort('确认密码不能为空')
        }else if(that.state.zhuNc===''){
            ToastUtil.showShort('昵称不能为空')
        }else{
            try {
                let response = await fetch(`${url}/App/User/register`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:'phone='+that.state.ZhuNum+'&password='+that.state.ZhuWord+'&password_again='+that.state.ZhuWordYZ+'&name='+that.state.zhuNc+'&code='+that.state.ZhuMa+'&province='+that.state.province+'&city='+that.state.city+'&area='+that.state.area
                });
                let responseJson = await response.json();
                //return responseJson.data;
                if(responseJson.errorCode === 0){
                    ToastUtil.showShort("注册成功")
                    that.setState({
                        token:true,
                        isModal:false,
                        isArea:false,
                        isFill:false,
                    });
                    return responseJson.data      
                }else{
                    ToastUtil.showShort(responseJson.errorMsg,false)
                }    
            }catch(error) {
                console.error(error);
                ToastUtil.showShort(error,true)
            }
        }
    }

    Gocenter() {
        var that = this
        store.get('user').then(function(data){
            that.setState({
                lingToken:data.token,
                lingType:data.type,
            });  
            //console.log(that.state.lingType===1)
            if(that.state.lingType===1){
                const {navigate} = that.props.navigation;
                navigate('CenterPT')
                console.log('putong')
            }else{
                const {navigate} = that.props.navigation;
                navigate('Center')
                console.log('shangjia')
            }
        })
   
    }

    receiveMessage (e) {
        let message = e.nativeEvent.data
        console.log(message)
        const {navigate} = this.props.navigation;
        navigate('WorkDetail',{url:message})
    }


    
}

const styles = StyleSheet.create({
    container: { paddingTop:15, flex: 1, backgroundColor: '#151515', },
    modalViewStyle: { /*height:0.45*height*/ },
    popmsg: { height:0.55*height, backgroundColor:'white', borderRadius:10, },
    modalViewBStyle: { height:0.45*height, },
    biao: { justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#eee', paddingTop:16, paddingBottom:16, width:width, },
    biaoti: { fontSize:16, color:'#666', },
    fill: { alignItems:'center', paddingTop:10, },
    sg: { flexDirection:'row', justifyContent:'space-between', alignItems:'center',  borderBottomWidth:1, 
        borderBottomColor:'#eee',  width:width-30, },
    noneb: { borderBottomWidth:0, marginTop:20, marginBottom:10, },    
    noneba: { borderBottomWidth:0, paddingTop:15, paddingBottom:10, },
    imgb: { width:0.1*(width-30), alignItems:'center', },
    img: { width:0.06*(width-30), height:0.06*(width-30), },
    shuru: { width:0.9*(width-30), color:'#999', marginTop:12, marginBottom:12, },
    link: { fontSize:13, color:'#888', },
    textLoginViewStyle: { width: width - 30,  height: 40, backgroundColor: '#ae8300', borderRadius: 20, alignSelf: 'center', justifyContent: 'center',
        alignItems: 'center', },

    //登录Text文本样式
    textLoginStyle: { fontSize: 15, color: 'white', },
    text: { padding: 10, fontSize: 14, color:'#999' },
    Rbutton: { height:35, alignItems:'center', justifyContent:'space-between', },
    mid: { alignItems:'center',  paddingTop:13, },
    allWidth: { marginTop:13, width:width, borderTopWidth:1, borderTopColor:'#eee', backgroundColor:'#fff'},
    anniu: { alignItems:'center', justifyContent:'center', height:46, width:width },
    anniutip: { color:'#ae8303', fontSize:16 },
    kinda: {  height:38,  flexDirection: 'row',},
    ktext: {  flex:1, width:width%3, alignItems:'center', justifyContent:'center',},
    ktxt: { color:'#333', fontSize:14, },
    allWidth: {  flexDirection: 'row',  borderTopWidth:1, borderTopColor:'#eee', marginTop:10, },
    jun: { width:width*0.5,  alignItems:'center', justifyContent:'center', height:48, },
    jright: { borderLeftWidth:1, borderLeftColor:'#eee', },
    jtext: { color:'#b08400' },
    jtu: { flexDirection:'row', },
    modalViewStyleFill: { height:0.4*height, },
    popmsgFill: { height:0.6*height, backgroundColor:'white', borderRadius:10, },
    sgFill: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingTop:0, paddingBottom:0, borderBottomWidth:1,
        borderBottomColor:'#eee', width:width-30, },
    fillbtn: { width: width-30, height: 50, justifyContent: 'center', alignItems: 'center',  paddingTop:0, paddingBottom:0, marginTop:-8, },
    //登录Text文本样式
    filltext: { fontSize: 15, color: '#b08400', },   
    nonebaFill: { borderBottomWidth:0, paddingTop:8, paddingBottom:0, },
    fillFill: { alignItems:'center', paddingTop:5, },
    shuruFill: { width:0.9*(width-30), marginTop:2, marginBottom:2, color:'#999', fontSize:12, },
    small: { width:0.68*(width-30), },
    yanzheng: { width:0.22*(width-30), backgroundColor:'#eee', borderRadius:4, justifyContent:'center', alignItems:'center', height:26},
    ytext: { color:'#888', fontSize:10, },
    modalpage: { backgroundColor:'rgba(0,0,0,0.6)' }
});

