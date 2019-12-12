import React, { Component } from 'react';
import { FlatList, StyleSheet, View ,Image, ImageBackground, TouchableHighlight, TouchableOpacity, Alert} from 'react-native';
import {Text, ListItem, Divider,Avatar} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


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

export default class AsesoriasScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            data:[],
        }

        this.messageHandler = this.messageHandler.bind(this);
    }

    componentDidMount() {
        this.setState()
        Agendados = () => {
                fetch('https://meditel-testing.herokuapp.com/api/asesoria/asesorias', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': 'Bearer ' + global.token, 
                    }
                })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data:responseJson.data});
                console.log('data:'+this.state.data[0].rating)
                })
                .catch((error) => {
                    console.log('algo paso obteniendo los medicos disponibles')
            });
          };
        Agendados()
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.componentDidFocus()),
          ];
        this.props.screenProps.socket.setHandler(this.messageHandler)
    }

    componentDidFocus() {
        this.props.screenProps.socket.setHandler(this.messageHandler)
    }

    requestAsesoria(id) {
        
        //console.log("mi token id: "+global.token)
        //console.log(id)
        room = subscribeToRoom(this.props.screenProps.socket, 'asesoria:'+id, global.token);

        room.emit('message', {
            type: 'asesoria:request',
            data: ''
        })
    }



    messageHandler ( message ) {
        const {type, data} = message;
        switch (type) {
            case 'asesoria:accept':
                this.props.navigation.navigate("videollamada");
            case 'asesoria:refuse':
                Alert.alert('Tu asesoria fue rechazada')
            default:
              //console.log("Default case")
            break;
          }
    }
    

    render() {
        const { search } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Asesorías Médicas
                    </Text> 
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>
                            Asesoria agendada
                        </Text> 
                        {
                            this.state.data.map((l, i) => (
                                <View>
                                    <ListItem
                                        onPress={() => this.requestAsesoria(l.id_doctor)}
                                        Component={TouchableOpacity}
                                        rightIcon= {{name:"keyboard-arrow-right", size:25, color:'#BDC3C7' }}
                                        key={i}
                                        titleStyle={styles.itemTitleAgendada}
                                        subtitleStyle={styles.itemSubtitle}
                                        leftAvatar={<Avatar
                                                  rounded
                                                  size="large"
                                                  source={{
                                                        uri:
                                                          'http://www.doctorlopezcapape.com/site/imgs/doctor-david-lopez-capape-retrato.png',
                                                      }}
                                                  onPress={() => this.props.navigation.navigate('medico_inmediato', {
                                                              id_medico: l.id_doctor
                                                            })}
                                                  activeOpacity={0.7}
                                                />}
                                        subtitle={l.nombre + ' '+ l.apellido}
                                        title={l.fecha.slice(0, 10)}
                                        rightTitle={'Hora: '+l.fecha.slice(11,16)}
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
   paddingTop: 40
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