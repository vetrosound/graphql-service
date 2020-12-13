import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { RoomsService } from './rooms.service';
import { Room, CreateRoomInput, UpdateRoomInput } from '../graphql.schema';

@Resolver('Rooms')
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query('getRoom')
  getRoom(@Args('name') name: string): Observable<Room> {
    return this.roomsService.findRoomByName(name);
  }

  @Mutation('createRoom')
  createRoom(@Args('room') room: CreateRoomInput): Observable<Room> {
    return this.roomsService.createRoom(room);
  }

  @Mutation('updateRoom')
  updateRoom(
    @Args('roomWithUpdates') roomWithUpdates: UpdateRoomInput,
  ): Observable<number> {
    return this.roomsService.updateRoom(roomWithUpdates);
  }

  @Mutation('deleteRoom')
  deleteRoom(@Args('name') name: string): Observable<number> {
    return this.roomsService.deleteRoom(name);
  }
}
