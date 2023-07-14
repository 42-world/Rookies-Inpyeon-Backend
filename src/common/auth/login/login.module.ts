import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../database';
import { LoginService } from './login.service';

@Module({
  imports: [UserRepositoryModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
