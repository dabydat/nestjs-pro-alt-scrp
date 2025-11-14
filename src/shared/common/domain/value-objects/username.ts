import { UsernameException } from "../exceptions";
import ValueObject from "./value-object";

interface UsernameProps {
  value: string;
}

export class Username extends ValueObject<UsernameProps> {
  private static readonly MAX_LENGTH = 20;
  private static readonly INVALID_CHARACTERS = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  private constructor(private readonly value: string) {
    super({ value });
  }

  public static create(value: string): Username {
    Username.validate(value);

    return new Username(value);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new UsernameException(`value cannot be empty.`);
    }

    const UsernameRegex = Username.INVALID_CHARACTERS;
    if (!UsernameRegex.test(value)) {
      throw new UsernameException(`value contains invalid characters.`);
    }

    if (value.length > Username.MAX_LENGTH) {
      throw new UsernameException(`value is too long (max 20 characters).`);
    }
  }

  public get getValue(): string {
    return this.value;
  }
}
