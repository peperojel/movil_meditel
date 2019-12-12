import React, { Component } from 'react';
import { FlatList, StyleSheet, View ,Image, ImageBackground, TouchableHighlight,TouchableOpacity} from 'react-native';
import { List, ListItem,Header,SearchBar,Divider,Text } from 'react-native-elements'
// import BottomNavigation, {
//   IconTab,
//   Badge,
//   FullTab
// } from 'react-native-material-bottom-navigation'
// import { ScrollView } from 'react-native-gesture-handler';


export default class InicioScreen extends Component {
  constructor(props) {
    super(props);
    global.nombre = '';
    global.apellido = '';
    global.token = '';
    global.doctor= 'http://www.doctorlopezcapape.com/site/imgs/doctor-david-lopez-capape-retrato.png';
  }
  state = {
    search: '',
    email:'',
    token:'',
    retoken:'',
    password:'',
    nombre:'',
    apellido:'',
  };

  save_movil = () => {
    console.log('id_movil: '+global.movil)
    console.log('id_persona: '+global.token)
    fetch('https://meditel-testing.herokuapp.com/api/firebase/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + global.token, 
        },
        body: JSON.stringify({
          "firebase_token": global.movil
      })
    })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    })
    .catch((error) => {
        console.log('no se almaceno el id del dispositivo')
  });
  };

  Token = () => {
    if (this.state.token == ''){
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
        this.setState({token:responseJson.token});
        this.setState({nombre:responseJson.nombre});
        global.nombre = responseJson.nombre;
        global.apellido = responseJson.apellido;
        global.token = responseJson.token;
        this.setState({apellido:responseJson.apellido});
        this.setState({refreshToken:responseJson.refreshToken});
        this.save_movil();
        })
        .catch((error) => {
    });
    }
  };

  componentDidMount(){
    this.setState({email:(this.props.navigation.state.params || {}).email})
    this.setState({password:(this.props.navigation.state.params || {}).password})
  }
  componentDidUpdate(){
    this.Token()
  }
  
  onPressAtencionInmediata(){
    alert('Atención Inmediata');
  }
  onPressAgendarHora(){
    alert('Agendar Hora');
  }
  onPressEspecialidades(){
    alert('Especialidades')
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        
        <View>
        <SearchBar
          inputStyle={{ fontSize: 14}}
          inputContainerStyle={{backgroundColor:"#F5F5F5"}}
          containerStyle={{backgroundColor: 'transparent', borderBottomColor: 0, borderTopColor: 0}}
          placeholderTextColor={'#86939e'}
          placeholder="¿Qué médico o especialidad buscas?"
          onChangeText={this.updateSearch}
          value={search}
          style={styles.search}
        />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', padding:10}}>
          <View >
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('inmediata', {
                    email: this.state.email,
                    token: this.state.token,
                    
                  })}}>
              <ImageBackground style={styles.imageFilter} blurRadius={0.5} 
              source={require('../../assets/atencion-inmediata.png')}>
              <Text style={styles.imageTitle}>
                Atención{"\n"}Inmediata
              </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
            
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('agendar')}}>
            <ImageBackground style={styles.imageFilter} blurRadius={0.5} 
            source={require('../../assets/agendar-hora.png')}
            onPress={this.onPressEspecialidades}>
              <Text style={styles.imageTitle}>
                Agendar Hora
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', paddingBottom:20}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('especialidades')}}>
            <ImageBackground style={styles.imageArea} blurRadius={0.5} 
            source={require('../../assets/especialidades.png')}
            onPress={this.onPressEspecialidades}>
              <Text style={styles.imageTitle}>
                Especialidades
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Text style = {styles.title}>{this.state.nombre} Bienvenido!</Text>
      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 40,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  bottom:{
    width: '100%', 
    height: 50, 
    backgroundColor: '#7FCDCD', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  search:{
    paddingTop:10,
  },
  imageTitle:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15    
  },
  imageFilter:{
    width: 160.49, 
    height: 104.33,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom:10
  },
  imageArea:{
    width: 332.94, 
    height: 68.35,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  title:{
    color:'#4F5254', 
    fontWeight: 'bold', 
    fontSize: 21, 
    padding: 14
  }

});
