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
    Modal,
    ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');
const host = require('../config.json').url;
import store from 'react-native-simple-store';
import ToastUtil from '../utils/ToastUtil';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
const photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
import Picker from 'react-native-roll-picker/lib/Picker2'
import cityCode from '../Components/ChinaCityCode'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class CreatShopSendb extends Component {
    static navigationOptions = {
        title:'资料提交',
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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 初始状态
        this.state = {
            isArea:false, //注册2选择地区
            dataSource: ds,
            text:'',
            index:0,
            textadr:'请选择公司所在地区',
            is_company:1,
            name:'',
            tel:'',
            company:'',
            address:'',
            detail_address:'',
            zhizhao:'',
            ID_back:'',
            ID_front:'',
            images:[],
            province:'请选择',
            city:'公司所',
            area:'在地区',
            yezz:require('../imgs/sendzheng_03.png'),
            sfzz:require('../imgs/sendzheng_07.png'),
            sfzf:require('../imgs/sendzheng_09.png'),
            tupian:[],
            phone:''
        };
        //三级联动
        this.rowIndex0 = 0;
        this.rowIndex1 = 0;
        this.rowIndex2 = 0;
        //单选框
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                {/*
                <View style={styles.single}>
                    <Text style={styles.lefttext}>姓名：</Text>
                    <TextInput style={styles.input} selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的名字' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>手机号：</Text>
                    <TextInput style={styles.input} selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的手机号' underlineColorAndroid="transparent"/>
                </View>*/}
                <View style={styles.single}>
                    <Text style={styles.lefttext}>状态选择：</Text>
                    <View style={styles.input2}>
                        <RadioGroup style={{width:width-30,flexDirection:'row'}} thickness={0} size={12} thickness={1} activeColor='#af8402' color='#fff' selectedIndex={0} onSelect = {(index, value) => this.onSelect(index, value)} >
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'设计公司'}> 
                                <Text style={{fontSize:13,color:'#fff'}}>设计公司</Text> 
                            </RadioButton>
                            <RadioButton style={{ alignItems:'center', paddingLeft:0 }} value={'自由设计师'} onPress={()=>alert(2)}> 
                                <Text style={{fontSize:13,color:'#fff'}}>自由设计师</Text> 
                            </RadioButton>
                        </RadioGroup>
                    </View>
                </View>
                {
                    this.state.index === 0 ? 
                <View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>公司名称：</Text>
                    <TextInput style={styles.input} selectionColor="#fff" onChangeText={(text) => this.setState({company:text}) } placeholderTextColor="#888" placeholder='请输入您的公司名称' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>描述：</Text>
                    <TextInput multiline={true} style={styles.input} onChangeText={(text) => this.setState({desc:text}) }  selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的公司简介' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>公司地址：</Text>
                    <TouchableOpacity onPress={()=>this.onRequestOpen()}>
                        <View style={[styles.input,styles.viewbg]}>
                            <Text style={{color:'#888',fontSize:13}}>{`${this.state.province}${this.state.city}${this.state.area}`}</Text>
                            <Image style={{width:20,height:12}} resizeMode={'center'} source={require('../imgs/right01.png')}></Image>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.single}>
                    <TextInput style={styles.textinput} onChangeText={(text) => this.setState({detail_address:text}) }  selectionColor="#fff" multiline={true} placeholderTextColor="#888" placeholder='请输入您公司的详细地址' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single2}>
                    <Text style={styles.midtext}>上传营业执照</Text>
                    <View style={styles.sendV}>
                        <View style={styles.sendview}>
                            <TouchableOpacity  onPress={() => this.chooseImg(1)}>
                                <Image style={styles.img1} source={this.state.yezz}></Image>
                                <View style={styles.fixtext}><Text style={styles.ftext}>点击上传</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.single2}>
                    <Text style={styles.midtext}>上传法人身份证正反面照</Text>
                    <View style={styles.sendV}>
                        <View style={styles.sendview2}>
                            <TouchableOpacity onPress={()=> this.chooseImg(2) }>
                                <Image style={styles.img2} source={this.state.sfzz}></Image>                            
                                <View style={styles.fixtext2}><Text style={styles.ftext2}>点击上传</Text></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sendview2}>
                            <TouchableOpacity onPress={()=> this.chooseImg(3) }>
                                <Image style={styles.img2} source={this.state.sfzf}></Image>
                                <View style={styles.fixtext2}><Text style={styles.ftext2}>点击上传</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </View>
                :
                <View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>姓名：</Text>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({name:text}) } selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的名字' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>手机号：</Text>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({phone:text}) } selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的手机号' underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.single}>
                    <Text style={styles.lefttext}>描述：</Text>
                    <TextInput multiline={true} style={styles.input} onChangeText={(text) => this.setState({desc:text}) }  selectionColor="#fff" placeholderTextColor="#888" placeholder='请输入您的简介' underlineColorAndroid="transparent"/>
                </View>
                </View>

                }
                <View style={styles.single3}>
                    <Text style={styles.midtext}>上传作品图片</Text>
                    <ListView 
                    contentContainerStyle={styles.sendpro}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.tupian)}
                    renderRow={(rowdata, sectionID, rowID)=>this.renderRow(rowdata,sectionID,rowID)}
                    initialListSize ={1}
                    renderFooter = {()=>this.renderFooter()}
                    />
                </View>
                <View style={{ paddingTop:6,paddingRight:15, paddingBottom:6, paddingLeft:15}}>
                    <Text style={styles.smalltip}>温馨提示：您需要提供八张以上产品图片以待审核，提供的图片越好越有助于更好的审核通过呦~~</Text>                   
                </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.GoWait()}>
                    <View style={styles.add}><Text style={styles.addt}>提交</Text></View>
                </TouchableOpacity>
                <Modal animationType='slide' transparent={true} visible={this.state.isArea} onRequestClose={() => {this.onRequestClose()}}  /*从底部滑入;;不透明;;是否显示;;android必须实现*/ >
                    <TouchableOpacity style={{height:height-293}} onPress={() => this.onRequestClose()}>
                        <Text style={{color:'red'}}></Text>
                    </TouchableOpacity>
                    <View style={{height:281, width:width, backgroundColor:'#fff', borderTopLeftRadius:10,borderTopRightRadius:10,}}>
                        <View style={{ borderBottomWidth:1,borderBottomColor:'#eee',height:35,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{ fontSize:14, color:'#777'}}>所在地区选择</Text>
                        </View>
                        <View>
                            <View style = {{height:36, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <View style = {{flex:1,alignItems:'center'}}><Text style = {{ color:'#222',fontSize:14}}>省份</Text></View>
                                <View style = {{flex:1,alignItems:'center'}}><Text style = {{ color:'#222',fontSize:14}}>市/区</Text></View>
                                <View style = {{flex:1,alignItems:'center'}}><Text style = {{ color:'#222',fontSize:14}}>区县</Text></View>
                            </View>
                            <View style = {{ height:165, flexDirection: 'row'}}>
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
                            <View style={{ alignItems:'center', flexDirection:'row',justifyContent:'center', marginTop:9, /*borderTopWidth:1,borderTopColor:'#eee',*/}}>
                                <TouchableOpacity onPress={() => this.onRequestClose()}>
                                    {/*登录按钮*/}
                                    <View style={{width:width*0.5,alignItems:'center',justifyContent:'center',backgroundColor:'#eee',height:36,}}>
                                        <Text style={{ fontSize:13,color:'#888'}}>取消</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.sureModal()}>
                                    {/*登录按钮*/}
                                    <View style={{width:width*0.5,alignItems:'center',justifyContent:'center',backgroundColor:'#ae8300',height:36,}}>
                                        <Text style={{ fontSize:13,color:'#fff'}}>确认</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>             
                         </View>
                    </View>
                </Modal>   
            </View>
        );
    }
    //跳转
    GoWait() {
        const {navigate} = this.props.navigation;
        let token = this.state.token
        let a = this.state.name
        let b= this.state.company
        let c= this.state.address
        let d= this.state.detail_address
        let e= this.state.zhizhao
        let f= this.state.ID_back
        let g= this.state.ID_front
        let h= this.state.images
        let i= this.state.desc
        let j= this.state.phone
        let k= this.state.is_company
        let formData = new FormData();    
        if(k == 0){
            if(!a) {ToastUtil.showShort('姓名不能为空', false);return;}
            if(!j) {ToastUtil.showShort('电话不能为空', false);return;}
            formData.append("name",a);
            formData.append("tel",j);
        }else if (k==1){
            if(!b) {ToastUtil.showShort('姓名不能为空', false);return;}
            if(!c) {ToastUtil.showShort('区域不能为空', false);return;}
            if(!e) {ToastUtil.showShort('营业执照不能为空', false);return;}
            if(!f) {ToastUtil.showShort('身份证不能为空', false);return;}
            if(!g) {ToastUtil.showShort('身份证不能为空', false);return;}
            formData.append("company",b); 
            formData.append("company_address",c+','+d);
            formData.append("zhizhao",e); 
            formData.append("ID_back",f);
            formData.append("ID_front",g); 
        } 
        
        
        formData.append("is_company",k); 
        for(let i=0;i<h.length;i++){
            formData.append("image[]",h[i]); 
        }
        if(!i) {ToastUtil.showShort('描述不能为空', false);return;}
        formData.append("desc",i); 
        formData.append("token",token); 
        this.submitUrl(formData).then((data)=>{
            if(data== 'success'){
              ToastUtil.showShort('提交成功', false);
                navigate('CreatShopWait',{idcard:'设计师'});  
            }else{
                ToastUtil.showShort('提交失败请稍后再试', false);
            }
        })
    }
    async submitUrl(formData) {
        try {
          // 注意这里的await语句，其所在的函数必须有async关键字声明
          let response = await fetch(`${host}/App/Auth/add_designer`,{
            method:'POST',
            body:formData
          });
          let responseJson = await response.json(); 
          return responseJson.errorMsg;
        } catch(error) {
            ToastUtil.showShort(error, false);
        }
    }
    sureModal () {
        let p = cityCode.CityZoneCode.China.Province[this.rowIndex0].name;
        let c = cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].name;
        let a = cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area[this.rowIndex2].name;
        this.setState({
            isArea:false,
            province:p,
            city:c,
            area:a,
            address:p+c+a
        })
    }
    renderFooter () {
        return (
            <TouchableOpacity onPress={()=> this.chooseImg(4) }>
                <View style={styles.cpbox}>
                    <Image style={styles.cptu} resizeMode={'center'} source={require('../imgs/sendzheng_17.png')}></Image>
                </View>
            </TouchableOpacity>   
            )
    }
    renderRow (row,a,b) {

        return (
            <TouchableOpacity onPress={()=>this.delImage(b)}>
                <View style={styles.cpbox}>
                    <Image style={styles.cptu} resizeMode={'center'} source={row}></Image>
                    <Image style={styles.cpbg} resizeMode={'center'}  source={require('../imgs/sendzheng_14.png')}></Image>
                </View>
            </TouchableOpacity>
        )

    }
    componentWillMount () {
        let that = this;
        store.get('user').then(
          function(data){
              that.setState({
                  token:data.token,
              });           
        })
    }
    onSelect(index, value){
        if(index==0)
        {
            this.setState({
                is_company:1,
            })
        }else if (index==1) {
            this.setState({
                is_company:0
            })
        }
        this.setState({
            index:index,
            text: `Selected index: ${index} , value: ${value}`,
        })
    }
    chooseImg (flag) {
        let that = this;
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            that.uploadImage(response.uri,flag);
          }
        })
    }

    uploadImage(uri,flag){  
        let formData = new FormData();  
        let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};  
        let that = this;
        formData.append("image",file);  
        fetch(`${host}/App/User/upload_image`,{  
            method:'POST',  
            headers:{  
                'Content-Type':'multipart/form-data',  
            },  
            body:formData,  
        })  
        .then((response) => response.json() )  
        .then((responseData)=>{  
            if(flag==1){
                this.setState({
                yezz:{uri:`${host}${responseData.data.image}`},
                zhizhao:responseData.data.image
                })
            }
            if(flag==2){
                this.setState({
                sfzz:{uri:`${host}${responseData.data.image}`},
                ID_front:responseData.data.image
                })
            }
            if(flag==3){
                this.setState({
                sfzf:{uri:`${host}${responseData.data.image}`},
                ID_back:responseData.data.image
                })
            }
            if(flag==4){
                let arr = this.state.tupian;
                let images = this.state.images;
                arr.push({uri:`${host}${responseData.data.image}`});
                images.push(responseData.data.image);
                this.setState({
                    tupian:arr,
                    images:images
                })
            }
            
        })  
        .catch((error)=>{console.error('error',error)});  
  
    } 

    delImage(b) {
        let arr = this.state.tupian;
        let arr2 = this.state.images;
        arr.splice(b,b+1);
        arr2.splice(b,b+1);
        this.setState({
            tupian:arr,
            images:arr2
        });
        ToastUtil.showShort('图片已删除', false);
    }

    //打开登录框
    onRequestOpen() {    
        this.setState({
            isArea:true,
        });
    }
    //关闭所有弹窗
    onRequestClose() {
        this.setState({
            isArea:false,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#151515'
    },
    single: {
        marginBottom:2,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between',
        backgroundColor:'#1b1b1b',
        flexDirection:'row',  
        alignItems:'center',
        width:width,
    },
    lefttext: {
        color:'#ccc',
        fontSize:14,
        width:(width-20)*0.28,
    },
    midtext: {
        color:'#ccc',
        width:width-20,
        textAlign:'center'
    },
    input: {
        color:'#888',
        fontSize:13,
        width:(width-20)*0.72,
        height:34,
        paddingLeft:5,
    },
    input2: {
        width:(width-20)*0.72,
        height:34,
        paddingLeft:5,
    },
    viewbg: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:0
    },
    textinput: {
        width:(width-20),
        fontSize:13,
        color:'#ccc',
        height:60,
        paddingLeft:0,
        paddingRight:0,
    },
    single2: {
        marginBottom:3,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        backgroundColor:'#1b1b1b',
        alignItems:'center',
    },
    single3: {
        marginBottom:3,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        backgroundColor:'#1b1b1b',
    },
    sendV: {
        flexDirection:'row',
        alignItems:'center',
    },
    sendview2:{
        width:(width-20)*0.5-10,
        height:((width-20)*0.5-10)*278/404,
        marginLeft:5,
        marginRight:5,
        alignItems:'center',
        marginTop:10,
    },
    img1: {
        width:(width-20)*0.7,
        height:(width-20)*0.7*278/404,
        padding:0,
        borderRadius:5,
    },
    img2: {
        width:(width-20)*0.5-10,
        height:((width-20)*0.5-10)*197/286,
        padding:0,
        borderRadius:5,
    },
    sendview:{
        width:(width-20)*0.7,
        height:(width-20)*0.7*278/404,
        alignItems:'center',
        marginTop:10,
        borderRadius:8,
    },
    fixtext: {
        backgroundColor:'rgba(0,0,0,0.3)',
        height:37,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:0,
        bottom:-1,
        zIndex:3333,
        width:(width-20)*0.7,
        alignSelf:'flex-end',
        marginTop:(width-20)*0.7*278/404-36
    },
    fixtext2: {
        backgroundColor:'rgba(0,0,0,0.3)',
        height:24,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:0,
        bottom:-1,
        zIndex:3333,
        width:(width-20)*0.5-10,
        alignSelf:'flex-end',
        marginTop:((width-20)*0.5-10)*197/286-22
    },
    ftext: {
        color:'#666',
        fontSize:14,
    },
    ftext2: {
        color:'#666',
        fontSize:11,
    },
    smalltip: {
        color:'#535353', 
        fontSize:12,
        lineHeight:20
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
    },
    sendpro: {
        flexDirection:'row',
    },
    cpbox: {
        paddingRight:12,
        paddingTop:12,
        position:'relative',
    },
    cpbg: {
        width:12,
        height:12,
        position:'absolute',
        right:8,
        top:8,
        zIndex:3,
    },
    cptu: {
        width:60,
        height:60,
        borderRadius:4,
    }    
});
