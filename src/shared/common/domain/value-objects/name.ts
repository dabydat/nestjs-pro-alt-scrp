import { NameException } from "../exceptions";
import ValueObject from "./value-object";

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  private static readonly MAX_LENGTH = 250;
  private static readonly INVALID_CHARACTERS = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  private constructor(private readonly value: string) {
    super({ value });
  }

  public static create(value: string): Name {
    Name.validate(value);

    return new Name(value);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new NameException(`value cannot be empty.`);
    }

    const nameRegex = Name.INVALID_CHARACTERS;
    if (!nameRegex.test(value)) {
      throw new NameException(`value contains invalid characters.`);
    }

    if (value.length > Name.MAX_LENGTH) {
      throw new NameException(`value is too long (max 250 characters).`);
    }
  }

  public get getValue(): string {
    return this.value;
  }
}
