export enum NotificationEvents {
  like = 'like_event',
  comment = 'comment_event',
}

export interface INotificationService {
  sendUserNotification(
    eventName: NotificationEvents,
    userId: string,
    data: Record<string, any>,
  ): Promise<any>;
}
