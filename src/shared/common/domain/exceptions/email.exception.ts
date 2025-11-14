import { ValueObjectException } from './value-object.exception';

export class EmailException extends ValueObjectException {
  constructor(message: string, details?: string) {
    super(`Invalid email format. ${message}`, EmailException.name, details);
  }
}
