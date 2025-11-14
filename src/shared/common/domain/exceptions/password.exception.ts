import { ValueObjectException } from './value-object.exception';

export class PasswordException extends ValueObjectException {
  constructor(message: string, details?: string) {
    super(message, PasswordException.name, details);
  }
}
