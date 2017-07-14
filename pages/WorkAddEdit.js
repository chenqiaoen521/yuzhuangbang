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
    Image,
    Dimensions,
    WebView,
    Alert,
    TouchableOpacity,
    TextInput,
    ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Wz';
import IconDetail from '../Components/IconDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';

//获取公共域名
var url = require('../config.json').url
//弹窗信息
import ToastUtil from '../utils/ToastUtil'
//存储登录信息
import store from 'react-native-simple-store';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
const host = require('../config.json').url;
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

export default class WorkAdd extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
        headerRight: (<View></View>),
        tabBarIcon: ({ tintColor }) => (
            <Icon name="mineicon" size={25} color={tintColor} style={{marginTop:1.5}}/>
        )
    });

    // 构造
    constructor(props) {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        var that = this;
        // 初始状态
        this.state = {
            dataSource: ds,
            yezz:'/Uploads/App/User/2017-07-10/1499678110_18964751705963459e176b2.jpg',
            biaoti:'测试 ',
            jianjie:'',
            xiang:'',
            zhizhao:'',
            tupian:[],
            images:[],
            token:'',
            activeid:'',
            norarr:[]
        };
    }
 
    componentDidMount() {
        let that =this;
        const {state} = this.props.navigation;
        let zpid = state.params.id;
        that.setState({  activeid:zpid, }); 
        store.get('user').then(
            function(data){
                that.setState({
                    token:data.token,
                });   
                that.Getxq(data.token,that.state.activeid)        
            })
     }
    componentWillMount () {
       
    }

    Getxq(token,id) {
        let that = this
        let data = this.Findxq(token,id);
        data.then(
            (result)=>{
                if(result){
                    //console.log('result')
                    console.log(result)
                    that.setState({
                        biaoti:result.name,
                        jianjie:result.desc,
                        xiang:result.introduce,
                        yezz:result.image,
                        zhizhao:result.image,
                        //dataSource:data.album,
                    });   
                    let arrc =[];
                    let l = result.album.length;
                    for(let i =0; i<l; i++){
                        arrc.push(result.album[i].image_url)
                    }
                    that.setState({ 
                        norarr:result.album
                    });
                    that.setState({ 
                        tupian:arrc,
                        //images:arrc
                    });
                    console.log('图片作品集')
                    console.log(that.state.tupian)
                }
            }
        )  
    }
    //先进详情页
    async Findxq(token,id) {
        console.log(token+'和'+id)
        var that = this
        try {
            let response = await fetch(`${url}/App/Role/add_edit_goods_detail?token=${token}&id=${id}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json();
            if(responseJson.errorCode===0){
                return responseJson.data;   
            }else{
                ToastUtil.showShort(responseJson.errorMsg,true)
            }
        } catch(error) {
            ToastUtil.showShort(error,true)
        } 
    }

    render() {
        console.log(this.state.yezz)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.flsg}>
                        <Text style={styles.ftit}>标题编辑</Text>
                        <TextInput style={[styles.shuru,{height:30}]} onChangeText={ (text) => this.setState({biaoti:text}) }  defaultValue={this.state.biaoti}  underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.flsg}>
                        <Text style={styles.ftit}>简介编辑</Text>
                        <TextInput style={styles.shuru} onChangeText={ (text) => this.setState({jianjie:text}) } multiline={true}  defaultValue={this.state.jianjie}  underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.flsg}>
                        <Text style={styles.ftit}>封面上传</Text>
                        <View style={styles.sendview}>
                        <TouchableOpacity  onPress={() => this.chooseImg(1)}>
                            <Image style={styles.img} resizeMode={'stretch'}  source={{uri:`${host}${this.state.yezz}`}} ></Image>
                            <View style={styles.fixtext}><Text style={styles.ftext}>重新上传</Text></View>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.flsg}>
                        <Text style={styles.ftit}>详情描述</Text>
                        <TextInput style={styles.shuru} onChangeText={ (text) => this.setState({xiang:text}) } multiline={true} defaultValue={this.state.xiang} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={[styles.flsg]}>
                        <ListView 
                            contentContainerStyle={styles.sendpro}
                            dataSource={this.state.dataSource.cloneWithRows(this.state.tupian)}
                            renderRow={(rowdata, sectionID, rowID)=>this.renderRow(rowdata,sectionID,rowID)}
                            initialListSize ={1} enableEmptySections={true}
                            renderFooter = {()=>this.renderFooter()} />
                            
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={ ()=> this.Goadd() }>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:10, paddingBottom:10,backgroundColor:'#ae8300',}}>
                        <Text style={{ fontSize:14, color:'#fff',}}>保存修改</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderFooter () {
        return (
            <TouchableOpacity onPress={()=> this.chooseImg(4) }>
                <View style={styles.cpbox}>
                    <Image style={styles.cptu} resizeMode={'stretch'} source={require('../imgs/sendzheng_17.png')}></Image>
                </View>
            </TouchableOpacity>   
            )
    }
    renderRow (row,a,b) {
        return (
            <TouchableOpacity onPress={()=>this.delImage(b,row)}>
                <View style={styles.cpbox}>
                    <Image style={styles.cptu} resizeMode={'stretch'} name={row}  source={{uri:`${host}${row}`}} ></Image>
                    <Image style={styles.cpbg} resizeMode={'stretch'}  source={require('../imgs/sendzheng_14.png')}></Image>
                </View>
            </TouchableOpacity>
        )
    }
    delImage(b,str) {
        console.log('要删图了')
        let arr = this.state.tupian;
        let arr2 = this.state.images;
        let chan = this.state.norarr.length
        let that = this
        let num = -1
        let strI = str
        let flg = 1;
        for(let i=0;i<chan;i++){
            if(strI==that.state.norarr[i].image_url){
               num = that.state.norarr[i].id;
            }
        }
        if(num>0){
            console.log('原有的')
            that.Godel(num);
        }

        if(flg){
            arr.splice(b,b+1);
            arr2.splice(b,b+1);
            this.setState({
                tupian:arr,
                //images:arr2
                images:arr2,
            });
            ToastUtil.showShort('图片已删除', false);
        }     
    }

    async Godel(num) {
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            //let response = await fetch(`${host}/App/Role/del_work_img?token=${that.state.token}&id=${num}`)
            //console.log(66666)
            //console.log(host +'/App/Role/del_work_img?token='+this.state.token+'&id='+ num)
            let response = await fetch( host +'/App/Role/del_work_img?token='+this.state.token+'&id='+ num, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            let responseJson = await response.json(); 
            console.log(responseJson)
            if(responseJson.errorCode!= 0){
                flg = 0;
                ToastUtil.showShort(responseJson.errorMsg, false);
            }
        }catch(error) {
            ToastUtil.showShort(error, false);
        }
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
                //yezz:`${host}${responseData.data.image}`,
                yezz:`${responseData.data.image}`,
                zhizhao:responseData.data.image
                })
                console.log(this.state.yezz)
            }

            if(flag==4){
                console.log('3333:'+responseData.data.image)
                let arrt = that.state.tupian;
                let images = that.state.images;
                //arr.push(`${host}${responseData.data.image}`);
                arrt.push(`${responseData.data.image}`);
                //images.push(responseData.data.image);
                images.push(`${responseData.data.image}`)
                that.setState({ tupian:arrt })
            }
            
        })  
        .catch((error)=>{console.error('error',error)});  
    } 

        //跳转
    Goadd() {
        let that = this
        this.setState({ images: this.state.tupian })
        console.log(this.state.tupian)
        console.log(this.state.images)
        const {navigate} = this.props.navigation;
        let token = this.state.token
        let a = this.state.biaoti
        let h= this.state.images
        if(!a) {ToastUtil.showShort('标题不能为空', false);return;}
        if(!this.state.jianjie) {ToastUtil.showShort('简介不能为空', false);return;}
        if(!this.state.xiang) {ToastUtil.showShort('详情不能为空', false);return;}
        if(!this.state.zhizhao) {ToastUtil.showShort('封面不能为空', false);return;}
        if(!this.state.images) {ToastUtil.showShort('相册不能为空', false);return;}
        let formData = new FormData();    
        formData.append("name",this.state.biaoti);
        formData.append("desc",this.state.jianjie); 
        formData.append("introduce",this.state.xiang);
        formData.append("image",this.state.zhizhao); 
        formData.append("id",this.state.activeid);
        
        formData.append("token",token); 
        /*if(this.state.tupian==this.state.images){*/
            for(let i=0;i<h.length;i++){
                formData.append("images[]",this.state.images[i]); 
            }
            this.submitUrl(formData).then((data)=>{ })
        /*}else{
            ToastUtil.showShort('网络繁忙，请稍候');
        }*/
    }
    async submitUrl(formData) {
        //console.log('formData')
        //console.log(formData)
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let response = await fetch(`${host}/App/Role/add_edit_goods`,{
              method:'POST',
              body:formData
            });
            let responseJson = await response.json(); 
            console.log(responseJson)
            if(responseJson.errorCode== 0){
                ToastUtil.showShort('作品修改成功', false);
                const {navigate} = this.props.navigation;
                navigate('WorkManage');
                return responseJson;
            }else{
                console.log('出错了')
                //ToastUtil.showShort(responseJson.errorMsg, false);
            }
        } catch(error) {
            ToastUtil.showShort(error, false);
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    flsg: {
        backgroundColor:'#1b1b1b',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
        borderBottomWidth:6,
        borderColor:'#151515',
        flexWrap:'wrap',
    },
    ftit: {
        fontSize:14,
        color:'#999',
        width:width-30,
        marginBottom:3,
    },
    shuru: {
        width:width-30,
        padding:0,
        paddingTop:5,
        paddingBottom:5,
        lineHeight:20,
        height:50,
        fontSize:13,
        color:'#999',
    },
    fixtext: {
        backgroundColor:'rgba(0,0,0,0.6)',
        height:37,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:0,
        bottom:-1,
        zIndex:3333,
        width:(width-30),
        alignSelf:'flex-end',
    },
    ftext:{
        color:'#fff',

    },
    img: {
        width:(width-30),
        height:(width-30)*0.5,
        padding:0,
        borderRadius:5,
    },
    sendview:{
        width:width-30,
        height:(width-30)*0.5,
        alignItems:'center',
        marginTop:10,
        borderRadius:8,
    },
    sendpro: {
        flexDirection:'row',
        flexWrap:'wrap',
    },
    cpbox: {
        paddingRight:10,
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
