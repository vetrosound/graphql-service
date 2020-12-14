import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      debug: process.env.GRAPHQL_DEBUG_ENABLED == 'false',
      playground: process.env.GRAPHQL_PLAYGROUND_ENABLED == 'true',
      typePaths: ['./**/*.graphql'],
    }),
    UsersModule,
    RoomsModule,
  ],
})
export class RootModule {}
