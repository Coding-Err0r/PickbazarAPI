import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    const users = await this.usersService.fetchAllUsers();
    return users;
  }

  // Get user by Id
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  getUser(@Param('id') id: number) {
    return this.usersService.fetchUserById(id);
  }

  // Create new user
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Smith',
        },
        email: {
          type: 'string',
          example: 'johnsmith@gmail.com',
        },
        password: {
          type: 'string',
          example: '12341v87q34k!23',
        },
        shop_id: {
          type: 'number',
          example: '1',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User saved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Update user by Id
  @Patch(':id')
  @ApiOperation({ summary: 'Update new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Smith',
        },
        email: {
          type: 'string',
          example: 'johnsmith@gmail.com',
        },
        password: {
          type: 'string',
          example: '12341v87q34k!23',
        },
        shop_id: {
          type: 'number',
          example: 1,
        },
        is_active: {
          type: 'number',
          example: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUserById(id, updateUserDto);
  }

  // Delete user by Id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'User Deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUserById(id);
  }
}
