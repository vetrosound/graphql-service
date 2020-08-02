import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  findOneById(id: number): Observable<User> {
    return of({
      id,
      firstName: 'john',
      lastName: 'smith',
    } as User);
  }

  findAllByIds(ids: number[]): Observable<User> {
    return from(ids).pipe(
      map(
        id =>
          ({
            id,
            firstName: 'john',
            lastName: 'smith',
          } as User),
      ),
    );
  }
}
