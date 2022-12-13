export class UserEntity {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  verified?: boolean;
  role: string;
  verificationCode?: string;
  isBanned?: boolean;
  bannedReason?: string;
  created_at?: Date;
  updated_at?: Date;
  __v?: number;
}
