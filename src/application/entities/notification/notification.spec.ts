import { Notification } from './notification';
import { Content } from './content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova notificação'),
      category: 'Misteriosa',
      recipientId: 'example-recipientId',
    });

    expect(notification).toBeTruthy();
  });
});
