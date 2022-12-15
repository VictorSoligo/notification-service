import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationAlreadyCanceled } from './errors/notification-already-canceled';
import { NotificationNotFound } from './errors/notification-not-found';

type CancelNotificationRequest = {
  notificationId: string;
};

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    if (notification.canceledAt) {
      throw new NotificationAlreadyCanceled();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
