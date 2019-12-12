
import React, { Component } from 'react';
import { FlatList, StyleSheet, View ,Image, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Text, ListItem, Divider,Avatar} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
// import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/FontAwesome';


//TODO: Cuando se haga el fetch desde el back se debe rescatar la asesoria_id del respectivo médico
let room = null;
const token = global.token
const agendada = [
    {
        name: '<Fecha>',
        subtitle: '<Nombre médico>',
        hora: '<Hora>',
        asesoria_id: 'someId'
    },
]

export default class Inmediata extends Component {

  constructor(props) {
    super(props);
    global.socket_id = '';
    global.room = '';
    this.messageHandler = this.messageHandler.bind(this);
  }
    state = {
        search: '',
        email:'',
        token:'',
        data:[],
        buscados:'',
    };
    
    onPressVerAsesoria(){
        () => this.props.navigation.navigate('historialAsesoria')
    }
    onPressVerAgendada(){
        alert('Datos Agendada');
    }
    Disponibles = () => {
        if (this.state.buscados == ''){
            fetch('https://meditel-testing.herokuapp.com/api/doctor/disponibles', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + this.state.token, 
                }
            })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({data:responseJson.data});
            this.setState({buscados:'1'})
            })
            .catch((error) => {
                console.log('algo paso obteniendo los medicos disponibles')
        });
        }
      };
    componentDidMount(){
        this.setState({email:(this.props.navigation.state.params || {}).email})
        this.setState({token:(this.props.navigation.state.params || {}).token})
        this.subs = [
          this.props.navigation.addListener('didFocus', () => this.componentDidFocus()),
        ];
      this.props.screenProps.socket.setHandler(this.messageHandler)
      }
    componentDidUpdate(){
        this.Disponibles()
      }
    
      componentDidFocus() {
        this.props.screenProps.socket.setHandler(this.messageHandler)
    }

    componentWillUnmount() {
      this.subs.forEach(sub => sub.remove());
    }

    requestAsesoria(id) {
        
        //console.log("mi token id: "+global.token)
        //console.log(id)
        room = subscribeToRoom(this.props.screenProps.socket, 'asesoria:'+id, global.token);
        global.room = room
        room.emit('message', {
            type: 'asesoria:request',
            data: ''
        })
    }

    messageHandler ( message ) {
      const {type, data} = message;
      switch (type) {
          case 'asesoria:accept':

              global.socket_id = data.from_socket
              this.props.navigation.navigate("chat");

          case 'asesoria:refuse':
              Alert.alert('Tu asesoria fue rechazada')
          default:
            //console.log("Default case")
          break;
        }
  }
  
    render() {
        const { search } = this.state;
        const myIcon = <Icon name="star" size={30} color="#900" />;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.info}>
                    Selecciona a uno de los medicos disponibles para tu asesoria inmediata
                    </Text>
                    <Divider style={{ backgroundColor: '#BDC3C7' }} />
                    <View style={styles.section}>
                        {
                            this.state.data.map((l, i) => (
                                <View>
                                    <ListItem
                                        button onPress={() => this.requestAsesoria(l.id_doctor)}
                                        Component={TouchableOpacity}
                                        rightIcon= { <Icon name="star" size={17} color="yellow" />}
                                        titleStyle={styles.itemTitle}
                                        subtitleStyle={styles.itemSubtitle}
                                        key={i}
                                        leftAvatar={<Avatar
                                                  size="large"
                                                  source={{
                                                        uri:
                                                          global.doctor,
                                                      }}
                                                      onPress={() => this.props.navigation.navigate('medico_inmediato', {
                                                              id_medico: l.id_doctor
                                                            })}
                                                  activeOpacity={0.7}
                                                />}
                                        title={l.nombre + ' ' +l.apellido}
                                        subtitle={l.specialty}
                                        rightTitle={l.rating.toString()}
                                        rightTitleStyle={styles.itemTitleRight}
                                    />
                                    <Divider style={{ backgroundColor: '#BDC3C7' }} />
                                </View>   
                            ))
                        }
                        </View>
                </ScrollView>         
            </View>
        );
    }
}

const subscribeToRoom = (sc, room_id, token) => {
  if ( !sc.hasConnection ) {
      sc.connect(token);
  }

  let room = sc.ws.getSubscription(room_id);
  sc.topic = room_id;
  if (!room) {
      return sc.subscribe(room_id);    
  } else {
      return room;
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 20
  },
  title:{
    color:'#66696B', 
    fontWeight: 'bold', 
    fontSize: 22, 
    padding: 14
  },
  subtitle:{
    color:'#909090',
    fontWeight: 'bold', 
    fontSize: 17, 
    padding: 14
  },
  section:{
      paddingTop: 14
  },
  itemTitle:{
      color: '#707171',
      fontWeight:'bold',
      fontSize:14
  },
  info:{
    fontSize:16,
    color: "black",
    padding:20,
  },
  itemSubtitle:{
      color: '#707171',
      fontSize:13,
      paddingTop:3
  },
  itemTitleAgendada:{
    color: '#FF9F1C',
    fontWeight:'bold',
    fontSize:14
  },
  itemTitleRight:{
    color: '#A3A3A3',
    fontSize:14,
    textAlignVertical:'top',
  },
});
