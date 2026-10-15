import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async create(
    email: string,
    name: string,
    passwordHash: string,
    role: Role,
  ): Promise<UserEntity> {
    const existing = await this.findByEmail(email);
    if (existing) throw new ConflictException('Email already registered');
    const user = this.usersRepo.create({
      email,
      name,
      password_hash: passwordHash,
      role,
    });
    return this.usersRepo.save(user);
  }
}
