import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'production', 'staging')
    .required()
    .default('development'),

  DATABASE_PORT: joi.number().port().default(3000),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_HOST: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  DATABASE_USERNAME: joi.string().required(),

  JWT_SECRET: joi.string().required(),
  JWT_TOKEN_AUDIENCE: joi.string().required(),
  JWT_TOKEN_ISSUER: joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: joi.number().required()
});
