/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
let AutoResponisve = require('autoresponsive-react-native');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ListView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {data} from '../Components/ListViewData';
export default class DesignList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }
  static defaultProps = {
    popToHome: null
  }
  render() {
    return (
        /*<ListView
           dataSource={this.state.dataSource}
           renderRow={(rowdata)=>this.renderRow(rowdata)}
           contentContainerStyle={styles.contentViewStyle}
        />*/
        <ScrollView>
          <AutoResponisve {...this.getAutoResponsiveProps()}>
            {this.renderChildren()}
          </AutoResponisve>
        </ScrollView>
    );
  }
  getChildrenStyle(i) {
    let h = i%2==0?280:340
    return {
      width: (width - 5) / 2,
      height: h,
      backgroundColor: '#151515',
    };
  }
    getAutoResponsiveProps() {
    return {
      itemMargin: 3,
    };
  }
  renderChildren(){
    let arr = []
    data.map((item,i)=>{
      arr.push(
        <TouchableOpacity key={i} TouchableOpacity={0.5} onPress={()=>this.popToHome(i+'abc') } style={this.getChildrenStyle(i)} >
        <View>
          <Image source={item.img} style={{width:(width - 5) / 2}}/>
          <View style={[styles.tetStyle,{marginTop:10}]}>
            <Image source={item.icon} style={{width:12,height:11,marginLeft:2,marginRight:5}}/>
            <Text numberOfLines={5} style={{color:'#aaaaaa',width:width/2 -10,fontSize:12}}>{item.title}</Text>
          </View>
          <View style={[styles.tetStyle,{marginTop:8},{paddingLeft:5}]}>
            <Icon name="ios-share-alt-outline" size={15} color="#fff"/>
            <Text style={{color:'#aaaaaa',fontSize:10,marginLeft:3,marginRight:25}}>{item.share}</Text>
            <Icon name="ios-star-outline" size={15} color="#fff"/>
            <Text style={{color:'#aaaaaa',fontSize:10,marginLeft:3}}>{item.star}</Text>
          </View>
        </View>
        </TouchableOpacity>
        )
    })
    return arr
  }
  popToHome (data) {
    if(this.props.popToHome){
      this.props.popToHome(data)
    }
  }
  renderRow(rowdata){
      return (
        <View style={styles.container}>
          <Image source={rowdata.img} style={styles.imgStyle}/>
          <Text style={{color:'#aaaaaa'}}>{rowdata.title}</Text>
        </View>

      )
  }
}

const styles = StyleSheet.create({
  contentViewStyle: {
    flexDirection : 'row',
    flexWrap : 'wrap'
  },
  container: {
    backgroundColor: '#301711',
  },
  tetStyle:{
    flexDirection:'row',
    alignItems:'center'
  },
  itemStyle:{
    width: (width - 5) / 2,
    height: 260,
    backgroundColor: 'rgb(92, 67, 155)',
  }
  /*container:{
    width:width/2
  },
  imgStyle:{
    width:width/2
  }*/
});

