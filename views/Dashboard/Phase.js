import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

export default class Phase extends Component {
  // static navigationOptions= ({navigation}) =>({
  // 		  title: 'Welcome',
  // 	});
  state ={
    data:[]
  }

  fetchData = async()=>{
      const response = await fetch('http://10.200.71.139:2020/normal');
      const times = await response.json();
      this.setState({data:times});
    }
componentDidMount(){
  this.fetchData();
}
	render(){
		return(
			<View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.header1}>
          <Text>OverView</Text>
        </View>
        <View style={styles.header2}>

          <FlatList
          data={this.state.data}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item}) =>

          <View>
             <Text style={{color:'#F7941D', fontWeight:'bold'}}>ID: {item.unitID}</Text>
             <Text style={{color:'#F7941D'}}>Phase Angle: {item.frequency}</Text>
             <Text>Host: {item.host}</Text>
            </View>
          }

          />
        </View>
      </View>

       <Text style={styles.buttonText}>Phase Data</Text>
       <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>

       <View style={{backgroundColor:'#F7941D',padding:50,margin:10,borderRadius:10}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>ID: {item.unitID}</Text>

          <Text>Host: {item.host}</Text>
         </View>
       }
       />
  		</View>
    );
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'black',
    textAlign:'center'
  },
  header: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop:20,
  },
  header1: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    width: 170,
    marginTop: 10, marginBottom:10,
    marginRight: 10, marginLeft:10,
    justifyContent: 'center',
    elevation: 2,
  },
  header2: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    width: 170,
    marginTop: 10, marginBottom:10,
    marginRight: 10,
    justifyContent: 'center',
    elevation: 2,
  },

});
