export class NotificationAlreadyCanceled extends Error {
  constructor() {
    super('Notification already canceled');
  }
}
