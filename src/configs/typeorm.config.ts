import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'mysql-container',
    port: 3306,
    username: 'root',
    password: 'my-secret-pw',
    database: 'test_rbh',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    charset: 'utf8mb4',
};

