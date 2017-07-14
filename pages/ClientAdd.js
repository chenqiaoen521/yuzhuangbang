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
    TextInput,
    TouchableOpacity,
    Platform,
    ScrollView,
    Modal,
    ListView
} from 'react-native';
var {width,height} = Dimensions.get('window');
const host = require('../config.json').url;
import ToastUtil from '../utils/ToastUtil';
import store from 'react-native-simple-store';
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

export default class ClientAdd extends Component {
    static navigationOptions = {
        headerTitle:'添加动态',
        headerRight: (<View></View>),
    }
    // 构造
    constructor(props) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        // 初始状态
        this.state = {
            dataSource: ds,

            image:null,

            tupian:[],
            images:[],
            token:'',
            contact_id:'',
            content:''
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                <View style={styles.single}>
                    <TextInput style={styles.textinput} selectionColor="#fff" multiline={true} onChangeText={(text) => this.setState({content:text}) } placeholderTextColor="#888" placeholder='请输入您想说的内容' underlineColorAndroid="transparent"/>
                </View>
                
                <View style={styles.single3}>
                    <Text style={styles.midtext}>上传图片</Text>
                    <ListView 
                    contentContainerStyle={styles.sendpro}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.tupian)}
                    renderRow={(rowdata, sectionID, rowID)=>this.renderRow(rowdata,sectionID,rowID)}
                    initialListSize ={1}
                    renderFooter = {()=>this.renderFooter()}
                    enableEmptySections={true}
                    />
                        {/*<TouchableOpacity onPress={()=> alert(1) }>
                        <View style={styles.cpbox}>
                            <Image style={styles.cptu} resizeMode={'center'} source={require('../imgs/sendzheng_20.png')}></Image>
                            <Image style={styles.cpbg} resizeMode={'center'}  source={require('../imgs/sendzheng_14.png')}></Image>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> alert(1) }>
                        <View style={styles.cpbox}>
                            <Image style={styles.cptu} resizeMode={'center'} source={require('../imgs/sendzheng_24.png')}></Image>
                            <Image style={styles.cpbg} resizeMode={'center'}  source={require('../imgs/sendzheng_14.png')}></Image>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.chooseImg() }>
                        <View style={styles.cpbox}>
                            <Image style={styles.cptu} resizeMode={'center'} source={require('../imgs/sendzheng_17.png')}></Image>
                        </View>
                        </TouchableOpacity>    */}
                </View>
                {/*<View style={{ paddingTop:6,paddingRight:15, paddingBottom:6, paddingLeft:15}}>
                    <Text style={styles.smalltip}>温馨提示：您需要提供八张以上产品图片以待审核，提供的图片越好越有助于更好的审核通过呦~~</Text>                   
                </View>*/}
                </ScrollView>
                <TouchableOpacity onPress={() => this.GoWait()}>
                    <View style={styles.add}><Text style={styles.addt}>提交</Text></View>
                </TouchableOpacity>  
            </View>
        );
    }

    componentWillMount () {
        let id = this.props.navigation.state.params.id;
        let that =this;
        this.setState({
            contact_id:id
        })
      store.get('user').then(
        function(data){
          that.setState({
              token:data.token,
          });           
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
    //跳转
    GoWait() {
        const {navigate,goBack} = this.props.navigation;
        let token = this.state.token;
        let h= this.state.images;
        let b= this.state.contact_id;
        let c= this.state.content;
        if(!c) {ToastUtil.showShort('描述不能为空', false);return;}
        if(h.length==0) {ToastUtil.showShort('图片不能为空', false);return;}
        let formData = new FormData();    
        /*for(let i=0;i<h.length;i++){
            formData.append("image[]",h[i]); 
        }*/
        formData.append("token",token); 
        formData.append("content",c);
        formData.append("contact_id",b);
        formData.append("images",h.join(","));
        this.submitUrl(formData).then((data)=>{
            if(data== 'success'){
              ToastUtil.showShort('提交成功', false);
               goBack(null);
            }else{
                ToastUtil.showShort('提交失败请稍后再试', false);
            }
            
        })
    }
    async submitUrl(formData) {
        try {
          // 注意这里的await语句，其所在的函数必须有async关键字声明
          let response = await fetch(`${host}/App/Role/add_dynamic`,{
            method:'POST',
            body:formData
          });
          let responseJson = await response.json(); 
          return responseJson.errorMsg;
        } catch(error) {
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
    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
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
        //textAlign:'center'
    },
    TextView: {
        //textAlign :'left',
        //fontSize:13,
        width:(width-20)*0.72,
        height:34,
        paddingLeft:5,
    },
    input: {
        //textAlign :'left',
        color:'#888',
        //fontSize:13,
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
