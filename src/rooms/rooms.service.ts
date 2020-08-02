import { Injectable } from '@nestjs/common';
import { Room, User } from '../graphql.schema';
import { Observable, of } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoomsService {
  constructor(private usersService: UsersService) {}

  findOneById(id: number): Observable<Room> {
    return of({ id } as Room);
  }

  findMembersByRoomId(roomId: number): Observable<User> {
    return this.usersService.findAllByIds([roomId]);
  }
}
