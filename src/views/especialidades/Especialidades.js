import React from 'react';
import {StyleSheet,View, TouchableOpacity,Text,Alert,Image} from 'react-native';

export default class Especialidades extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            especialidad : '',
        };
    };

    handleClick = ()=> {
        Alert.alert('En desarrollo...');
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonStyles}
                     onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'ginecologia'})}}>
                        <Image
                            source={require ('../../assets/ginecologia.png')}
                        />
                        <Text>
                            Ginecologia
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyles}
                     onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'cardiologia'})}}>
                        <Image
                            source={require ('../../assets/cardiologia.png')}
                        />
                        <Text>
                            Cardiologia
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonStyles}
                     onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'ENT'})}}>
                        <Image
                            source={require ('../../assets/ENT.png')}
                        />
                        <Text>
                            Otorrino
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'nutricion'})}}>
                        <Image
                            source={require ('../../assets/nutricion.png')}
                        />
                        <Text>
                            Nutricion
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'dermatologia'})}}>
                        <Image
                            source={require ('../../assets/dermatologia.png')}
                        />
                        <Text>
                            Dermatologia
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'dental'})}}>
                        <Image
                            source={require ('../../assets/dental.png')}
                        />
                        <Text>
                            Dental
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'kinesiologia'})}}>
                        <Image
                            source={require ('../../assets/kinesiologia.png')}
                        />
                        <Text>
                            Kinesiologia
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'Gastroenterology'})}}>
                        <Image
                            source={require ('../../assets/Gastroenterology.png')}
                        />
                        <Text>
                            Gastroenterologia
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'medicina_general'})}}>
                        <Image
                            source={require ('../../assets/medicina_general.png')}
                        />
                        <Text>
                            Medicina general
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyles} onPress={()=>{this.props.navigation.navigate('especialidad',{especialidad:'pediatria'})}}>
                        <Image
                            source={require ('../../assets/pediatria.png')}
                        />
                        <Text>
                            Pediatria
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:6,
        backgroundColor:'white'
    },
    buttonRow:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#ffffff',
        borderBottomWidth:1
    },
    buttoStyles:{
        backgroundColor:'#35605a',
        width:'50%',
        height:'50%',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonStyles:{
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:'50%',
        height:'50%',
       backgroundColor:'#fff',
       borderRadius:20,
    },
    buttonText:{
        color:'black',
        fontSize:18
    },
    background: {
        flex:1,
        width: '100%', 
        height: '101%',
        resizeMode: 'cover',
      }
})