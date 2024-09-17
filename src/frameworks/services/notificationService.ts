import {
  INotificationService,
  NotificationEvents,
} from '@app/src/application/contracts/services/INotificationService';
import { AuthService } from './authService';
import { Socket } from 'socket.io';
import { SocketApplication } from '../server/socket/application';

export class NotificationService implements INotificationService {
  private liveUsers: Map<string, Socket>;

  constructor() {
    this.liveUsers = new Map();
    const authService = new AuthService();
    const io = SocketApplication.getInstance();

    io.on('connection', (socket) => {
      console.log('Socket connection', { socket });
      const jwt = socket.handshake.query.JWT as string | undefined;
      if (jwt) {
        const userData = authService.verifyToken(jwt);
        if (userData && userData.id) {
          this.liveUsers.set(userData.id, socket);

          socket.on('disconnect', () => {
            this.liveUsers.delete(userData.id);
          });

          return;
        }
      }
      socket.disconnect();
    });
  }

  async sendUserNotification(
    eventName: NotificationEvents,
    userId: string,
    data: Record<string, any>,
  ): Promise<any> {
    const userSocket = this.liveUsers.get(userId);
    if (userSocket) {
      userSocket.emit(eventName, data);
    }
  }
}
