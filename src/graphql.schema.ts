/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Room {
  id: number;
  members: User[];
}

export abstract class IQuery {
  abstract room(id: number): Room | Promise<Room>;

  abstract user(id: number): User | Promise<User>;
}

export class User {
  id: number;
  firstName?: string;
  lastName?: string;
}
