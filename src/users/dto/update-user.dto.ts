export class UpdateUserDto {
  name: string;
  email: string;
  password?: string;
  shop_id?: number;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
}
