import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ImageBackground, TextInput, Button, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class Signup extends Component {

    
    handlePress = async () => {
        fetch('https://meditel-testing.herokuapp.com/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "apellido": this.state.apellido,
                "nombre": this.state.nombre,
                "role":"paciente"
            })
        })
          .then((response) => response.json())
          .then((responseJson) => {
          
            if(this.state.email!=""){
                if(this.state.password !=""){
                    Alert.alert( 'Registro exitoso',responseJson.message,  [   
                        {text: 'Iniciar sesión', onPress: () => this.props.navigation.navigate('Signup')},  
                    ]);
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
        apellido: '',
        nombre: '',
        password:''
      }
    }

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
          <ScrollView>
            <View>
                <Text style={styles.title}>
                    ¡Bienvenidos a MEDITEL!
                </Text>
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
              placeholder="Nombre"
              placeholderTextColor ='#D3D3D3'
              onChangeText={(nombre) => this.setState({nombre})}
              />
            </View>
            <View style={styles.loginContainer}>
              
              <TextInput 
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor ='#D3D3D3'
              onChangeText={(apellido) => this.setState({apellido})}
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
            <View style = {styles.registro}>
              <Button
              onPress={this.handlePress.bind(this)}
              title="Registrarse"
              color="gray"
              />
            </View>
            <View style = {styles.iniciosesion}>
              <Button
              onPress={() => this.props.navigation.navigate('Signup')}
              title="Iniciar sesión"
              color="gray"
              />
            </View>
            </ScrollView>
          </View>
         </ImageBackground>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop:100
    },
    logoContainer: {
      alignItems: 'center',
      marginTop:130,
      marginBottom: 90,
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
    registro: {
      backgroundColor: '#46AFA3',
      marginTop: 30,
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      color: '#fff',
      borderRadius: 7,
      fontSize: 10,
    },
    inputIcon: {
      paddingRight:20,
      paddingLeft:10
    },
    title:{
        color:'#fff',
        textAlign: 'center',
        fontSize:20,
        paddingBottom: 150,
        fontWeight: 'bold'
    },
    iniciosesion: {
        borderColor: '#fff',
        borderWidth: 0.5,
        marginLeft:20,
        marginRight:20,
        color: '#fff',
        borderRadius: 7
      },
  });
  