import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  CreateProfileParams,
  UpdateProfileParams,
} from 'src/utils/profile.types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(id: number, createProfileDetails: CreateProfileParams) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create({
      ...createProfileDetails,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  fetchAllProfiles() {
    return this.profileRepository.find({
      select: {
        id: true,
        avatar: true,
        bio: true,
        phone_number: true,
      },
    });
  }

  fetchProfileById(id: number) {
    return this.profileRepository.find({
      where: {
        id: id,
      },
      select: {
        id: true,
        avatar: true,
        bio: true,
        phone_number: true,
      },
    });
  }

  fetchProfileByUserId(id: number) {
    console.log(id);
    return this.userRepository.find({
      where: {
        id: id,
      },
      select: {
        name: true,
      },
      relations: ['profile'],
    });
  }

  updateProfileById(id: number, updateProfileDetails: UpdateProfileParams) {
    return this.profileRepository.update({ id }, { ...updateProfileDetails });
  }

  async deleteProfileById(id: number) {
    const user = await this.userRepository.findOne({
      where: { profile: { id: id } },
    });
    const userId: number = user.id;
    await this.userRepository.update({ id: userId }, { profile: null });
    return this.profileRepository.delete(id);
  }
}
