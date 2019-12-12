import React, { Component } from 'react';
import {
  // Text,
  // TouchableOpacity,
  View,
  YellowBox
} from 'react-native';
import { 
  mediaDevices,
  RTCView
} from 'react-native-webrtc';
import {
  // button,
  container,
  rtcView
  // text
} from './styles';

import VideoCall from './utils/videocall';

YellowBox.ignoreWarnings(['Setting a timer', 'Unrecognized WebSocket connection', 'ListView is deprecated and will be removed']);

/* ==============================
 Global variables
 ================================ */
let room = null;
/* ==============================
 Class
 ================================ */
class Videollamada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: {},
      remoteStreamUrl: null,
      streamUrl: null,
      initiator: false,
      peer: {},
      full: false,
      connecting: false,
      waiting: true
    }

    this.messageHandler = this.messageHandler.bind(this);
  }

  videoCall = new VideoCall()
  
  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.componentDidFocus()),
    ];
    this.getLocalStream().then( () => {
      this.getReady();
      global.room.emit('message', {
        type: 'videollamada:ready',
        data: {
          to_socket: global.socket_id
        }
      });
    });
  }

  componentDidFocus() {
    this.props.screenProps.socket.setHandler(this.messageHandler)
  }
  
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  messageHandler ( message ) {
    const {type, data} = message
    switch (type) {
      case 'videollamada:ready':
        // Evento que indica que ambos participantes están ready para enviarse mensajes signaling
        break;
      case 'videollamada:signaling':
        this.state.peer.signal(data.signal)
        break;
      case 'videollamada:finished':
        // Indica que contraparte cerró la vista de videollamada
        // Se debe cerrar esta vista y volver al chat
        break;
      default:
        console.log("Default case")
        break;
    }
  }

  getLocalStream = () => {
    return new Promise( (resolve, reject) => {
      const isFront = true;
      const op = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 640,
            minHeight: 360,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment'
        }
      };

      mediaDevices.getUserMedia(op).then( stream => {
        this.setState({ streamUrl: stream.toURL(), localStream: stream })
        resolve();
      });
    });
  }

 
  
  getReady = () => {
    this.setState({ connecting: true })
    const peer = this.videoCall.init(
      this.state.localStream,
      this.state.initiator
    )
    this.setState({peer})
    peer.on( 'signal' , (data) => {
      global.room.emit('message',
        {
          type: 'videollamada:signaling',
          data: {
            signal: data,
            to_socket: global.socket_id
          }
        });
    });

    peer.on('stream', stream => {
      this.setState({remoteStreamUrl: stream.toURL(), connecting: false, waiting: false});
    })

    peer.on('error', function(err) {
      console.log(err)
    })
  }

  // switchCamera = () => {
  //   this.state.localStream.getVideoTracks().forEach(track => {
  //     track._switchCamera();
  //   });
  // };

  // button = (func, text) => (
  //   <TouchableOpacity style={button.container} onPress={func}>
  //     <Text style={button.style}>{text}</Text>
  //   </TouchableOpacity>
  // );
  
  render() {
    return (
      <View style={container.style}>
        <View style={rtcView.testStyle}>
          <RTCView streamURL={this.state.streamUrl} style={{overflow: 'hidden', flex: 1, backgroundColor: 'black'}}/>
        </View>
        {!(this.state.connecting || this.state.waiting) && (
          <RTCView streamURL={this.state.remoteStreamUrl} style={rtcView.fullScreen}/>
        )}
      </View>
    );
  }
}

/* ==============================
 Functions
 ================================ */
 const getSubscription = (sc, room_id) => {

  // let room = sc.ws.getSubscription(room_id);

  // if (!room) {
  //     return sc.subscribe(room_id);    
  // } else {
  //     return room;
  // }
}

/* ==============================
 Export
 ================================ */
export default Videollamada;
