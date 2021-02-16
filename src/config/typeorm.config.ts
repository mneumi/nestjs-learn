import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_NAME as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/../**/*.entity.js"],
  synchronize: Boolean(process.env.DB_SYNC),
  connectTimeout: Number(process.env.DB_CONNECTION_TIMEOUT)
}