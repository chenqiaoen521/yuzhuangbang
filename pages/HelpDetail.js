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
    Dimensions
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HelpDetail extends Component {
    static navigationOptions = {
        title:'帮助中心',
        headerRight: (
            <Icon.Button
                name="bell-o"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                    navigation.state.params.handleShare();
                }}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text style={{color:'#666',fontSize:16}}>怎样选择好点的施工团队</Text></View>
                <View style={styles.text}><Text style={{color:'#999',fontSize:14}}>工程施工下设人工费、材料费、机械费、其他直接费等四个明细。其中人工费核算一线工人工资、津贴、伙食、补助，但不包括保险，一线工人保险在间接费里核算；材料费核算构成工程实体的材料耗用，其中包括快拆组件租费、脚手架子管租费等外租材料以及分包部分的核算，如护坡、降水、防水等；机械费核算大型推土机、压路机、两头忙、蛤蟆夯、汽车泵、砼泵、外用电梯、塔吊等的租费，包括给这些机械的加油机维修养护费；其他直接费主要核算不能区分开以上三种费用的支出，但是构成工程项目实体的支出，如：土方的二次搬运费、工程用水费、电费等。
按照形象进度结转工程施工，工程施工借方余额为未完施工，表示暂时没有相应收入的成本。如果工程施工全部结转，则余额为零。工程施工余额不可能在贷方。</Text></View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#151515'
    },
    title: {
        borderBottomWidth:1,
        borderColor:'#292929',
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:15,
        paddingRight:15,
    },
    text: {
        padding:15
    } 
});
