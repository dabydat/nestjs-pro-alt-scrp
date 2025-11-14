import { ValueObjectException } from './value-object.exception';

export class UsernameException extends ValueObjectException {
  constructor(message: string, details?: string) {
    super(message, UsernameException.name, details);
  }
}
