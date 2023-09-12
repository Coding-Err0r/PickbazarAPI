import { Module } from '@nestjs/common';
import { AddressController } from './controllers/address/address.controller';
import { AddressService } from './services/address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
