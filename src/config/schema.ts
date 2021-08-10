import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    SERVER_PORT: Joi.number().required(),
    APP_SECRET: Joi.string().required(),
    APP_FRONTEND_URL: Joi.string().required(),

    REDIS_HOST: Joi.string().required(),
    REDIS_PASSWORD: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_CACHE_DB: Joi.number().required(),
    REDIS_TTL: Joi.number().required(),

    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_ROOT_PASSWORD: Joi.string().required()
});
