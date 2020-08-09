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
      // debug: config.get<boolean>('GRAPHQL_DEBUG_ENABLED'),
      // playground: config.get<boolean>('GRAPHQL_PLAYGROUND_ENABLED'),
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    UsersModule,
    RoomsModule,
  ],
})
export class RootModule {}
