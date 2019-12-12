import Peer from './simple-peer/simple-peer'

export default class VideoCall {
    peer = null 
    init = (stream, initiator) => {
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            trickle: false,
            reconnectTimer: 1000,
            iceTransportPolicy: 'relay',
            channelConfig: {},
            config: {
                iceServers: [
                    { urls: 'stun:stun4.l.google.com:19302' },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        username: 'kirivo@mailnow2.com',
                        credential: 'meditel'
                    },
                ]
            }
        })
        return this.peer
    }
}