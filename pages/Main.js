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
    ScrollView,
    Alert,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
    TextInput,
    Platform,
    WebView
} from 'react-native';
import Search from '../Components/Search';
import Slider from '../Components/Slider';
import Notice from '../Components/Notice';
import HomeTitle from '../Components/HomeTitle';
import DesignList from '../Components/DesignList';
import Icon from 'react-native-vector-icons/Wz';

import RNCarousel from '../Components/RNCarousel';


import Picker from 'react-native-roll-picker/lib/Picker2'
import cityCode from '../Components/ChinaCityCode'

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
        };
        //三级联动
        this.rowIndex0 = 0;
        this.rowIndex1 = 0;
        this.rowIndex2 = 0;
        //单选框
        this.onSelect = this.onSelect.bind(this)
    }
    receiveMessage (e) {
        let message = e.nativeEvent.data
    }
    render() {      
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{alignItems: 'center', flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingLeft:10,paddingTop:3,paddingBottom:3}}>
                        <Search popToHome={()=>this.toSearchPage()}  />
                        <TouchableOpacity style={{width:0.15*width, alignItems: 'center',justifyContent:'center'}} onPress={()=>this.onRequestOpen()}>
                            {/*<Image style={{width:26, height:26}} source={require('./../imgs/loginpng_10.png')}></Image>*/}
                            <View><Text style={{fontSize:13,color:'#fff'}}>登录</Text></View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{marginTop:5}}>
                        <Slider/>
                    </View>
                {/*

                    <View style={{marginTop:5}}>
                        <RNCarousel/>
                    </View>
                */}
                    
                    <View style={{marginTop:5}}>
                        <Notice/>
                    </View>
                    <HomeTitle/>
                     <WebView
                          automaticallyAdjustContentInsets={false}
                          style={styles.webView}
                          source={require('../fw/main.html')}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          onMessage={this.receiveMessage.bind(this)}
                          decelerationRate="normal"
                          startInLoadingState={false}
                          scalesPageToFit={false} />
                </ScrollView>
               
                <Modal  
                    animationType='slide'          // 从底部滑入
                    transparent={true}             // 不透明
                    visible={this.state.isModal}   // 根据isModal决定是否显示
                    onRequestClose={() => {this.onRequestClose()}}  // android必须实现
                    style={styles.modelpage}
                    >
                    <TouchableOpacity style={styles.modalViewStyle} onPress={() => this.onRequestClose()}>
                        <Text style={{color:'red'}}></Text>
                    </TouchableOpacity>
                    <View style={styles.popmsg}>
                        <View style={styles.biao}><Text style={styles.biaoti}>用户登录</Text></View>
                        <View style={styles.fill}>
                            <View style={styles.sg}>
                                <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon02.png')}></Image></View>
                                <TextInput style={styles.shuru} placeholder='手机号' keyboardType={'numeric'} maxLength={11}  underlineColorAndroid="transparent"/>
                            </View>
                            <View style={styles.sg}>
                                <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon03.png')}></Image></View>
                                <TextInput style={styles.shuru} placeholder='密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                            </View>
                            <View style={[styles.sg , styles.noneb]} >
                                <TouchableOpacity onPress={() => this.Gozhuce()}><Text style={styles.link}>注册账号</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.Goreset()}><Text style={styles.link}>忘记密码？</Text></TouchableOpacity>
                            </View>
                            <View style={[styles.sg , styles.noneba]}>
                                <TouchableOpacity onPress={()=>{alert('点击登录')}}>
                                    {/*登录按钮*/}
                                    <View style={styles.textLoginViewStyle}>
                                        <Text style={styles.textLoginStyle}>登录</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>   
                <Modal animationType='slide' transparent={true} visible={this.state.isZhuce} onRequestClose={() => {this.onRequestClose()}}  
                    // 从底部滑入;;不透明;;是否显示;;android必须实现
                    style={styles.modelpage} >

                    <TouchableOpacity style={styles.modalViewStyle} onPress={() => this.onRequestClose()}>
                        <Text style={{color:'red'}}></Text>
                    </TouchableOpacity>
                    <View style={styles.popmsg}>
                        <View style={styles.biao}><Text style={styles.biaoti}>身份选择</Text></View>
                        <View style={styles.mid}>
                            <RadioGroup style={{width:width-30}} thickness={0} size={14} thickness={1} activeColor='#af8402' color='#ddd' highlightColor='#fff' selectedIndex={0} onSelect = {(index, value) => this.onSelect(index, value)} >
                                <RadioButton style={styles.Rbutton} value={'业主'}> 
                                    <Text style={{fontSize:14}}>业主</Text> 
                                </RadioButton>

                                <RadioButton style={styles.Rbutton} value={'超管'}> 
                                    <Text style={{fontSize:14}}>超管</Text> 
                                </RadioButton>

                                <RadioButton style={styles.Rbutton} value={'商户'}> 
                                    <Text style={{fontSize:14}}>商户</Text> 
                                </RadioButton>

                                <RadioButton style={styles.Rbutton} value={'施工方'}> 
                                    <Text style={{fontSize:14}}>施工方</Text> 
                                </RadioButton>

                                <RadioButton style={styles.Rbutton} value={'设计师'}> 
                                    <Text style={{fontSize:14}}>设计师</Text> 
                                </RadioButton>

                            </RadioGroup>
                            {/*<Text style={styles.text}>{this.state.text}</Text>*/}
                            <View style={styles.allWidth}>
                                <TouchableOpacity onPress={()=>this.GoArea()}>
                                    {/*登录按钮*/}
                                    <View style={styles.anniu}>
                                        <Text style={styles.anniutip}>下一步</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                         </View>
                    </View>
                </Modal>  
                <Modal animationType='slide' transparent={true} visible={this.state.isArea} onRequestClose={() => {this.onRequestClose()}}  
                    // 从底部滑入;;不透明;;是否显示;;android必须实现
                    style={styles.modelpage} >

                    <TouchableOpacity style={styles.modalViewStyle} onPress={() => this.onRequestClose()}>
                        <Text style={{color:'red'}}></Text>
                    </TouchableOpacity>
                    <View style={styles.popmsg}>
                        <View style={styles.biao}><Text style={styles.biaoti}>所在地区选择</Text></View>
                        <View>
                            <View style = {styles.kinda}>
                                <View style = {styles.ktext}><Text style = {styles.ktxt}>省份</Text></View>
                                <View style = {styles.ktext}><Text style = {styles.ktxt}>市/区</Text></View>
                                <View style = {styles.ktext}><Text style = {styles.ktxt}>区县</Text></View>
                            </View>
                            <View style = {{/*height: height*0.55-144,*/ height:165, flexDirection: 'row'}}>
                                
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
                                    {/*登录按钮*/}
                                    <View style={[styles.jun,styles.jtu]}>
                                        <Text style={styles.jtext}>一键获取</Text>
                                        <Image style={{width:16, height:16,marginLeft:5}} source={require('./../imgs/dlweizhi.png')}></Image>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.Gofill()}>
                                    {/*登录按钮*/}
                                    <View style={[styles.jun,styles.jright]}>
                                        <Text style={styles.jtext}>下一步</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                         </View>
                    </View>
                </Modal>   
                <Modal  
                    animationType='slide'          // 从底部滑入
                    transparent={true}             // 不透明
                    visible={this.state.isFill}   // 根据isFill决定是否显示
                    onRequestClose={() => {this.onRequestClose()}}  // android必须实现
                    style={styles.modelpage}
                    >
                    <TouchableOpacity style={styles.modalViewStyleFill} onPress={() => this.onRequestClose()}>
                        <Text style={{color:'red'}}></Text>
                    </TouchableOpacity>
                    <View style={styles.popmsgFill}>
                        <View style={styles.biao}><Text style={styles.biaoti}>注册信息</Text></View>
                        <View style={styles.fillFill}>
                            <View style={styles.sgFill}>
                                <View style={styles.imgb}>
                                    <Image style={styles.img} source={require('./../imgs/dlicon02.png')}></Image>
                                </View>
                                <TextInput style={styles.shuruFill} placeholder='请填写您的手机号' keyboardType={'numeric'} maxLength={11}  underlineColorAndroid="transparent"/>
                            </View>
                            <View style={styles.sgFill}>
                                <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon04.png')}></Image></View>
                                <TextInput style={[styles.shuruFill,styles.small]} placeholder='请输入验证码' underlineColorAndroid="transparent"/>
                                <TouchableOpacity>
                                    {/*验证码按钮*/}
                                    <View style={styles.yanzheng}>
                                        <Text style={styles.ytext}>获取验证码</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.sgFill}>
                                <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon03.png')}></Image></View>
                                <TextInput style={styles.shuruFill} placeholder='请设置您的密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                            </View>
                            <View style={styles.sgFill}>
                                <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon03.png')}></Image></View>
                                <TextInput style={styles.shuruFill} placeholder='请再次输入密码' secureTextEntry={true} underlineColorAndroid="transparent"/>
                            </View>
                            <View style={styles.sgFill}>
                                <View style={styles.imgb}><Image style={styles.img} source={require('./../imgs/dlicon05.png')}></Image></View>
                                <TextInput style={styles.shuruFill} placeholder='请输入您的昵称' underlineColorAndroid="transparent"/>
                            </View>
                            
                            <View style={[styles.sgFill , styles.nonebaFill]}>
                                <TouchableOpacity onPress={()=>this.GoFinish()}>
                                    {/*登录按钮*/}
                                    <View style={styles.fillbtn}>
                                        <Text style={styles.filltext}>立即注册</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>  
                <Modal  
                    animationType='slide'          // 从底部滑入
                    transparent={true}             // 不透明
                    visible={this.state.isFinish}   // 根据isFill决定是否显示
                    onRequestClose={() => {this.onRequestClose()}}  // android必须实现
                    style={styles.modelpage}
                    >
                    <TouchableOpacity style={{height:0.6*height}} onPress={() => this.onRequestClose()}>
                        <Text style={{color:'red'}}></Text>
                    </TouchableOpacity>
                   <View style={{height:0.4*height,backgroundColor:'white',borderRadius:10}}>
                        <View style={styles.biao}><Text style={styles.biaoti}>注册成功</Text></View>
                        <View style={{ height:height*0.4-99,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                             <Image style={{width:26, height:26,marginRight:10,}} source={require('./../imgs/dlok.png')}></Image>
                            <Text style={{color:'#777',fontSize:16}}>恭喜您注册成功</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>this.onRequestOpen()}>
                                
                                <View style={{height:40,alignItems:'center',justifyContent:'center',backgroundColor:'#b08400'}}>
                                    <Text style={{color:'#fff',fontSize:16}}>立即登录</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>   
            </View>
        );
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
            isZhuce:false,
            isArea:false,
            isFill:false,
            isFinish:false,
        });
    }
    //关闭所有弹窗
    onRequestClose() {
        this.setState({
            isModal:false,
            isZhuce:false,
            isArea:false,
            isFill:false,
            isFinish:false,
        });
    }
    //关闭登录去注册01
    Gozhuce () {
        this.setState({
            isModal:false,
            isZhuce:true,
        });  
    }
    //注册页面02-选择地址
    GoArea () {
        this.setState({
            isModal:false,
            isZhuce:false,
            isArea:true,
        });      
    }
    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }
    Gofill() {
        this.setState({
            isModal:false,
            isZhuce:false,
            isArea:false,
            isFill:true,
        });     
    }
    GoFinish() {
        this.setState({
            isModal:false,
            isZhuce:false,
            isArea:false,
            isFill:false,
            isFinish:true,
        });   
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:15,
        flex: 1,
        backgroundColor: '#151515',
    },
    modalViewStyle: {
        height:0.45*height,
    },
    popmsg: {
        height:0.55*height,
        backgroundColor:'white',
        borderRadius:10,
    },
    webView:{
        height:655
    },
    biao: {
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        paddingTop:12,
        paddingBottom:12,
        width:width,
    },
    biaoti: {
        fontSize:16,
        color:'#666',
    },
    fill: {
        alignItems:'center',
        paddingTop:10,
    },
    sg: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#eee',     
        width:width-30,
    },
    noneb: {
        borderBottomWidth:0,
        paddingTop:20,
        paddingBottom:10,
    },    
    noneba: {
        borderBottomWidth:0,
        paddingTop:15,
        paddingBottom:10,
    },
    imgb: {
        width:0.1*(width-30),
        alignItems:'center',
    },
    img: {
        width:0.06*(width-30),
        height:0.06*(width-30),
    },
    shuru: {
        width:0.9*(width-30),
        color:'#999',
        height:36,
        //marginTop: Platform.OS === 'ios' ? 4 : 8,
    },
    link: {
        fontSize:13,
        color:'#888',
    },
    textLoginViewStyle: {
        width: width - 30,
        height: 40,
        backgroundColor: '#ae8300',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //登录Text文本样式
    textLoginStyle: {
        fontSize: 15,
        color: 'white',
    },
    text: {
        padding: 10,
        fontSize: 14,
        color:'#999'
    },
    Rbutton: { 
        height:35, 
        alignItems:'center', 
        justifyContent:'space-between', 
        //color:'red',
    },
    mid: {
        alignItems:'center',
        paddingTop:13,
    },
    allWidth: {
        marginTop:13,
        width:width,
        borderTopWidth:1,
        borderTopColor:'#eee',
        backgroundColor:'#fff'
    },
    anniu: {
        alignItems:'center',
        justifyContent:'center',
        height:46,
        width:width
    },
    anniutip: {
        color:'#ae8303',
        fontSize:16
    },
    kinda: {
        height:34,
        flexDirection: 'row',
    },
    ktext: {
        flex:1,
        width:width%3,
        alignItems:'center',
        justifyContent:'center',
    },
    ktxt: {
        color:'#333',
        fontSize:14,
    },
    allWidth: {
        flexDirection: 'row',
        borderTopWidth:1,
        borderTopColor:'#eee',
        marginTop:10,
    },
    jun: {
        width:width*0.5,
        alignItems:'center',
        justifyContent:'center',
        height:38,
        backgroundColor:'#fff'
    },
    jright: {
        borderLeftWidth:1,
        borderLeftColor:'#eee',
    },
    jtext: {
        color:'#b08400'
    },
    jtu: {
        flexDirection: 'row',
    },

    modalViewStyleFill: {
        height:0.4*height,
    },
    popmsgFill: {
        height:0.6*height,
        backgroundColor:'white',
        borderRadius:10,
    },
    sgFill: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:3,
        paddingBottom:3,
        borderBottomWidth:1,
        borderBottomColor:'#eee',     
        width:width-30,
    },
    fillbtn: {
        width: width-30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:0,
        paddingBottom:0,
        marginTop:-8,
    },
    //登录Text文本样式
    filltext: {
        fontSize: 15,
        color: '#b08400',
    },   
    nonebaFill: {
        borderBottomWidth:0,
        paddingTop:8,
        paddingBottom:0,
    },
    fillFill: {
        alignItems:'center',
        paddingTop:5,
    },
    shuruFill: {
        width:0.9*(width-30),
        height:38,
        color:'#999',
        fontSize:12,
        //marginTop: Platform.OS === 'ios' ? 4: 8,
    },
    small: {
        width:0.7*(width-30),
    },
    yanzheng: {
        width:0.2*(width-30),
        backgroundColor:'#eee',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        height:26
    },
    ytext: {
        color:'#888',
        fontSize:10,
    }
});

