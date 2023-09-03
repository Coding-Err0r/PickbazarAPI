export class CreateUserDto {
  name: string;
  email: string;
  password?: string;
  shop_id?: number;
  is_active?: boolean;
  created_at: Date;
  updateded_at: Date;
}
