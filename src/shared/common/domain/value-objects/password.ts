import { PasswordException } from "../exceptions";
import ValueObject from "./value-object";

interface PasswordProps {
  password: string;
  userInfo: string[];
}

export class Password extends ValueObject<PasswordProps> {
  private static readonly MIN_LENGTH = 8;
  private static readonly UPPERCASE_REGEX = /[A-Z]/;
  private static readonly NUMBER_REGEX = /[0-9]/;
  private static readonly SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
  private static readonly REPETITION_REGEX = /(.)\1{2,}/;

  private constructor(
    private readonly password: string,
    private readonly userInfo: string[] = [],
  ) {
    super({ password, userInfo });
  }

  public static create(password: string, userInfo?: string[]): Password {
    Password.validate(password, userInfo);

    return new Password(password, userInfo);
  }

  private static validate(password: string, userInfo?: string[]): void {
    if (password.length < Password.MIN_LENGTH) {
      throw new PasswordException(
        `La contraseña debe tener al menos ${Password.MIN_LENGTH} caracteres.`,
      );
    }

    if (!Password.UPPERCASE_REGEX.test(password)) {
      throw new PasswordException(
        'Debe contener al menos una letra mayúscula.',
      );
    }

    if (!Password.NUMBER_REGEX.test(password)) {
      throw new PasswordException('Debe incluir al menos un número.');
    }

    if (!Password.SPECIAL_CHAR_REGEX.test(password)) {
      throw new PasswordException(
        'Debe incluir al menos un símbolo especial (@, #, $, etc.).',
      );
    }

    if (/monetix/i.test(password)) {
      throw new PasswordException("No puede contener la palabra 'Monetix'.");
    }

    if (
      userInfo &&
      userInfo.some((info: string): boolean =>
        password.toLowerCase().includes(info.toLowerCase()),
      )
    ) {
      throw new PasswordException('No puede contener información personal.');
    }

    if (Password.REPETITION_REGEX.test(password)) {
      throw new PasswordException(
        'No puede repetir más de tres caracteres consecutivos (ejemplo: aaa, 111).',
      );
    }
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getUserInfo(): string[] {
    return this.userInfo;
  }

  public ensureIsEquals(password: Password): boolean {
    if (this.password !== password.getPassword) return false;
    return true;
  }

  public static createHashed(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }
}
