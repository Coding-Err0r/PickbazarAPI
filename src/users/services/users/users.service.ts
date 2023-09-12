import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/user.types';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  fetchAllUsers() {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        shop_id: true,
        is_active: true,
      },
      relations: ['profile', 'address'],
    });
  }

  fetchUserById(id: number) {
    return this.userRepository.find({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        shop_id: true,
        is_active: true,
      },
      relations: ['profile', 'address'],
    });
  }

  updateUserById(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['profile'],
    });

    const profile = user.profile;

    if (profile) {
      await this.profileRepository.remove(profile);
    }
    return this.userRepository.delete({ id });
  }
}
