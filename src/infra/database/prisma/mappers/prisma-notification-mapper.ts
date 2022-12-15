import { Notification } from '@application/entities/notification/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.createdAt,
      createdAt: notification.createdAt,
    };
  }
}
