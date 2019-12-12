import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ImageBackground, TextInput, Button,Alert} from 'react-native';

//import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Signup extends Component {

  handlePress = async () => {
    fetch('https://meditel-testing.herokuapp.com/api/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
            })
        })
      .then((response) => response.json())
      .then((responseJson) => {
      
      if(this.state.email!=""){
            if(this.state.password !=""){
              console.log(responseJson);
              if(responseJson.token != undefined){
                Alert.alert( 'Bienvenido!','Iniciaste sesion correctamente',  [   
                  {text: 'Ok', onPress: () => this.props.navigation.navigate('index', {
                    email: this.state.email,
                    password: this.state.password
                  })}, 
                   
              ]);
              }
              else{
                if(responseJson.message === undefined) {
                  Alert.alert(responseJson[0].message);
                }else{
                  Alert.alert(responseJson.message);
                }
              }
            }else{
            Alert.alert("Ingrese una contraseña");
        }
        }else{
        Alert.alert("Ingrese un correo");
        }
      })
      .catch((error) => {
          console.error(error);
      });
  }

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        valido:false,
      }
    }
    onPressSignIn(){
      alert('Inicia sesión');
    }
    onPressSignUp(){
      alert('Registrarse');
    }
    onPressForgotPassword(){
      alert('Recuperar contraseña')
    }

    login = ()=> {
      if(this.state.valido != false){
        this.props.navigation.navigate('index')
      }else{
      Alert.alert("Vuelva a intentar");
    }}
    render(){
      let background = require('../assets/Login.png');
      let logo = require('../assets/meditel-logo.png');
      return (
        <ImageBackground
        source={background}
        style={styles.background}
        blurRadius={1}
        >  
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo}/>
            </View>
            <View style={styles.loginContainer}>
              
              <TextInput 
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor ='#D3D3D3'
              onChangeText={(email) => this.setState({email})}
              />
            </View>  
            <View style={styles.loginContainer}>
              
              <TextInput 
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor ='#D3D3D3'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              />
            </View>
            <Text 
            style = {styles.forgotPassword} 
            onPress={this.onPressForgotPassword}>
            ¿Olvidaste tu contraseña?
            </Text>
            <View style = {styles.signIn}>
              <Button
              onPress={this.handlePress.bind(this)}
              title="Iniciar sesión"
              color="gray"
              />
            </View>
            <View style = {styles.signUp}>
              <Button
              onPress={() => this.props.navigation.navigate('registro')}
              title="Registrarse"
              color="gray"
              />
            </View>
          </View>
         </ImageBackground>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop:60,
      marginBottom: 60,
      // marginTop:130,
      // marginBottom: 90,
      opacity:0.7,
    },
    loginContainer: {
      justifyContent: 'center',
      flexDirection:'row',
      marginLeft: 30,
      marginRight: 30,
      marginBottom:15,
      borderBottomColor: '#fff',
      borderBottomWidth: 0.5,
      height: 35,
      alignItems: "stretch",
    },
    logo: {
      width: 289,
      height: 110,
    },
    background: {
      flex:1,
      width: '100%', 
      height: '101%',
      resizeMode: 'cover',
    },  
    input: {
      flex:1,
      color:'#fff',
      paddingRight: 15,
      paddingBottom: 5,
      paddingLeft: 0  
    },
    signIn: {
      backgroundColor: '#46AFA3',
      marginTop: 60,
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      color: 'transparent',
      borderRadius: 7,
      fontSize: 10,
    },
    signUp: {
      borderColor: 'transparent',
      borderWidth: 0.5,
      marginLeft:20,
      marginRight:20,
      color: '#fff',
      borderRadius: 7
    },
    inputIcon: {
      paddingRight:20,
      paddingLeft:10
    },
    forgotPassword: {
      color: '#fff',
      marginLeft:178,
      opacity: 0.8,
    }
  });
  
 
  