import { Module } from '@nestjs/common';
import { RoomsResolver } from './rooms.resolver';
import { UsersModule } from 'src/users/users.module';
import { RoomsService } from './rooms.service';

@Module({
  imports: [UsersModule],
  providers: [RoomsResolver, RoomsService],
})
export class RoomsModule {}
