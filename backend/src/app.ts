import express, {Application} from 'express';
import http from 'http';
import { Server } from 'socket.io';
class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor(){
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);
  }
  public listen() {
    this.app.listen(33333, ()=>{
      console.log('Server is running on port 33333');
    })
  }
}

export { App };