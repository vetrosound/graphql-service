import { Resolver, ResolveField, Query, Args } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room, User } from '../graphql.schema';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Resolver('Room')
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query('room')
  getRoom(@Args('id') id: number): Observable<Room> {
    return this.roomsService.findOneById(id);
  }

  @ResolveField('members')
  getMembers(@Args('roomId') roomId: number): Observable<User[]> {
    return this.roomsService.findMembersByRoomId(roomId).pipe(toArray());
  }
}
