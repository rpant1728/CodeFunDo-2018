import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      text1: '',
      text2: '',
      text3: '',
      rec: false,
      res: null,
      isLoading: false,
    };
  }

  static navigationOptions = {
    title: 'Register',
  }; 

  fetchData(navigate){
    this.setState({isLoading: true});
    fetch('https://polar-fortress-64666.herokuapp.com/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.text1,
        email: this.state.text2,
        password: this.state.text3,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ res: responseData, rec: true, isLoading: false });
        if(responseData.token) navigate("Home");
      })
      .catch(err => {
        console.log(err);
      });
  }       

  render(){
    const { navigate } = this.props.navigation;

    if(this.state.isLoading){
      return(
      <View style={{backgroundColor: "#009688", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require("./assets/appIcon.png")} style={{height: 100, width: 100}}/> 
          <Text style={{ fontSize: 15, color: '#eeeeee', fontWeight: '400', textAlign: 'center' }}>Registering you...</Text>
        </View> 
        <ActivityIndicator/>   
      </View>    
      )
    } 

    return(
      <View style={{backgroundColor: "#009688", flex: 1}}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('./assets/appIcon.png')}
            style={{ width: 100, height: 100 , marginTop: 20, marginBottom: 20 }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}} >
          <View style={{ marginBottom: 20, width: '95%' }}>
            <TextInput
              underlineColorAndroid = "transparent"
              style={{ height: 40, borderColor: '#eeeeee', borderWidth: 1, marginBottom: 10, color: '#191919', paddingLeft: 7.5 }}
              placeholderTextColor="#4c4c4c" 
              onChangeText={text => this.setState({ text1: text })}
              value={this.state.text1}
              placeholder={'Enter Name'}
            />
            <TextInput
              underlineColorAndroid = "transparent"
              style={{ height: 40, borderColor: '#eeeeee', borderWidth: 1, marginBottom: 10, color: '#191919', paddingLeft: 7.5 }}
              placeholderTextColor="#4c4c4c" 
              onChangeText={text => this.setState({ text2: text })}
              value={this.state.text2}
              placeholder={'Enter Email'} 
            />
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid = "transparent"
              style={{ height: 40, borderColor: '#eeeeee', borderWidth: 1, marginBottom: 10, color: '#191919', paddingLeft: 7.5 }}
              placeholderTextColor="#4c4c4c" 
              onChangeText={text => this.setState({ text3: text })}
              value={this.state.text3}
              placeholder={'Enter Password'}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>      
          <View style={{ width: '95%', backgroundColor:"white", height: 35}}>
            <TouchableOpacity onPress={() => { this.fetchData(navigate); } }>
              <Text style={{color: "#009688", textAlign: 'center', paddingTop: 7.5, fontWeight: '500'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}






