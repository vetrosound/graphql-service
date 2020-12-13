import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, CreateUserInput, UpdateUserInput } from '../graphql.schema';

@Injectable()
export class UsersService {
  private usersBaseUrl: string;

  constructor(private httpService: HttpService, private config: ConfigService) {
    this.usersBaseUrl = `${this.config.get<string>('PEOPLE_BASE_URL')}/users`;
  }

  findUserById(userId: string): Observable<User> {
    return this.httpService.get(`${this.usersBaseUrl}/${userId}`).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }

  createUser(user: CreateUserInput): Observable<User> {
    return this.httpService.post(this.usersBaseUrl, user).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }

  updateUser(withUpdates: UpdateUserInput): Observable<number> {
    return this.httpService.put(this.usersBaseUrl, withUpdates).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }

  deleteUser(userId: string): Observable<number> {
    return this.httpService.delete(`${this.usersBaseUrl}/${userId}`).pipe(
      map(response => {
        if (response.status >= HttpStatus.BAD_REQUEST) {
          throw new HttpException(response.statusText, response.status);
        }
        return response.data;
      }),
    );
  }
}
