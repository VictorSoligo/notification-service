export class NotificationAlreadyRead extends Error {
  constructor() {
    super('Notification already read');
  }
}
