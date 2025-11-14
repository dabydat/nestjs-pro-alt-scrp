import { LastNameException } from "../exceptions";
import ValueObject from "./value-object";

interface LastNameProps {
  value: string;
}

export class LastName extends ValueObject<LastNameProps> {
  private static readonly MAX_LENGTH = 250;
  private static readonly INVALID_CHARACTERS = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  private constructor(private readonly value: string) {
    super({ value });
  }

  public static create(value: string): LastName {
    LastName.validate(value);

    return new LastName(value);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new LastNameException(`value cannot be empty.`);
    }

    const nameRegex = LastName.INVALID_CHARACTERS;
    if (!nameRegex.test(value)) {
      throw new LastNameException(`value contains invalid characters.`);
    }

    if (value.length > LastName.MAX_LENGTH) {
      throw new LastNameException(`value is too long (max 250 characters).`);
    }
  }

  public get getValue(): string {
    return this.value;
  }
}
