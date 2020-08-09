import { Resolver, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../graphql.schema';
import { Observable } from 'rxjs';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('user')
  getUser(@Args('id') id: number): Observable<User> {
    return this.usersService.findOneById(id);
  }
}
