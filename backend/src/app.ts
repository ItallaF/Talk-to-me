import express, { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http, {
      cors: {
        origin: '*',
      },
    });
  }

  public listen() {
    this.http.listen(33333, () => {
      console.log('Server is running on port 33333');
    })
  }

  public listenSocket() {
    this.io.of('/streams').on('connection', this.socketEvents)
  }

  private socketEvents(socket: Socket) {
    console.log('Socket connected: ' + socket.id);
    socket.on('subscribe', (data) => {
      console.log('usuario inserido na sala' + data.roomId);
      socket.join(data.roomId)

      socket.on('chat', (data) => {
        console.log('🚀 ~ App ~ socket.on ~ data:', data);
        socket.broadcast.to(data.roomId).emit('chat', {
          mesage: data.mesage,
          usarname: data.usarname,
          time: data.time
        })
      })
    })
  }
}

export { App };
