import { Resolver, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  async getUser(@Args('id') id: number) {
    return this.usersService.findOneById(id);
  }
}
