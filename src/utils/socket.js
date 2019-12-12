import Ws from 'websocket-adonis-meditel';

export default class SocketConnection {

  constructor () {
    this.handler = null;
    this.hasConnection = false;
  }

  setHandler (handler) {
    this.handler = handler
  }

  connect (token) {
    //TODO: Darle la URL a traves de un .env
    this.ws = Ws("wss://meditel-testing.herokuapp.com")
    .withApiToken(token)
      .connect();

    this.ws.on('open', () => {
      this.hasConnection = true;
    });

    this.ws.on('close', () => {
      console.log('Connection closed')
      this.hasConnection = false;
    });

    return this
  }

  close () {
    this.ws.close();
  }

  subscribe (channel) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000)
    } else {
      const result = this.ws.subscribe(channel);

      result.on('message', message => {
        console.log('Incoming', message);
        this.handler(message)
      });

      result.on('error', (error) => {
        console.error(error)
      });

      return result
    }
  }
}
