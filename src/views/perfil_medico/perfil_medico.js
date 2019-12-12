import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Text, ListItem, Divider,Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Perfil_medico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_medico:'',
            name:'',
            lastname:'',
            specialty:'',
            rating:''
          }
      }
    
      componentDidMount(){
        this.setState({id_medico:(this.props.navigation.state.params || {}).id_medico})
                fetch('https://meditel-testing.herokuapp.com/api/doctor/show/'+(this.props.navigation.state.params || {}).id_medico, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': 'Bearer ' + global.token, 
                    }
                })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({name:responseJson.name});
                this.setState({lastname:responseJson.lastname});
                this.setState({specialty:responseJson.specialty});
                this.setState({rating:responseJson.rating.toString()});
                })
                .catch((error) => {
                    console.log('algo paso obteniendo los medicos disponibles')
            });
      }
    render() {
        return (
          <View style={styles.container}>
              <View style={styles.userRow}>
              <View style={styles.userImage}>
                <Avatar
                  rounded
                  size="large"
                  source={{
                    uri: global.doctor,
                  }}
                />
              </View>
              <View>
                <View style={styles.userRow}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                  }}
                >
                  {this.state.rating}
                </Text>
                <Icon name="star" size={17} color="yellow" />
                </View>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                  }}
                >
                  {this.state.specialty}
                </Text>
              </View>
            </View>
          </View>
        );
      }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding:20,
   },
  scroll: {
    backgroundColor: 'white',
  },
  section:{
    paddingTop: 14
},
  name:{
    fontSize:22,
    color:"black",
    fontWeight:'600',
  },
  itemTitle:{
    color: '#707171',
    fontWeight:'bold',
    fontSize:14
},
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})