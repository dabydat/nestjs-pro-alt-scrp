import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from 'src/authentication/user/domain/repositories/user.repository';
import { UserMapper } from '../../mappers/user.mapper';
import { Uuid } from '@shared/common/domain/value-objects';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findUserById(userId: Uuid) {
    const entity = await this.userRepository.findOne({
      where: { id: userId.getValue },
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findUserByEmail(email: string) {
    const entity = await this.userRepository.findOne({
      where: { email },
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async save(user: any): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    await this.userRepository.save(entity);
  }
}
