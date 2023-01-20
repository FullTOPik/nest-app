import { IsObject } from 'class-validator';
import { PersonRole } from 'src/user/models/user.model';

export class AppRequest {
  @IsObject()
  user: {
    id: number;
    email: string;
    role: PersonRole;
  };
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
}

