import { Resolver, ResolveField, Query, Args } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { UsersService } from 'src/users/users.service';

@Resolver('Room')
export class RoomsResolver {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
  ) {}

  @Query('room')
  async getRoom(@Args('id') id: number) {
    return this.roomsService.findOneById(id);
  }

  @ResolveField('members')
  async getUser(@Args('id') id: number) {
    return [this.usersService.findOneById(id)];
  }
}
