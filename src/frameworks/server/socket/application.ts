import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

export class SocketApplication {
  private static io: SocketServer;

  static getInstance() {
    if (!this.io) {
      this.io = new SocketServer({
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });
    }
    return this.io;
  }

  static attach(server: Server) {
    this.io.attach(server);
  }
}
