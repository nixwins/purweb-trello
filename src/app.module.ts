import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { RouterModule, Routes } from '@nestjs/core';

const routes: Routes = [
  {
    path: 'columns',
    module: ColumnsModule,
    children: [
      {
        path: '/:columnId/cards',
        module: CardsModule,
      },
    ],
  },
];
@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      cache: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    TokensModule,
    ColumnsModule,
    CardsModule,
  ],
})
export class AppModule {}
