/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Unit from '../Components/Unit';
import ActionSheet from 'react-native-actionsheet';
import LoadingView from '../Components/LoadingView';
import * as listActionCreators from '../actions/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from 'react-native-simple-store';
class Message extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      token:''
    };
  }
static navigationOptions = ({ navigation }) => ({
    headerTitle:'我的消息',
    headerRight:null
 });

  componentWillMount () {
    let that = this;
    store.get('user').then(
      function(data){
          that.setState({
              token:data.token,
          }); 
          that.__init(data.token);          
    })
  }
  __init (token) {
    const {listActions} = this.props;
    listActions.requestArticleList(false,true,false,token)
  }
  componentWillReceiveProps(nextProps) {
    const { list } = this.props;
    if (
      list.isLoadMore &&
      !nextProps.list.isLoadMore &&
      !nextProps.list.isRefreshing
    ) {
      if (nextProps.list.noMore) {
        ToastUtil.showShort('没有更多数据了');
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>                                                   
    );
  }
  renderContent(){
    if(this.props.list.loading){
      return (
        <LoadingView/>
        )
    }else{
      if(this.props.list.articleList.length == 0 ){
        return (
          <View style={{flexDirection:'row',height:250,justifyContent:'center',alignItems : 'center'}}>
            <Text style={{color:"#fff"}}>  暂无数据</Text>
          </View>
          )
      }else{
      return this.props.list.articleList.length==0?(<View style={{justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:17}}>暂无数据</Text></View>): (
        <ListView
             dataSource={this.state.dataSource.cloneWithRows(this.props.list.articleList)}
             renderRow={(rowdata)=>this.renderRow(rowdata)}
             contentContainerStyle={styles.contentViewStyle}
             enableEmptySections={true}
             initialListSize ={1}
             onEndReached={() => this.onEndReached()}
             onEndReachedThreshold ={100}
             renderFooter={()=>this.renderFooter()}
             refreshControl={
                <RefreshControl
                  style={styles.refreshControlBase}
                  refreshing={this.props.list.isRefreshing}
                  onRefresh={() => this.onRefresh()}
                  title="Loading..."
                  colors={['#ffaa66cc']}
                />
             }
          />
        )
      }
    }
  }
  onEndReached(){
    const {listActions} = this.props;
    let token = this.state.token;
    listActions.requestArticleList(false,false,true,token);
  }
  onRefresh(){
    const {listActions} = this.props;
    let token = this.state.token;
    listActions.requestArticleList(true,false,false,token);
  }
  renderRow(rowdata){
      return (
        <TouchableOpacity style={styles.unit} onPress={()=>this.toDetail(rowdata.fans_user_id,rowdata.fans_type)}>
          <View style={styles.item}>
            <View style={styles.icon}>
              <Icon name="bell-o"  style={{fontSize:14,color:'#fff'}}/>
            </View>
            <Text style={styles.date}>{rowdata.created_at}</Text>
          </View>
          <Text style={styles.title}>{rowdata.title}</Text>
          <Text style={styles.info}>{rowdata.content}</Text>
        </TouchableOpacity>
      )
  }
  toDetail(id,type){
    const {navigate} = this.props.navigation;
    if(parseInt(id)>0){
      navigate('messageFriend',{fans_user_id:id,fans_type:type});
    }else{
      navigate('');
    }
  }
  renderFooter(){
    if(this.props.list.isLoadMore){
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#ffb14c" />
          <Text style={styles.footerText}>
            数据加载中……
          </Text>
        </View>
      );
    }else{
      return (
        <View/>
        )
    }
    
  }
}

const mapStateToProps = (state) => {
  const { list } = state;
  return {
    list
  };
};

const mapDispatchToProps = (dispatch) => {
  const listActions = bindActionCreators(listActionCreators, dispatch);
  return {
    listActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#151515',
  },
  unit:{
    alignItems : 'flex-start',
    backgroundColor:'#232121',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:6
  },
  item:{
    flexDirection:'row',
    justifyContent :'center',
    alignItems:'center',
    height:46
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10,
    color:'#ffb14c'
  },
  icon:{
    backgroundColor:'#ae8300',
    borderRadius:12,
    width:24,
    height:24,
    alignItems:'center',
    justifyContent :'center',
    marginRight:10
  },
  date:{
    color:'#acacac',
    fontSize:14,
  },
  title:{
    color:'#cccccc',
    fontSize:17,
    marginBottom:13
  },
  info:{
    color:'#999999',
    fontSize:15,
    paddingBottom:15
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
});
