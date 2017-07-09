/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import ToastUtil from '../utils/ToastUtil';
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
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Button,
    Switch,
    Alert,
    Modal
} from 'react-native';
const CANCEL_INDEX = 0
const options = [  'Cancel','男', '女' ]
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import cityCode from '../Components/ChinaCityCode';
import Picker from 'react-native-roll-picker/lib/Picker';
const host = require('../config.json').url;
import store from 'react-native-simple-store';
export default class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: '男',
            modalVisible: false,
            avatar:'',
            name:'请填写姓名',
            nickname:'请填写昵称',
            phone:'请填写电话',
            province:'请填写省',
            city:'市',
            area:'区',
            token:''
        };
        //三级联动
        this.rowIndex0 = 0;
        this.rowIndex1 = 0;
        this.rowIndex2 = 0;
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle:'个人资料',
        headerRight: (
            <Icon.Button name="bell-o" backgroundColor="transparent" underlayColor="transparent"
              activeOpacity={0.8} onPress={() => {  navigation.state.params.handleShare(); }}  />
        )
    });
    componentDidMount() {
    this.props.navigation.setParams({ handleShare: ()=>this.onActionSelected() });
  }
  onActionSelected () {
    const {navigate} = this.props.navigation;
    navigate('Message');
  }
    uploadImage(uri){  
        let formData = new FormData();  
        let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};  
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
            this.setState({
               avatar: responseData.data.image
            })
        })  
        .catch((error)=>{console.error('error',error)});  
  
    }  

    componentWillMount () {
        let that = this;
        store.get('user').then(
      function(data){
          that.setState({
              token:data.token,
          }); 
          that.__init(data.token)          
    })
        
    }
    __init(token){
        let data = this.getData(token);
        data.then((result)=>{
            this.setState({
                sex: result.user_info.sex?result.user_info.sex:'男',
                avatar:result.user_info.avatar?result.user_info.avatar:'',
                name:result.user_info.name?result.user_info.name:'',
                nickname:result.user_info.nickname?result.user_info.nickname:'',
                phone:result.user_info.phone?result.user_info.phone:'',
                province:result.user_info.province?result.user_info.province:'',
                city:result.user_info.city?result.user_info.city:'',
                area:result.user_info.area?result.user_info.area:'',
            })
        })
    }
    async getData(token) {
        console.log(`${host}/App/Center/get_user_info?token=${token}`)
        try {   
          let response = await fetch(`${host}/App/Center/get_user_info?token=${token}`);
          let responseJson = await response.json();
          return responseJson.data;
        } catch(error) {
            console.error(error);
        }
    }
    chooseImg () {
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
            that.uploadImage(response.uri);
          }
        })
    }
    render() {
        let iconUrl = `${host}${this.state.avatar}`;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Unit popToSetting={()=>this.chooseImg.bind(this)()} topColor="#151515" bgColor="#282828" txtCol="#999999" icon={{uri:iconUrl}} title="头像"/>
                    <Unit popToSetting={(text)=>this.changeName(text)} topColor="#151515" bgColor="#282828" txtCol="#999999" title="姓名" rightInput={this.state.name}/>
                    <Unit popToSetting={(text)=>this.changeNick(text)} topColor="#151515" bgColor="#282828" txtCol="#999999" title="昵称" rightInput={this.state.nickname}/>
                    <Unit popToSetting={()=>this.GoPhone()} edit={false} topColor="#151515" bgColor="#282828" txtCol="#999999" editable={false} title="手机号" rightInput={this.state.phone}/>
                    <View style={{marginTop:10}}>
                        <Unit popToSetting={()=>this.checkSex()} topColor="#151515" bgColor="#282828" txtCol="#999999" title="性别" rightTxt={this.state.sex}/>
                        <Unit topColor="#151515" popToSetting={()=>this.checkArea()} bgColor="#282828" txtCol="#999999" title="我的地址" rightTxt={`${this.state.province}${this.state.city}${this.state.area}`}/>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.baocun} onPress={()=>this.submit()}>
                    <Text style={{color:'#fff',fontSize:15}}>保存</Text>
                </TouchableOpacity>
                <ActionSheet ref={o => this.ActionSheet = o} options={options} cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.handlePress.bind(this)} />
                 {this.renderPicker()}
            </View>
        );
    }
    changeName (text) {
        this.setState({
            name:text
        })
    }
    changeNick (text) {
        this.setState({
            nickname:text
        })
    }
    submit () {
        let token = this.state.token;
            let a =this.state.sex
            let b =this.state.avatar
            let c =this.state.name
            let d =this.state.nickname
            let f =this.state.province
            let g =this.state.city
            let h =this.state.area
        let formData = new FormData();    
        formData.append("sex",a);  
        formData.append("token",token);  
        formData.append("avatar",b);  
        formData.append("name",c);  
        formData.append("nickname",d);  
        formData.append("province",f);  
        formData.append("city",g);  
        formData.append("area",h);  
        this.submitUrl(formData).then((data)=>{
            if(data=="success"){
                ToastUtil.showShort('保存成功', false);
                const {goBack} = this.props.navigation;
                goBack(null);
            }else{
                ToastUtil.showShort(data, false);
            }
        })
    }
    async submitUrl(formData) {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch(`${host}/App/Center/set_user_info`,{
        method:'POST',
         body:formData
      });
      let responseJson = await response.json(); 
      return responseJson.errorMsg;
    } catch(error) {
      console.error(error);
    }
  }
    checkSex(){
        this.ActionSheet.show()
    }
    checkArea () {
        this.setState({
          modalVisible:true
        })
    }
    //去换手机号
    GoPhone(){
        /*const {navigate} = this.props.navigation;
        navigate('ChangePhone');*/
    }
    sureModal () {
        let p = cityCode.CityZoneCode.China.Province[this.rowIndex0].name;
        let c = cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].name;
        let a = cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area[this.rowIndex2].name;
        this.setState({
            modalVisible:false,
            province:p,
            city:c,
            area:a,
        })
    }
    cancelModal () {
        this.setState({
            modalVisible:false,
        })
    }
    renderPicker () {
    return (
       <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          >
          <View style={styles.popmsg}>
            <View style={styles.biao}>
              <TouchableOpacity onPress={()=>this.cancelModal()}><Text style={styles.biaoti}>取消</Text></TouchableOpacity>
              <Text style={styles.biaoti}>所在地区选择</Text>
              <TouchableOpacity onPress={()=>this.sureModal()}><Text style={styles.biaoti}>确定</Text></TouchableOpacity>
            </View>
              <View style = {styles.kinda}>
                  <View style = {styles.ktext}><Text style = {styles.ktxt}>省份</Text></View>
                  <View style = {styles.ktext}><Text style = {styles.ktxt}>市/区</Text></View>
                  <View style = {styles.ktext}><Text style = {styles.ktxt}>区县</Text></View>
              </View>
              <View style = {{height: height*0.55-144, flexDirection: 'row'}}>
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
                        onRowChange = {index => {
                            this.rowIndex2 = index;
                        }}
                    />
                </View>
              </View>
            </View>
        </Modal>
      )
  }
    handlePress(i) {
        if(i==0) return 
        let str = options[i]
        this.setState({
            sex: str
        })
    }
    toInfo () {
        const {navigate} = this.props.navigation;
        navigate('personInfo');
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#151515'
    },
    unitStyle:{
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems :'center',
        justifyContent :'space-between',
        padding:10,
        paddingTop:12,
        paddingBottom:12,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:0.5
    },
    baocun:{
        backgroundColor:'#ae8300',
        height:45,
        alignItems : 'center',
        justifyContent:'center'
    },
    popmsg: {
        height:0.55*height,
        backgroundColor:'#fff',
        borderRadius:10,
        position:'absolute',
        bottom:0
    },
    biao: {
        flexDirection:'row',
        justifyContent : 'space-around',
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
        fontSize:15,
    },
});
