// Librerías react-native
import React, { Component } from 'react';
// import firebase from 'react-native-firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

// Componentes de la aplicación
import Signup from './src/views/Signup.js';
import InicioScreen from './src/views/inicio/inicio.js';
import FichaScreen from './src/views/ficha/ficha.js';
import AsesoriasScreen from './src/views/asesorias/asesorias.js';
import HistorialAsesoriaScreen from './src/views/asesorias/historial-asesoria.js'
import PerfilScreen from './src/views/perfil/perfil.js';
import RegistroScreen from './src/views/registro.js';
import Especialidades from './src/views/especialidades/Especialidades.js';
import Chat from './src/views/chat/chat.js';
import Videollamada from './src/Videollamada.js';
import Inmediata from './src/views/inmediata/inmediata.js'
import Agendar from './src/views/agendar/agendar.js'
import Seleccionar from './src/views/agendar/seleccionar_hora.js'
import Perfil_medico from './src/views/perfil_medico/perfil_medico.js'

// Utils MediTel
import SocketConnection from './src/utils/socket';

const ws = new SocketConnection();

// Desde v4 de react-navigation createStackNavigator se importa desde react-navigation-stack (requiere instalación)

// import AsesoriasScreen from './src/views/asesorias/asesorias.js';


// import SocketConnection from './src/utils/socket';

// const ws = new SocketConnection();

const AsesoriaStack = createStackNavigator(
  {
    asesoria:{ 
      screen: AsesoriasScreen,
      navigationOptions: {
        header: null,
      }
   },
    historialAsesoria:{ 
        screen: HistorialAsesoriaScreen,
        navigationOptions: {
          title: '<Nombre-médico>',
          titleColor: '#66696B',
        }
    },
  },
  {
    initialRouteName: 'asesoria',
  },{
    defaultNavigationOptions: {
      header: null
    },}
);

const AppNavigator = createBottomTabNavigator(
  {
    INICIO: {
      screen: InicioScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          <Icon name="clinic-medical" size={24} color={tintColor} />
      }
    },
    FICHA:{
      screen: FichaScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          <Icon name="file-medical" size={24} color={tintColor} />
      }
    },
    ASESORIAS:{
      screen: AsesoriaStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          <Icon name="laptop-medical" size={24} color={tintColor} />
      }
    },
    PERFIL:{
      screen: PerfilScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          <Icon name="user" size={24} color={tintColor} />

      }
    },
  },
  {
    tabBarOptions: {
    activeTintColor: '#2EC4B6',
    inactiveTintColor: '#4D6375',
    labelStyle: {fontSize: 10, fontWeight: 'bold'},
  }
});

const RootStack = createStackNavigator(
  {
    Signup:{ 
      screen: Signup,
      navigationOptions: {
        header: null,
      }
   },
    index:{ 
        screen: AppNavigator,
        navigationOptions: {
          header: null,
        }
    },
    registro:{
      screen: RegistroScreen,
      navigationOptions:{
        header: null,
      }
    },
    medico_inmediato:{
      screen: Perfil_medico,
      navigationOptions:{
        header: null,
      }
    },
    asesoria:{ 
      screen: AsesoriasScreen,
      navigationOptions: {
        header: null,
      }},
    inmediata:{
      screen: Inmediata,
      navigationOptions:{
        title: 'Atención inmediata',
      }
    },
    agendar:{
      screen: Agendar,
      navigationOptions:{
        title: 'Agendar Hora',
      }
    },
    seleccionar:{
      screen: Seleccionar,
      navigationOptions:{
        title: 'Agendar Hora',
      }
    },
    especialidades:{
      screen: Especialidades,
      navigationOptions:{
        title: 'Especialidades',
      }
    },
    videollamada:{
      screen: Videollamada,
      navigationOptions:{
        title: 'Videollamada',
      }
    },
    chat:{
      screen: Chat,
      navigationOptions:{
        header: null,
      }
    }
  },
  {
    initialRouteName: 'Signup',
  },{
    defaultNavigationOptions: {
      header: null
    },}
);

const AppContainer = createAppContainer(RootStack);
export default class App extends Component {
  constructor(props) {
    super(props);
    global.movil = ''
  }

  async componentDidMount() {
    this.checkPermission();
  }

  render() {
    return <AppContainer screenProps={{socket: ws}}/>;
  }
}
