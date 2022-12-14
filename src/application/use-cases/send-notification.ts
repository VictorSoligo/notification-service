import { Injectable } from '@nestjs/common';

import { Content } from '../entities/notification/content';
import { Notification } from '../entities/notification/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

type SendNotificationRequest = {
  recipientId: string;
  content: string;
  category: string;
};

type SendNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
