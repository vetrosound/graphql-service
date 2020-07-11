import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findOneById(id: number) {
    return {
      id: '1234',
      firstName: 'john',
      lastName: 'smith',
    };
  }
}
