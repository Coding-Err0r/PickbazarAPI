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
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileService } from 'src/profile/services/profile/profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Get all profiles
  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  async getAllProfiles() {
    const profiles = await this.profileService.fetchAllProfiles();
    return profiles;
  }

  // Find profile by Id
  @Get(':id')
  @ApiOperation({ summary: 'Get profile by id' })
  getProfileById(@Param('id') id: number) {
    return this.profileService.fetchProfileById(id);
  }

  // Find profile by User Id
  @Get('user/:id')
  @ApiOperation({ summary: 'Get profile by user id' })
  getProfileByUserID(@Param('id') id: number) {
    return this.profileService.fetchProfileByUserId(id);
  }

  // Create user profile
  @Post(':id')
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          example: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        },
        bio: {
          type: 'string',
          example: 'I am John. I am a software engineer. ',
        },
        phone_number: {
          type: 'string',
          example: '(212) 658-3916',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User profile saved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createProfile(id, createProfileDto);
  }

  // Update profile by Id
  @Patch(':id')
  @ApiOperation({ summary: 'Update profile' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          example: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        },
        bio: {
          type: 'string',
          example: 'I am John. I am a software engineer. ',
        },
        phone_number: {
          type: 'string',
          example: '(212) 658-3916',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Profile updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  async updateUserProfileById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.profileService.updateProfileById(id, updateProfileDto);
  }

  // Delete profile by Id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete profile by id' })
  @ApiResponse({
    status: 200,
    description: 'Profile Deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async deleteProfileById(@Param('id', ParseIntPipe) id: number) {
    await this.profileService.deleteProfileById(id);
  }
}
