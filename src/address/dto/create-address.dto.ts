export class CreateAddressDto {
  title?: string;
  type?: string;
  default?: number;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
  street_address?: string;
  customer_id?: number;
  created_at: Date;
  updated_at: Date;
}
