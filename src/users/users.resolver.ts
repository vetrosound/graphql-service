import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { UsersService } from './users.service';
import { User, CreateUserInput, UpdateUserInput } from '../graphql.schema';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('getUser')
  getUser(@Args('id') id: string): Observable<User> {
    return this.usersService.findUserById(id);
  }

  @Mutation('createUser')
  createUser(@Args('user') user: CreateUserInput): Observable<User> {
    return this.usersService.createUser(user);
  }

  @Mutation('updateUser')
  updateUser(
    @Args('userWithUpdates') userWithUpdates: UpdateUserInput,
  ): Observable<number> {
    return this.usersService.updateUser(userWithUpdates);
  }

  @Mutation('deleteUser')
  deleteUser(@Args('id') id: string): Observable<number> {
    return this.usersService.deleteUser(id);
  }
}
