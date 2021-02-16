import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: process.env.DB_NAME as any,
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [__dirname + "/../**/*.entity.js"],
          synchronize: Boolean(process.env.DB_SYNC),
          connectTimeout: Number(process.env.DB_CONNECTION_TIMEOUT)
        } as TypeOrmModuleOptions
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
