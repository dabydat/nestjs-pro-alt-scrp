import { ValueObjectException } from './value-object.exception';

export class LastNameException extends ValueObjectException {
  constructor(message: string, details?: string) {
    super(message, LastNameException.name, details);
  }
}
