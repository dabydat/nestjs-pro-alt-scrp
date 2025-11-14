import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from 'src/authentication/user/domain/repositories/user.repository';
import { UserMapper } from '../../mappers/user.mapper';
import { Uuid } from '@shared/common/domain/value-objects';

export class UserRepositoryImpl implements UserRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findUserById(userId: Uuid): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId.getValue } });
    if (!user) return null;
    return UserMapper.toUser(user);
  }

}
