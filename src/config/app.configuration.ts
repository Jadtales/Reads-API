import { registerAs } from '@nestjs/config';

// Create a configuration object with types
export default registerAs('appConfiguration', () => {
  return {
    environments: process.env.NODE_ENV || 'production',
  };
});
