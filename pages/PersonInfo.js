/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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
export default class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: '男',
            modalVisible: false
        };
        //三级联动
        this.rowIndex0 = 0;
        this.rowIndex1 = 0;
        this.rowIndex2 = 0;
    }
    static navigationOptions = {
        headerTitle:'个人资料',
        headerRight: (
            <Icon.Button name="bell-o" backgroundColor="transparent" underlayColor="transparent"
              activeOpacity={0.8} onPress={() => {  navigation.state.params.handleShare(); }}  />
        )
    }
    chooseImg () {
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            console.log('response'+response);
            if (response.didCancel){
                return
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Unit popToSetting={()=>this.chooseImg()} topColor="#151515" bgColor="#282828" txtCol="#999999" icon={require('../imgs/yihan.jpg')} title="头像"/>
                    <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="姓名" rightInput="刘德华"/>
                    <Unit topColor="#151515" bgColor="#282828" txtCol="#999999" title="昵称" rightInput="北七"/>
                    <Unit popToSetting={()=>this.GoPhone()} edit={false} topColor="#151515" bgColor="#282828" txtCol="#999999" title="手机号" rightInput="158****2135"/>
                    <View style={{marginTop:10}}>
                        <Unit popToSetting={()=>this.checkSex()} topColor="#151515" bgColor="#282828" txtCol="#999999" title="性别" rightTxt={this.state.sex}/>
                        <Unit topColor="#151515" popToSetting={()=>this.checkArea()} bgColor="#282828" txtCol="#999999" title="我的地址" />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.baocun}>
                    <Text style={{color:'#fff',fontSize:15}}>保存</Text>
                </TouchableOpacity>
                <ActionSheet ref={o => this.ActionSheet = o} options={options} cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.handlePress.bind(this)} />
                 {this.renderPicker()}
            </View>
        );
    }
    checkSex(){
        this.ActionSheet.show()
    }
    checkArea () {
        /*this.setState({
          modalVisible:true
        })*/
        const {navigate} = this.props.navigation;
        navigate('address');
    }
    //去换手机号
    GoPhone(){
        const {navigate} = this.props.navigation;
        navigate('ChangePhone');
    }

    cancelModal () {
        this.setState({
            modalVisible:false
        })
    }
    renderPicker () {
        return (
            <Modal animationType={"slide"} transparent={true} visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}} >
                <View style={styles.popmsg}>
                <View style={styles.biao}>
                    <TouchableOpacity onPress={()=>this.cancelModal()}><Text style={styles.biaoti}>取消</Text></TouchableOpacity>
                    <Text style={styles.biaoti}>所在地区选择</Text>
                    <TouchableOpacity onPress={()=>this.cancelModal()}><Text style={styles.biaoti}>确定</Text></TouchableOpacity>
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
                            onRowChange = {index => this.rowIndex2 = index}
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
