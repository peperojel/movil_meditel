import React, { Component } from 'react';
import { FlatList, StyleSheet, View ,Image, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Text, ListItem, Divider,Avatar} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
// import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Agendar extends Component {
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
    
    componentDidMount(){
        this.setState({email:(this.props.navigation.state.params || {}).email})
        this.setState({token:(this.props.navigation.state.params || {}).token})
        Disponibles = () => {
            fetch('https://meditel-testing.herokuapp.com/api/doctor/all', {
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
            })
            .catch((error) => {
                console.log('algo paso obteniendo los medicos disponibles')
        });
      };
      Disponibles()
      }
      
    render() {
        const { search } = this.state;
        const myIcon = <Icon name="star" size={30} color="#900" />;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.info}>
                    Selecciona a uno de los medicos para agendar una hora
                    </Text>
                    <Divider style={{ backgroundColor: '#BDC3C7' }} />
                    <View style={styles.section}>
                        {
                            this.state.data.map((l, i) => (
                                <View>
                                    <ListItem
                                        button onPress={() => this.props.navigation.navigate('seleccionar', {
                                                              id_medico: l.id_doctor
                                                            })}
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
                                                  onPress={() => console.log("Works!")}
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
