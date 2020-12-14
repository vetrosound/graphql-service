/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateRoomInput {
  name: string;
  owner: string;
  type?: string;
  managers?: string[];
  created?: string;
  lastUpdated?: string;
  isActive?: boolean;
}

export class UpdateRoomInput {
  name: string;
  owner?: string;
  type?: string;
  managers?: string[];
  isActive?: boolean;
}

export class CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

export class UpdateUserInput {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  isActive?: boolean;
}

export class Room {
  name?: string;
  owner?: string;
  type?: string;
  managers?: string[];
  created?: string;
  lastUpdated?: string;
  isActive?: boolean;
}

export abstract class IQuery {
  abstract getRoom(name: string): Room | Promise<Room>;

  abstract getUser(id?: string): User | Promise<User>;
}

export abstract class IMutation {
  abstract createRoom(room?: CreateRoomInput): Room | Promise<Room>;

  abstract updateRoom(
    roomWithUpdates?: UpdateRoomInput,
  ): number | Promise<number>;

  abstract deleteRoom(name?: string): number | Promise<number>;

  abstract createUser(user?: CreateUserInput): User | Promise<User>;

  abstract updateUser(
    userWithUpdates?: UpdateUserInput,
  ): number | Promise<number>;

  abstract deleteUser(id?: string): number | Promise<number>;
}

export class User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  created?: string;
  lastUpdated?: string;
  isActive?: boolean;
}
