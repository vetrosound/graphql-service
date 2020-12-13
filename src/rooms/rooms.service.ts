import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Room, CreateRoomInput, UpdateRoomInput } from '../graphql.schema';

@Injectable()
export class RoomsService {
  private roomsBaseUrl: string;

  constructor(private httpService: HttpService, private config: ConfigService) {
    this.roomsBaseUrl = `${this.config.get<string>('ROOMS_BASE_URL')}/rooms`;
  }

  findRoomByName(roomName: string): Observable<Room> {
    return this.httpService.get(`${this.roomsBaseUrl}/${roomName}`).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }

  createRoom(room: CreateRoomInput): Observable<Room> {
    return this.httpService.post(this.roomsBaseUrl, room).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }

  updateRoom(withUpdates: UpdateRoomInput): Observable<number> {
    return this.httpService.put(this.roomsBaseUrl, withUpdates).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }

  deleteRoom(roomName: string): Observable<number> {
    return this.httpService.delete(`${this.roomsBaseUrl}/${roomName}`).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }
}
