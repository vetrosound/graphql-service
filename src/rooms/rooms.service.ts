import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  async findOneById(id: number) {
    return { id: '1234' };
  }
}
