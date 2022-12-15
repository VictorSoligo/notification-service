import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    const content = new Content(raw.content);

    return new Notification(
      {
        content,
        category: raw.category,
        recipientId: raw.recipientId,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
      },
      raw.id,
    );
  }
}
