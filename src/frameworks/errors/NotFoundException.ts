export class NotFoundException extends Error {
  constructor(message?: string | undefined) {
    super(message || 'Not Found');
  }
}
