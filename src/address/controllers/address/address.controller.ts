import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressService } from 'src/address/services/address/address.service';
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
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  // Get all addresses
  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  async getAllAddress() {
    const addresses = await this.addressService.fetchAllAddress();
    return addresses;
  }

  // Find Address by Id
  @Get(':id')
  @ApiOperation({ summary: 'Get address by id' })
  getAddressById(@Param('id') id: number) {
    return this.addressService.fetchAddressById(id);
  }

  // Find address by User Id
  @Get('user/:id')
  @ApiOperation({ summary: 'Get address by user id' })
  getAddressByUserID(@Param('id') id: number) {
    return this.addressService.fetchAddressByUserId(id);
  }

  // Create user address
  @Post(':id')
  @ApiOperation({ summary: 'Create address' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Billing',
        },
        type: {
          type: 'string',
          example: 'Billing',
        },
        default: {
          type: 'string',
          example: 0,
        },
        zip: {
          type: 'string',
          example: 99614,
        },
        city: {
          type: 'string',
          example: 'Kipnuk',
        },
        state: {
          type: 'string',
          example: 'AK',
        },
        country: {
          type: 'string',
          example: 'United States',
        },
        street_address: {
          type: 'string',
          example: '2231 Kidd Avenue',
        },
        customer_id: {
          type: 'string',
          example: 2,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User address saved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  createUserAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.createAddress(id, createAddressDto);
  }

  // Update address by Id
  @Patch(':id')
  @ApiOperation({ summary: 'Update address' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Billing',
        },
        type: {
          type: 'string',
          example: 'Billing',
        },
        default: {
          type: 'string',
          example: 0,
        },
        zip: {
          type: 'string',
          example: 99614,
        },
        city: {
          type: 'string',
          example: 'Kipnuk',
        },
        state: {
          type: 'string',
          example: 'AK',
        },
        country: {
          type: 'string',
          example: 'United States',
        },
        street_address: {
          type: 'string',
          example: '2231 Kidd Avenue',
        },
        customer_id: {
          type: 'string',
          example: 2,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Address updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  async updateAddressById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    await this.addressService.updateAddressById(id, updateAddressDto);
  }

  // Delete Address by Id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Address by id' })
  @ApiResponse({
    status: 200,
    description: 'Address Deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async deleteAddressById(@Param('id', ParseIntPipe) id: number) {
    await this.addressService.deleteAddressById(id);
  }
}
