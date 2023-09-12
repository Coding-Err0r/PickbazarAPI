import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateAddressParams,
  UpdateAddressParams,
} from 'src/utils/address.types';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async createAddress(id: number, createAddressDetails: CreateAddressParams) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const newAddress = this.addressRepository.create({
      ...createAddressDetails,
      user: user,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.addressRepository.save(newAddress);
  }

  fetchAllAddress() {
    return this.addressRepository.find();
  }

  fetchAddressById(id: number) {
    return this.addressRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  fetchAddressByUserId(id: number) {
    return this.userRepository.find({
      where: {
        id: id,
      },
      select: {
        name: true,
      },
      relations: ['address'],
    });
  }

  updateAddressById(id: number, updateAddressDetails: UpdateAddressParams) {
    return this.addressRepository.update({ id }, { ...updateAddressDetails });
  }

  async deleteAddressById(id: number) {
    return this.addressRepository.delete(id);
  }
}
