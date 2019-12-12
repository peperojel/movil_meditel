import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Text, ListItem, Divider,Avatar} from 'react-native-elements';


export default class PerfilScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
          }
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
                    uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                  }}
                />
              </View>
              <View>
                <Text style={styles.name}>{global.nombre}</Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                  }}
                >
                  Ver y editar perfil
                </Text>
              </View>
            </View>
            <View style={styles.section}>
                        {
                            perfil.map((l, i) => (
                                <View>
                                    <ListItem
                                        Component={TouchableOpacity}
                                        rightIcon= {{name:"keyboard-arrow-right", size:25, color:'#BDC3C7' }}
                                        key={i}
                                        titleStyle={styles.itemTitleAgendada}
                                        leftAvatar={l.avatar}
                                        title={l.name}
                                    />
                                    <Divider style={{ backgroundColor: '#BDC3C7' }} />
                                </View>
                            ))
                        }    
                    </View>
          </View>
        );
      }
}

const perfil = [
          {
              name: 'Cargas médicas',
              avatar: <Avatar
              rounded
              size="small"
              icon={{name: 'user', type: 'font-awesome'}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          },
          {
            name: 'Método de pago',
            avatar: <Avatar
            rounded
            size="small"
            icon={{name: 'credit-card', type: 'font-awesome'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        },
        {
          name: 'Promociones',
          avatar: <Avatar
          rounded
          size="small"
          icon={{name: 'tags', type: 'font-awesome'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        },
        {
          name: 'Convenios',
          avatar: <Avatar
          rounded
          size="small"
          icon={{name: 'medkit', type: 'font-awesome'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        },
        {
          name: 'Invita a tus amigos',
          avatar: <Avatar
          rounded
          size="small"
          icon={{name: 'share-alt', type: 'font-awesome'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        },
        {
          name: 'Contáctanos',
          avatar: <Avatar
          rounded
          size="small"
          icon={{name: 'comments', type: 'font-awesome'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        },
        {
          name: 'Ayuda',
          avatar: <Avatar
          rounded
          size="small"
          icon={{name: 'life-ring', type: 'font-awesome'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        },
]

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


