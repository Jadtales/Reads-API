import { registerAs } from '@nestjs/config';

export default registerAs('databaseConfig', () => {
  return {
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    port: parseInt(process.env.DATABASE_PORT) || 3000,

    synchronize: process.env.DATABASE_SYNC === 'true',
    autoLoadEntities: process.env.DATABASE_AUTOLOADENTITIES === 'true',
  };
});
