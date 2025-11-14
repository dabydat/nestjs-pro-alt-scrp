import { ValueObjectException } from './value-object.exception';

export class FullNameException extends ValueObjectException {
  constructor(message: string, details?: string) {
    super(message, FullNameException.name, details);
  }
}
