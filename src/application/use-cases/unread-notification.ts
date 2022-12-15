import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';

import { NotificationNotFound } from './errors/notification-not-found';
import { NotificationNotRead } from './errors/notification-not-read';

type UnreadNotificationRequest = {
  notificationId: string;
};

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    if (!notification.readAt) {
      throw new NotificationNotRead();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
