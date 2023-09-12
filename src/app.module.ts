import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'pickbazar',
      entities: [User, Profile, Address],
      synchronize: true,
    }),
    UsersModule,
    ProfileModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
