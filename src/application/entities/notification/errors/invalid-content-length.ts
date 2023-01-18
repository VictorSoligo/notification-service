export class InvalidContentLength extends Error {
  constructor() {
    super('Invalid content length');
  }
}
