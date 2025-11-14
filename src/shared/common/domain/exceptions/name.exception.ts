import { ValueObjectException } from './value-object.exception';

export class NameException extends ValueObjectException {
  constructor(message: string, details?: string) {
    super(message, NameException.name, details);
  }
}
